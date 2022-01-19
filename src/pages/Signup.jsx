import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { firestore, auth } from "../util/firebase";
import { useEffect, useState } from "react";
import FormControl from 'react-bootstrap/FormControl';
import { useProtectedContext } from "../context/Protected";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Signup(){

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const [user, setUser] = useProtectedContext();

    const handleChangeName = (e) => {
        setName(e.target.value)
    };

    const handleChangePass = (e) => {
        setPass(e.target.value)
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    };

    /*const handleChange = (e) => {
        let newUser = {
          ...user,
          [e.target.name]: e.target.value
        };
        setUser(newUser);
        console.log(user);
    };*/

    const createUser = () => {
        

        auth
        .createUserWithEmailAndPassword(email,pass)
        .then((userCredential) => {
            let newUser = {
                "name": name,
                "pass": pass,
                "email": email,
                "uid": userCredential.user.uid
            };/**/
            saveUser(newUser);
            setUser(newUser);
            //console.log(userCredential.user)
        })
        .catch((err) => console.error(err.message));/** */

        
    }

    const saveUser = (newUser) => {
        firestore
            .collection("users")
            .add(newUser)
            .then(() => {
                console.log("Usuario Registrado");
                restart();
            })
            .catch((err) => console.error(err.message));/** */
    }

    const restart = () =>{
        setName("");
        setPass("");
        setEmail("");
    }

    return (
        <Container className=" p-3 m-1">
            <Row className="centered">
                <Col md={3}></Col>
                    <Col  className="border p-5" md={6}>
                        <h2>Crear una cuenta</h2>
                        <div className="container">
                            <div className="white centered">
                                <form action="/haciaAlgunLugar" className="custom-form">
                                    <div>
                                        <FloatingLabel controlId="floatingInput" label="username" className="mb-3">   
                                        <FormControl
                                            id="nombre"
                                            placeholder="username"
                                            name="name"
                                            type="text"
                                            onChange={handleChangeName}
                                            value={name}
                                        />
                                        </FloatingLabel>
                                    </div>
                                    <div>
                                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">    
                                        <FormControl
                                            id="email"
                                            placeholder="email"
                                            name="mail"
                                            type="text"
                                            onChange={handleChangeEmail}
                                            value={email}
                                        />
                                        </FloatingLabel>
                                    </div>
                                    <div>
                                        <FloatingLabel controlId="floatingPassword" label="Password">
                                        <FormControl
                                            id="pass"
                                            placeholder="password"
                                            name="pass"
                                            type="password"
                                            onChange={handleChangePass}
                                            value={pass}
                                        />
                                        </FloatingLabel>
                                    </div>
                                    
                                    <div className="pt-2 d-grid gap-2">
                                        <Button variant="primary" size="lg" onClick={() => createUser()}>Crear Cuenta</Button>
                                    </div>
                                </form>

                                <Col className="pt-4">
                                    <Link to ="/">Login</Link>
                                </Col>
                            </div>
                        </div>
                    </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
}
import { Redirect, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { firestore, auth } from "../util/firebase";
import { useEffect, useState } from "react";
import FormControl from 'react-bootstrap/FormControl';
import { useProtectedContext } from "../context/Protected";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';

export default function Signup(){

    const [estiloOculto, setEstiloOculto] = useState(true);
    const [disabledButton, setDisabledButton] = useState(false);

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [user, setUser] = useProtectedContext();

    const handleChangeName = (e) => {
        setName(e.target.value)
        setShow(false);
    };

    const handleChangePass = (e) => {
        setPass(e.target.value)
        setShow(false);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
        setShow(false);
    };

    const createUser = () => {
    
        setEstiloOculto(false);
        setDisabledButton(true);

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
        })
        .catch((err) => { 
            console.error(err.message);
            setShow(true);
            setShowSuccess(false);
            setEstiloOculto(true);
            setDisabledButton(false);
            }
        );

        
    }

    const saveUser = (newUser) => {
        firestore
            .collection("users")
            .add(newUser)
            .then(() => {
                console.log("Usuario Registrado");
                setShow(false);
                setShowSuccess(true);
                restart();
                setEstiloOculto(true);
                setDisabledButton(false);
            })
            .catch((err) => { 
                console.error(err.message);
                setShow(true);
                setShowSuccess(false);
                setEstiloOculto(true);
                setDisabledButton(false);
                }
            );
    }

    const restart = () =>{
        setName("");
        setPass("");
        setEmail("");
    }

    if(user){
        return <Redirect to='/home'></Redirect>
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
                                        <FloatingLabel label="username" className="mb-3">   
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
                                        <FloatingLabel label="Email address" className="mb-3">    
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
                                        <FloatingLabel label="Password">
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
                                        <Button variant="primary" size="lg" onClick={() => createUser()} disabled={disabledButton}>
                                            
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className={`visually-${estiloOculto ? "hidden" : ""}`}
                                            />
                                            Crear Cuenta
                                        </Button>
                                    </div>
                                    <Col md={12} className="pt-2 d-grid gap-2">
                                        <Alert  show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                                            Existen campos vacios
                                        </Alert>
                                        <Alert  show={showSuccess} variant="success" onClose={() => setShowSuccess(false)} dismissible>
                                            Registro Exitoso
                                        </Alert>
                                    </Col>
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
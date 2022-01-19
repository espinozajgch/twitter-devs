import { useState, useEffect } from "react";
import { Redirect , Link } from "react-router-dom";
import { firestore, loginConGoogle, auth, logout } from "../util/firebase";
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useProtectedContext } from "../context/Protected";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// import { useNavigate } from "react-router-dom";

export default function Login(){

    // let navigate = useNavigate();

    const [user, setUser] = useProtectedContext();

    //const [user, setUser] = useState(null);
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = () =>{
        console.log("login");
        //loginConGoogle();

        auth
        .signInWithEmailAndPassword(email,pass)
        .then((userCredential) => {
            //console.log(userCredential.user)
            let { uid, email } = userCredential.user;
            setUser({ "uid":uid, "email":email });
            //console.log(user);
            
        })
        .catch((err) => console.error(err.message));/** */
    }

    const handleChangePass = (e) => {
        setPass(e.target.value)
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    };
    
    useEffect( () => {
        auth.onAuthStateChanged((userCredential) =>{
            //let { uid, email } = userCredential;
            setUser(userCredential);
            //console.log( userCredential !== null && userCredential.uid);
        });/** */
        
    }, []);/***/

    if(user){
        // navigate('/home');
        return <Redirect to='/home'></Redirect>
    }

    return (
        <Container className=" p-3 m-1">
            <Row className="centered">
                <Col md={3}></Col>
                <Col  className="border p-5" md={6}>
                <h2>Login</h2>
                    <Container className="">
                        <Row className="white centered">
                            {/* <form className="custom-form"> */}
                            <Col md={12}>
                                <FloatingLabel /*controlId="floatingInput"*/ label="Email address" className="mb-3">
                                {/* <Form.Control type="email" placeholder="name@example.com" /> */}
                                <FormControl
                                    id="email"
                                    placeholder="email"
                                    name="mail"
                                    type="email"
                                    onChange={handleChangeEmail}
                                    value={email}
                                />
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel /*controlId="floatingPassword"*/ label="Password">
                                    <FormControl
                                        id="pass"
                                        placeholder="password"
                                        name="pass"
                                        type="password"
                                        onChange={handleChangePass}
                                        value={pass}
                                    />
                                </FloatingLabel>
                            </Col>

                            <div className="pt-2 d-grid gap-2">
                                <Button onClick={handleChange} id="btn" className="btn" size="lg">Login</Button>
                            </div>
                            {/* <Button onClick={logout} id="btnOut" className="btn">Logout</Button> */}
                            {/* </form> */}

                            <Col className="pt-4">
                                {/* { user !== null && <h1>Loggin Exitoso</h1>} */}
                                <Link to ="/signup">Crear una cuenta</Link>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
}
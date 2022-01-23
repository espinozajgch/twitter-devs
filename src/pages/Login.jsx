import { useState, useEffect } from "react";
import { Redirect , Link } from "react-router-dom";
import { firestore, loginConGoogle, auth, logout } from "../util/firebase";
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useProtectedContext } from "../context/Protected";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';

export default function Login(){

    const [user, setUser] = useProtectedContext();

    const [estiloOculto, setEstiloOculto] = useState(true);
    const [disabledButton, setDisabledButton] = useState(false);
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = () =>{
        
        //loginConGoogle();

        setEstiloOculto(false);
        setDisabledButton(true);

        if(email != "" && pass.length > 0){
            auth
            .signInWithEmailAndPassword(email,pass)
            .then((userCredential) => {
                let { uid, email } = userCredential.user;
                setUser({ "uid":uid, "email":email }); 
                setShow(false);
                setEstiloOculto(true);
                setDisabledButton(false);
            })
            .catch((err) => { 
                console.error(err.message);
                setShow(true);
                setEstiloOculto(true);
                setDisabledButton(false);
                }
            );
        }
        else{
            setShow(true);
            setEstiloOculto(true);
            setDisabledButton(false);
        }/***/
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
            if(userCredential !== null){
                setUser(userCredential);
            }
            else{
                setShow(false);
                setEstiloOculto(true);
                setDisabledButton(false);
            }

            console.log( userCredential !== null && userCredential);
        });/** */
        
    }, []);/***/

    if(user){
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
                            <Col md={12}>
                                <FloatingLabel label="Email address" className="mb-3">
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
                            </Col>

                            <Col md={12} className="pt-2 d-grid gap-2">
                                <Button onClick={handleChange} id="btn" className="btn" size="lg" disabled={disabledButton}>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className={`visually-${estiloOculto ? "hidden" : ""}`}
                                    />    
                                    
                                    Login
                                </Button>
                            </Col>
                            <Col md={12} className="pt-2 d-grid gap-2">
                                <Alert  show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                                    Usuario y/o clave invalidos
                                </Alert>
                            </Col>
                            <Col className="pt-2">
                                <Link to ="/signup">Crear una cuenta</Link>
                            </Col>
                            <Col md={12} className="pt-2">
                                <p>o</p>
                            </Col>
                            <Col md={12} className="">
                                <Button variant="link" onClick={loginConGoogle} id="btn" className="btn" size="lg">
                                    Iniciar con Google
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
}
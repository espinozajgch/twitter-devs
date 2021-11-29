import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { firestore, auth } from "../util/firebase";
import { useEffect, useState } from "react";
import FormControl from 'react-bootstrap/FormControl';
import { useProtectedContext } from "../context/Protected";

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
        <div>
            <h2>Crear una cuenta</h2>
            <div className="container">
                <div className="white centered">
                    <form action="/haciaAlgunLugar" className="custom-form">
                        <div>
                            <FormControl
                                id="nombre"
                                placeholder="username"
                                name="name"
                                type="text"
                                onChange={handleChangeName}
                                value={name}
                            />
                        </div>
                        <div>
                            <FormControl
                                id="email"
                                placeholder="email"
                                name="mail"
                                type="text"
                                onChange={handleChangeEmail}
                                value={email}
                            />
                        </div>
                        <div>
                            <FormControl
                                id="pass"
                                placeholder="password"
                                name="pass"
                                type="password"
                                onChange={handleChangePass}
                                value={pass}
                            />
                        </div>
                        
                        <div>
                            <Button variant="primary" onClick={() => createUser()}>Crear Cuenta</Button>
                        </div>
                    </form>

                    <div className="bottom-text">
                        {/* <Link to ="/login">Login</Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
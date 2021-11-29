import { useState, useEffect } from "react";
// import { Navigate , Link } from "react-router-dom";
import { firestore, loginConGoogle, auth, logout } from "../util/firebase";
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useProtectedContext } from "../context/Protected";
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
            console.log( userCredential !== null && userCredential.uid);
        });/** */
        
    }, []);/***/

    if(user){
        // navigate('/home');
        //   return <Navigate to='/home'></Navigate>
    }

    return (
        <div>
            <h2>Login</h2>
            <div className="container">
                <div className="white centered">
                    {/* <form className="custom-form"> */}
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
                    <Button onClick={handleChange} id="btn" className="btn">Login</Button>
                    <Button onClick={logout} id="btnOut" className="btn">Logout</Button>
                    {/* </form> */}

                    <div className="bottom-text">
                        { user !== null && <h1>Loggin Exitoso</h1>}
                    {/* <Link to ="/signup">Crear una cuenta</Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
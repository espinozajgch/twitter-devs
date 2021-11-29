import { Link } from "react-router-dom";
import { useProtectedContext } from "../context/Protected";
import Button from 'react-bootstrap/Button';
import { logout } from "../util/firebase";

export default function Header(){

    const [user, setUser] = useProtectedContext();

    const cerrandoSesion = () => {
        setUser(null);
        logout();
        console.log("sesion cerrada")

    }

    return (
        <div>
            <nav>
                <ul>
                    { user===null && <li><Link to ="/">Login</Link></li> }
                    { user!==null && <Button variant="link" onClick={cerrandoSesion} id="btnOut" className="btn">Logout</Button> }
                    <li><Link to ="/home">Home</Link></li>
                    { user===null && <li><Link to ="/signup">Sign Up</Link></li> }
                </ul>
            </nav>
        </div>
    );
}
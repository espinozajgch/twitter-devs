import { Link } from "react-router-dom";

export default function Header(){
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to ="/">Login</Link></li>
                    <li><Link to ="/home">Home</Link></li>
                    <li><Link to ="/signup">Sign Up</Link></li>
                </ul>
            </nav>
        </div>
    );
}
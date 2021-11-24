import { Route, Link } from "react-router-dom";

export default function Login(){
    return (
        <div>
            <h2>Login</h2>
            <div class="container">
                <div class="white centered">
                    <form action="/" class="custom-form">
                    <input
                        id="nombre"
                        placeholder="username"
                        name="first-name"
                        type="text"
                        autocomplete="off"
                    />
                    <input
                        id="apellido"
                        placeholder="password"
                        name="last-name"
                        type="password"
                        autocomplete="off"
                    />
                    <button type="submit" id="btn" class="btn">Login</button>
                    </form>

                    <div class="bottom-text">
                    {/* <Link to ="/signup">Crear una cuenta</Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
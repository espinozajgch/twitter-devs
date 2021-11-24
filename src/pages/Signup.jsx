import { Link } from "react-router-dom";

export default function Signup(){
    return (
        <div>
            <h2>Crear una cuenta</h2>
            <div class="container">
                <div class="white centered">
                    <form action="/haciaAlgunLugar" class="custom-form">
                        <div>
                            <input
                                id="nombre"
                                placeholder="username"
                                name="first-name"
                                type="text"
                                autocomplete="off"
                            />
                        </div>
                        <div>
                            <input
                                id="apellido"
                                placeholder="password"
                                name="last-name"
                                type="password"
                                autocomplete="off"
                            />
                        </div>
                        <div>
                            <input
                                id="email"
                                placeholder="email"
                                name="mail"
                                type="text"
                                autocomplete="off"
                            />
                        </div>
                        <div>
                            <button type="submit" id="btn" class="btn">Login</button>
                        </div>
                    </form>

                    <div class="bottom-text">
                        {/* <Link to ="/login">Login</Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
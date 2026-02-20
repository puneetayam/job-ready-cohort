import React, { useState } from 'react';
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleRegister } = useAuth();

    const submitHandler = (e) => {

        e.preventDefault();

        handleRegister(username, email, password)
            .then(res => console.log(res));


    }



    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={(e) => submitHandler(e)}>
                    <input
                        onInput={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        name="username"
                        placeholder="Enter username" />
                    <input
                        onInput={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Enter email" />
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button
                        type="submit">
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
            </div>
        </main >
    )
}

export default Register
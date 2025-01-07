import React, { useState } from "react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register/', { username, email, password });
            const { access, refresh } = response.data;
            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);
            window.location.href = '/login';
        } catch (error) {
            setError('Invalid username or password');
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>

                <div>
                    <label>Email</label>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                {error && <p>{error}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    )
}
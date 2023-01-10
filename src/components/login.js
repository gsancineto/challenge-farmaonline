import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username && password) {
            try {
                const response = await axios.post('https://www.mockachino.com/06c67c77-18c4-45/login', {
                    username,
                    password,
                });

                localStorage.setItem('userData', JSON.stringify(response.data));
                navigate('/dashboard', { replace: true });
            } catch (error) {
                setError('Usuario o Contraseña inválidos');
            }
        }
        else {
            setError('Debe ingresar Usuario y Contraseña')
        }
    };

    return (
        <div className='w-25 m-auto text-center'>
            <h3>Login</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="form-control"
                        placeholder="Username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-control"
                        placeholder="Password"
                    />
                </Form.Group>
                {error && <p>{error}</p>}
                <Button variant="danger" type="submit" className="w-100">Ingresar</Button>
            </Form>
        </div>
    )
}
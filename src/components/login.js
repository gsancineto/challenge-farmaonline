import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const uri = 'https://www.mockachino.com/06c67c77-18c4-45/login';

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username && password) {
            try {
                const response = await axios.post(uri, {
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
        <div className='d-flex text-center justify-content-center'>
            <Stack spacing={2}>
                <h3>Login</h3>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    margin="normal"
                    type={"text"}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    margin="normal"
                    type={"password"}
                />
                {error && <p>{error}</p>}
                <Button variant="contained" color="error" onClick={handleSubmit}>Ingresar</Button>
            </Stack>
        </div>
    )
}
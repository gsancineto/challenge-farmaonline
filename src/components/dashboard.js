import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { AccessTimeFilledSharp, AccountCircle } from '@mui/icons-material';
import { Avatar, Stack, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';



export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    const uri = 'https://www.mockachino.com/06c67c77-18c4-45/users';

    useEffect(() => {
        if (!user) {
            navigate('/', { replace: true });
        }

        async function fetchData() {
            try {
                const response = await axios.get(uri);
                setUsers(response.data.users);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function handleLogout() {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    if (isLoading) {
        return <div className='w-25 m-auto text-center'><h3><AccessTimeFilledSharp /> Cargando usuarios...</h3></div>;
    }

    return (
        <div className='w-25 m-auto text-center align-center'>
            <Stack spacing={2}>
                <div className='d-flex justify-content-between'>
                    Hola {user.name}
                    <Button variant="text" color="error" onClick={handleLogout}><AccountCircle /> Logout</Button>
                </div>
            </Stack>
            <h6 style={{ float: "left" }}>Dashboard</h6>
            <Table bordered>
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.contactId}>
                            <td className='align-middle'>{`${user.name} ${user.surnames}`}</td>
                            <td className='align-middle'><Moment format="MMMM d, yyyy">{(user.birthDate)}</Moment></td>
                            <td className='d-flex align-middle justify-content-center'>
                                <Avatar
                                    src={user.photo}
                                    sx={{ bgcolor: deepOrange[200] }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
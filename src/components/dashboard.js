import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Image } from 'react-bootstrap';
import Moment from 'react-moment';
import Button from '@mui/material/Button';
import { AccessTimeFilledSharp, AccountCircle } from '@mui/icons-material';

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
        <div className='w-25 m-auto text-center'>
            <div className='d-flex justify-content-between'>
                Hola {user.name}
                <Button variant="text" color="error" onClick={handleLogout}><AccountCircle /> Logout</Button>
            </div>
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
                            <td className='align-middle'>
                                {user.photo ?
                                    <Image
                                        src={user.photo}
                                        onError={({ currentTarget }) => {
                                            currentTarget.src = "";
                                        }}
                                        width="90"
                                        roundedCircle
                                    /> : <AccountCircle sx={{ fontSize: 90 }} color="error" />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
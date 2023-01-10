import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Image } from 'react-bootstrap';
import { PersonCircle, Clock } from 'react-bootstrap-icons';
import Moment from 'react-moment';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/', { replace: true });
        }

        async function fetchData() {
            try {
                const response = await axios.get('https://www.mockachino.com/06c67c77-18c4-45/users');
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
        return <div className='w-25 m-auto text-center'><h3><Clock /> Cargando usuarios...</h3></div>;
    }

    return (
        <div className='w-25 m-auto text-center'>
            <div className='d-flex justify-content-between'>
                <h3>Hola {user.name}</h3>
                <Button variant="outline-danger" onClick={handleLogout}><PersonCircle /> Logout</Button>
            </div>
            <h5 style={{float:"left"}}>Dashboard</h5>
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
                            <td>{`${user.name} ${user.surnames}`}</td>
                            <td><Moment format="MMMM d, yyyy">{(user.birthDate)}</Moment></td>
                            <td>
                                {user.photo && 
                                <Image
                                    src={user.photo}
                                    onError={({ currentTarget }) => {
                                        currentTarget.src = "";
                                    }}
                                    width="100"
                                    roundedCircle
                                />}
                                {!user.photo && <PersonCircle size={90} color="tomato" />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getUsers = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                role: {
                    role_type: 'admin'
                }
            });
            const sortedUsers = response.data.data.sort((a, b) => {
                return a.role.localeCompare(b.role);
            });
            setUsers(sortedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if (!isLoading) getUsers();
        setLoading(true);
    }, [isLoading]);

    const handleDeleteUser = (id) => {
        navigate(`/users/${id}/delete`);
    };

    const handleEditUser = (id) => {
        navigate(`/users/${id}/edit`);
    };

    const handleAddUser = () => {
        navigate('/users/add');
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="mt-4">
                <h1>List of Users</h1>
            </div>
            <div className="container">

                <div className="container">
                    <input
                        type="text"
                        placeholder="Search user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control mt-3 mb-3"
                        style={{ width: '200px', height: '30px' }}
                    />                
                </div>

                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '150px' }}>#</th>
                            <th scope="col">Username</th>
                            <th scope="col" style={{ width: '200px' }}>Role</th>
                            <th scope="col" style={{ width: '170px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((item, index) => (
                            <tr key={item.id}>
                                <td style={{ borderLeft: '1px solid #dee2e6' }}>{index + 1}</td>
                                <td style={{ borderLeft: '1px solid #dee2e6' }}>{item.username}</td>
                                <td style={{ borderLeft: '1px solid #dee2e6' }}>{item.role}</td>
                                <td style={{ justifyContent: 'center', borderLeft: '1px solid #dee2e6', borderRight: '1px solid #dee2e6' }}>
                                    <button className='btn btn-success' style={{ marginRight: '10px' }} onClick={() => handleEditUser(item.id)}>
                                        Edit
                                    </button>
                                    <button className='btn btn-danger' style={{ marginLeft: '10px' }} onClick={() => handleDeleteUser(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className='btn btn-primary' onClick={() => handleAddUser()}>
                Add User
            </button>
        </div>
    );
}

export default Users;

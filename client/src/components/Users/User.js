import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const User = () => {
    const { _id } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
                await axios.get(`${API_BASE_URL}/api/users/${_id}`)
                .then(res => setUser(res.data.data))
        };

        if (!isLoading) {
            getUser();
            setLoading(true);
        }
    }, [isLoading, _id]);

    return (
        <div>
            <div key={user.id}>
                <h1>
                    <button className='btn btn-success'>{user.username}</button>
                    {user.role}
                </h1>
            </div>
        </div>
    );
};

export default User;
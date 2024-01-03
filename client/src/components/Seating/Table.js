import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Table = () => {
    const { num } = useParams();
    const [table, setTable] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const getTable = async () => {
                await axios.get(`${API_BASE_URL}/api/seating/${num}`)
                .then(res => setTable(res.data.data))
            
        };

        if (!isLoading) {
            getTable();
            setLoading(true);
        }
    }, [isLoading, num]);

    return (
        <div>
            <div key={table.id}>
                <h1>
                    <button className='btn btn-success'>{table.num}</button>
                </h1>
            </div>
        </div>
    );
};

export default Table;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const getMenu = async () => {
        await axios.get('http://localhost:5000/api/menu')
            .then(res => setMenu(res.data.data))
    }

    useEffect(() => {
        if (!isLoading) getMenu()
        setLoading(true)
    }, [isLoading])

    const navigate = useNavigate();

    const handleDeleteItem = (id) => {
        navigate(`/menu/${id}/delete`);
    };

    const handleEditItem = (id) => {
        navigate(`/menu/${id}/edit`);
    };

    const handleAddItem = () => {
        navigate('/menu/add');
    };

    const filteredMenu = menu.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const typeMatch = selectedType === 'all' || item.type === selectedType;
        return nameMatch && typeMatch;
    });

    const sortedMenu = filteredMenu.sort((a, b) => {
        if (a.type === "food" && b.type !== "food") {
            return -1;
        } else if (a.type !== "food" && b.type === "food") {
            return 1;
        } else {
            return a.type.localeCompare(b.type);
        }
    });

    return (
        <div>
            <div className="mt-4">
                <h1>MENU</h1>
            </div>
            <div className="container">
                <div>
                    <input
                        type="text"
                        placeholder="Search item..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control mt-3 mb-3"
                        style={{ width: '200px', height: '30px' }}
                    />
                </div>

            <div>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="all"
                        checked={selectedType === 'all'}
                        onChange={() => setSelectedType('all')}
                    />
                     <span style={{ marginLeft: '5px' }}>All</span>
                </label>
                <span style={{ margin: '0 10px' }}></span>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="food"
                            checked={selectedType === 'food'}
                            onChange={() => setSelectedType('food')}
                        />
                        <span style={{ marginLeft: '5px' }}>Food</span>
                </label>
                <span style={{ margin: '0 10px' }}></span>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="drink"
                            checked={selectedType === 'drink'}
                            onChange={() => setSelectedType('drink')}
                        />
                        <span style={{ marginLeft: '5px' }}>Drink</span>
                    </label>
            </div>

                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '50px' }}>#</th>
                            <th scope="col" style={{ width: '200px' }}>Image</th>
                            <th scope="col" style={{ width: '200px' }}>Name</th>
                            <th scope="col" style={{ width: '400px' }}>Description</th>
                            <th scope="col" style={{ width: '100px' }}>Type</th>
                            <th scope="col" style={{ width: '100px' }}>Price (vnd)</th>
                            <th scope="col" style={{ width: '160px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMenu.map((item, index) => (
                            <tr key={item.id}>
                                <td style={{ borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{index + 1}</td>
                                <td style={{ borderLeft: '1px solid #dee2e6' }}>
                                    <img
                                        src={item.imageURL}
                                        alt={item.name}
                                        style={{ width: '180px', height: '120px' }}
                                    />
                                </td>
                                <td style={{ textAlign: 'left', borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{item.name}</td>
                                <td style={{ textAlign: 'left', borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{item.description}</td>
                                <td style={{ borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{item.type}</td>
                                <td style={{ borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{item.price}</td>
                                <td style={{ borderLeft: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', verticalAlign: 'middle' }}>
                                    <button className='btn btn-success' style={{ marginRight: '10px' }} onClick={() => handleEditItem(item.id)}>
                                        Edit
                                    </button>
                                    <button className='btn btn-danger' style={{ marginLeft: '10px' }} onClick={() => handleDeleteItem(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className='btn btn-primary' onClick={() => handleAddItem()}>
                Add Item
            </button>
        </div>
    )
}

export default Menu;

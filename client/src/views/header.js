import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

const Header = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <a href='/'>
                            <img src={logo} alt="CMC" style={{ width: '150px', height: 'auto', marginRight: '10px' }} />
                        </a>
                        <h1 className="nav-item" style={{ color: 'white', fontSize: '30px', margin: 0 }}>CMC Restaurant</h1>
                    </div>

                    <div>
                        <Link className="btn btn-dark" to='/users'>Users</Link>
                        <Link className="btn btn-dark" to='/menu'>Menu</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;

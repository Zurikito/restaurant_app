import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  
    const [userData, setUserData] = useState({
      username: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value
      });
    };

    const handleLogin = () => {
      // navigate('/menu');
    };
  
    return (
      <div className="container mt-4">
        <h3 className="text-left" style={{ textAlign: 'center' }}>Login to continue</h3>
  
        <form className="container mt-4">
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Username</label>
            <div className="col-sm-5">
              <input type="text" className="form-control" id="username" name="username" onChange={handleChange} />
            </div>
          </div>
  
          <div className="form-group row mt-2">
            <label htmlFor="password" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Password</label>
            <div className="col-sm-5">
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
            </div>
          </div>
  
          <div className="form-group row">
            <div>
            <Link to="/seating">
              <button type="submit" className="btn btn-primary mt-2" onClick={handleLogin}>Login</button>
            </Link>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;
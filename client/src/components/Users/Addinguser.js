import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Addinguser = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  
  const [createMessage, setCreateMessage] = useState('');
  
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/create`, {
        user: {
          user_id: userData.username,
          user_password: userData.password,
          user_type: userData.role
        },
        role: {
          role_type: 'admin'
        }
      });
      console.log('User created successfully:', response.data.data);
      setCreateMessage('User created successfully! Redirecting to users...');
      setTimeout(() => {
        navigate('/users');
      }, 5001);
    } catch (error) {
      console.error('Error creating user:', error.message);
      setCreateMessage('Error creating user. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Create a new User</h3>

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

        <div className="form-group row mt-2">
          <label htmlFor="role" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Role</label>
          <div className="col-sm-1">
            <select className="form-control" id="role" name="role" onChange={handleChange} defaultValue="user">
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div>
            <button type="submit" className="btn btn-secondary mt-2" style={{ marginRight: '10px' }} onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary mt-2" style={{ marginLeft: '10px' }} onClick={handleSubmit}>Create</button>
          </div>
        </div>
        {createMessage && (
          <div className="alert alert-success mt-4" role="alert">
            {createMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Addinguser;

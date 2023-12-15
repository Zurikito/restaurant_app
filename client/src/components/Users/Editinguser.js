import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Editinguser = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: ''
  });

  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${_id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users/edit/${_id}`, {
        update: {
          user_id: userData.username,
          user_password: userData.password,
          user_type: userData.role
        },
        role: {
          role_type: 'admin'
        }
      });
      console.log('User updated successfully:', response.data.data);
      setUpdateMessage('User updated successfully! Redirecting to users...');
      setTimeout(() => {
        navigate('/users');
      }, 5000);
    } catch (error) {
      console.error('Error updating user:', error.message);
      setUpdateMessage('Error updating user. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Update User Information</h3>

      <form className="container mt-4">
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Username</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="username" name="username" value={userData.username} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="password" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Password</label>
          <div className="col-sm-5">
            <input className="form-control" id="password" name="password" value={userData.password} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="role" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Role</label>
          <div className="col-sm-1">
            <select className="form-control" id="role" name="role" value={userData.role} onChange={handleChange}>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div>
            <button type="submit" className="btn btn-secondary mt-2" style={{ marginRight: '10px' }} onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary mt-2" style={{ marginLeft: '10px' }} onClick={handleSubmit}>Save</button>
          </div>
        </div>
        {updateMessage && (
          <div className="alert alert-success mt-4" role="alert">
            {updateMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Editinguser;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Deletinguser = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: ''
  });

  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/${_id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/delete/${_id}`, {
        role: {
          role_type: 'admin'
        }
      });
      console.log(response.data.data);
      setDeleteMessage('User deleted successfully! Redirecting to users...');
      setTimeout(() => {
        navigate('/users');
      }, 5001);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      setDeleteMessage('Error deleting user. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Delete User</h3>
      <h5>You are going to delete this user! Continue?</h5>

      <form className="container mt-4">
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Username</label>
            <div className="col-sm-5">
                <span className="form-control" id="username" name="username" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {userData.username}</span>
            </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="password" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Password</label>
            <div className="col-sm-5">
                <span className="form-control" id="password" name="password" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {userData.password}</span>
            </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="role" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Role</label>
            <div className="col-sm-5">
                <span className="form-control" id="role" name="role" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {userData.role}</span>
            </div>
        </div>

        <div className="form-group row">
          <div>
            <button type="submit" className="btn btn-secondary mt-2" style={{ marginRight: '10px' }} onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-danger mt-2" style={{ marginLeft: '10px' }} onClick={handleSubmit}>Delete</button>
          </div>
        </div>
        {deleteMessage && (
          <div className="alert alert-success mt-4" role="alert">
            {deleteMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Deletinguser;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Editing = () => {
  const { _id } = useParams();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: ''
  });

  console.log(userData)

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

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/api/users/edit/${_id}`, userData)
      .then(response => {
        console.log('User data updated successfully:', response.data.data);
      })
      .catch(error => {
        console.error('Error updating user data:', error.message);
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Update User Information</h3>

      <form className="container mt-4" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary mt-2">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editing;

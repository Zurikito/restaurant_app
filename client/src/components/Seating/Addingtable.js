import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Addingtable = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState('');
console.log(tableData)
  const [createMessage, setCreateMessage] = useState('');

  const handleChange = (e) => {
    setTableData(
   e.target.value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/seating/create`, {
        table: {
          num: tableData, // Lấy giá trị từ input có id="num"
        },
        role: {
          role_type: 'admin'
        }
      });
      console.log('Table created successfully:', response.data.data);
      setCreateMessage('Table created successfully! Redirecting to seating...');
      setTimeout(() => {
        navigate('/seating');
      }, 5001);
    } catch (error) {
      console.error('Error creating table:', error.message);
      setCreateMessage('Error creating table. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/seating');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Create a new Table</h3>

      <form className="container mt-4">
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Value</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="num" name="num" onChange={handleChange} />
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

export default Addingtable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Deletingtable = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [tableData, setTableData] = useState({
    value: '',
    
  });

  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/seating/${_id}`);
        setTableData(response.data.data);
      } catch (error) {
        console.error('Error fetching item:', error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/seating/delete/${_id}`, {
        role: {
          role_type: 'admin'
        }
      });
      console.log(response.data.data);
      setDeleteMessage('Table deleted successfully! Redirecting to seating...');
      setTimeout(() => {
        navigate('/seating');
      }, 5001);
    } catch (error) {
      console.error('Error deleting table:', error.message);
      setDeleteMessage('Error deleting table. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/seating');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Delete Table</h3>
      <h5>You are going to delete this table! Continue?</h5>

      <form className="container mt-4">
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Value</label>
            <div className="col-sm-5">
                <span className="form-control" id="value" name="value" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {tableData.value}</span>
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

export default Deletingtable;

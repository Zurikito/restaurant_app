import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Deletingitem = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    imageURL: '',
    price: '',
    type: ''
  });

  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/menu/${_id}`);
        setItemData(response.data.data);
      } catch (error) {
        console.error('Error fetching item:', error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/menu/delete/${_id}`, {
        role: {
          role_type: 'admin'
        }
      });
      console.log(response.data.data);
      setDeleteMessage('Item deleted successfully! Redirecting to menu...');
      setTimeout(() => {
        navigate('/menu');
      }, 5001);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      setDeleteMessage('Error deleting item. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/menu');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Delete Item</h3>
      <h5>You are going to delete this item! Continue?</h5>

      <form className="container mt-4">
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Name</label>
            <div className="col-sm-5">
                <span className="form-control" id="name" name="name" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {itemData.name}</span>
            </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="description" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Description</label>
            <div className="col-sm-5">
                <span className="form-control" id="description" name="description" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {itemData.description}</span>
            </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="price" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Price</label>
            <div className="col-sm-5">
                <span className="form-control" id="price" name="price" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {itemData.price}</span>
            </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="type" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Type</label>
            <div className="col-sm-5">
                <span className="form-control" id="type" name="type" style={{ display: "block", textAlign: "left", paddingLeft: "10px" }}> {itemData.type}</span>
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

export default Deletingitem;

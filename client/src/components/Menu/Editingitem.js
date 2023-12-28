import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Editingitem = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    imageURL: '',
    price: '',
    type: ''
  });

  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/menu/${_id}`);
        setItemData(response.data.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching item:', error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/menu/edit/${_id}`, {
        update: {
          name: itemData.name,
          des: itemData.description,
          img: itemData.imageURL,
          price: itemData.price,
          type: itemData.type
        },
        role: {
          role_type: 'admin'
        }
      });
      console.log('Item updated successfully:', response.data.data);
      setUpdateMessage('Item updated successfully! Redirecting to menu...');
      setTimeout(() => {
        navigate('/menu');
      }, 5001);
    } catch (error) {
      console.error('Error updating item:', error.message);
      setUpdateMessage('Error updating item. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/menu');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Update Item Information</h3>

      <form className="container mt-4">
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Name</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="name" name="name" value={itemData.name} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="description" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Description</label>
          <div className="col-sm-5">
            <textarea className="form-control" id="description" name="description" value={itemData.description} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="imageURL" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Image URL</label>
          <div className="col-sm-5">
            <textarea className="form-control" id="imageURL" name="imageURL" value={itemData.imageURL} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="price" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Price</label>
          <div className="col-sm-5">
            <input className="form-control" id="price" name="price" value={itemData.price} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="type" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Type</label>
          <div className="col-sm-1">
            <select className="form-control" id="type" name="type" value={itemData.type} onChange={handleChange}>
              <option value="food">food</option>
              <option value="drink">drink</option>
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

export default Editingitem;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addingitem = () => {
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    imageURL: '',
    price: '',
    type: 'food'
  });

  const [createMessage, setCreateMessage] = useState('');

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/menu/create', {
        item: {
          name: itemData.name,
          des: itemData.description,
          img: itemData.imageURL,
          type: itemData.type,
          price: itemData.price
        },
        role: {
          role_type: 'admin'
        }
      });
      console.log('Item created successfully:', response.data.data);
      setCreateMessage('Item created successfully! Redirecting to menu...');
      setTimeout(() => {
        navigate('/menu');
      }, 5000);
    } catch (error) {
      console.error('Error creating item:', error.message);
      setCreateMessage('Error creating item. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/menu');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-left" style={{ textAlign: 'center' }}>Create a new Item</h3>

      <form className="container mt-4">
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Name</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="name" name="name" onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="description" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Description</label>
          <div className="col-sm-5">
            <input type="description" className="form-control" id="description" name="description" onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="imageURL" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Image URL</label>
          <div className="col-sm-5">
            <input type="imageURL" className="form-control" id="imageURL" name="imageURL" onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="price" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Price</label>
          <div className="col-sm-5">
            <input type="price" className="form-control" id="price" name="price" onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="type" className="col-sm-4 col-form-label text-left" style={{ textAlign: 'right' }}>Type of Item</label>
          <div className="col-sm-1">
            <select className="form-control" id="type" name="type" onChange={handleChange} defaultValue="food">
              <option value="food">food</option>
              <option value="drink">drink</option>
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

export default Addingitem;
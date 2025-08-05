import React, { useState } from 'react';
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;
import './EditingProducts.css';

const EditingProducts = ({ product, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) data.append('image', image);

    try {
      const res = await fetch(`${ServerUrl}/updateProduct/${product._id}`, {
        method: 'PUT',
        body: data,
      });
      
      if (!res.ok) throw new Error('Update failed');
      onUpdated();  
      onClose();    
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${ServerUrl}/deleteProduct/${product._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Delete failed');
      onUpdated();  
      onClose();    
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="edit-form-container">
      <form onSubmit={handleSubmit} className="edit-product-form">
        <button onClick={handleDelete} id='deletebtn'>Delete</button>
        <h2>Edit Product</h2>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />Price
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />Quantity
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditingProducts;

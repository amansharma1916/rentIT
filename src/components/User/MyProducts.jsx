import React, { useEffect, useState } from 'react';
import './MyProducts.css';

const ServerUrl = import.meta.env.VITE_BASE_SERVER_URL;

const MyProducts = () => {
  const userId = localStorage.getItem('userId');
  const [Products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState([]);

  useEffect(() => {
    document.title = 'My Products - RentIT';
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await fetch(`${ServerUrl}/getProducts/${userId}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, [userId]);

  const handleRemoveProduct = async (productId) => {
    try {
      const res = await fetch(`${ServerUrl}/deleteProduct/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) throw new Error('Failed to remove product');
      setProducts(Products.filter(product => product._id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowCustomers = async (productId) => {
    if (expandedProductId === productId) {
      setExpandedProductId(null); 
      return;
    }

    setExpandedProductId(productId);

    try {
      const res = await fetch(`${ServerUrl}/getCustomerDetails/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) {
        console.error('Failed to fetch customer details');
        setCustomerDetails([]);
        return;
      }
      const data = await res.json();
      setCustomerDetails(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="UserRentalcontainer">
        <div className="userProductBar">
          {Products.map((product) => (
            <div className="myproductbar" key={product._id}>
                <div className="product-main">

              <div className="barimg">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="barname">
                <p>{product.name}</p>
              </div>
              <div className="barprice">
                <p>Price: ₹{product.price}/day</p>
              </div>
              <div className="barqnty">
                <p>Quantity: {product.quantity}</p>
              </div>
              <div className="barbtn">
                <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
              </div>
              <div className="showCustomers">
                <button
                  id='show-customers-btn'
                  onClick={() => handleShowCustomers(product._id)}
                  >
                  {expandedProductId === product._id ? 'Hide Customers' : 'Show Customers'}
                </button>
              </div>
                    </div>

              {expandedProductId === product._id && (
                customerDetails.length > 0 ? (
                  <div className="customer-details">
                    {customerDetails.map((customer, index) => (
                        <div key={customer.userID} className="customer-detail">
                            <h4>customer {index + 1}</h4>
                        <p>Name : {customer.username}</p>
                        <p>Email : {customer.email}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No customers found for this product.</p>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;

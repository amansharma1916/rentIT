import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import './EditProductPage.css';
import NavBar from './NavBar_m';
import EditingProducts from './EditingProducts';

const ServerUrl = import.meta.env.VITE_BASE_SERVER_URL;

const EditProductPage = () => {
  const [products, setProducts] = useState([]);
  const [EP, setEP] = useState(null); // Currently editing product

  const fetchProducts = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await fetch(`${ServerUrl}/getProducts/${userId}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    document.title = 'Edit Product - RentIT';
  }, []);

  return (
    <div>
      <div className="userProductContainer">
        <div className="NavBar"><NavBar /></div>
        <div className="userProducts">
          <div className="userProductCard">
            {products.map((product) => (
              <div key={product._id} className="product-card" id="mpPimg">
                {EP?._id === product._id ? (
                  <EditingProducts
                    product={EP}
                    onClose={() => setEP(null)}
                    onUpdated={fetchProducts}
                  />
                ) : (
                  <>
                    <img src={product.image} alt={product.name} />
                    <div className="pName">
                      <h2>{product.name}</h2>
                    </div>
                    <div className="pdesc">
                      <p>Description: {product.description}</p>
                    </div>
                    <div className="pPrice">
                      <p>Price: Rs. {product.price}</p>
                    </div>
                    <div className="pQnty">
                      <p>Quantity Available: {product.quantity}</p>
                    </div>
                    <button onClick={() => setEP(product)} className="edit-button">
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;

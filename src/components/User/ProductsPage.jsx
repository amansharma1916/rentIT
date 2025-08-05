
import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import NavBar from './NavBar_m';
import Loader from './Loader';

const ServerUrl = import.meta.env.VITE_BASE_SERVER_URL;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;
  const [rentedProducts, setRentedProducts] = useState(new Set());

  const fetchProducts = async () => {
    if (skip !== 0) setLoadingMore(true);
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setInitialLoading(false);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 500));
      const res = await fetch(`${ServerUrl}/getProductLoading/${userId}?skip=${skip}&limit=${limit}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();

      setProducts((prev) => [...prev, ...data]);
      setSkip((prev) => prev + data.length);
      if (data.length < limit) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100 &&
        hasMore && !loadingMore && !initialLoading
      ) {
        fetchProducts();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, initialLoading]);

  const pID = localStorage.getItem('userId');
  const ownerName = (product) => (product.pId === pID ? 'You' : product.ownerName);

  const handleRent = async (product) => {
    const res = await fetch(`${ServerUrl}/rentProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        productId: product._id,
        pId: product.pId,
      }),
    });

    if (res.ok) {
      alert('Product rented successfully!');
      setRentedProducts((prev) => new Set(prev).add(product._id));
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity - 1, isRented: true }
            : p
        )
      );
    } else {
      const json = await res.json();
      alert(json.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="main-products-list">
        <div className="main-product-container">
          {initialLoading && (
            <div className="main-initial-loader">
              <Loader />
            </div>
          )}

          {products.map((product) => (
            <div key={product._id} className="main-product-card">
              {product.isRented && <div className="main-ribbon">Already Rented</div>}

              <div className="main-product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="main-product-name">
                <h2>{product.name}</h2>
              </div>
              <div className="main-product-desc">
                <p>Description: {product.description}</p>
              </div>
              <div className="main-product-price">
                <p>Price: ₹{product.price}</p>
              </div>
              <div className="main-product-quantity">
                <p>Quantity Available: {product.quantity}</p>
              </div>

              <button onClick={() => handleRent(product)} className="main-rent-button">
                Take Rent
              </button>

              <div className="main-product-owner">
                <p>Owner: {ownerName(product)}</p>
              </div>
            </div>
          ))}

          {!initialLoading && loadingMore && (
            <div className="main-loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

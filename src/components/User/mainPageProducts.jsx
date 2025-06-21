import React, { useEffect, useState, useRef } from 'react';
import './mainPageProducts.css';
import Loader from './Loader';
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;

const MainPageProducts = () => {
  const [products, setProducts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchProducts = async () => {
    skip === 0 ? null : setLoadingMore(true);

    try {
      await new Promise((r) => setTimeout(r, 1000));

      const res = await fetch(
        `${ServerUrl}/getProductLoading?skip=${skip}&limit=${limit}`
      );
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

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loadingMore &&
      !initialLoading
    ) {
      fetchProducts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, initialLoading]);

  const pID = localStorage.getItem('userId');
  const ownerName = (product) =>
    product.pId.toString() === pID ? 'You' : product.ownerName;

  return (
    <div className="products-list">
      <div className="productContainer">

        {initialLoading && (
          <div className="initial-loader">
            <Loader />
          </div>
        )}

        {products.map((product) => (
          <div key={product._id} className="product-card" id='mpPimg'>
            <img
              src={product.image}
              alt={product.name}
            />
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

            <button className="rent-button">Take Rent</button>
            <div className="ownerName">
              <p>Owner: {ownerName(product)}</p>
            </div>
          </div>
        ))}

        {!initialLoading && loadingMore && (
          <div className="loader">
            <Loader />
          </div>
        )}

        {!hasMore && !initialLoading && (
          <div className="endMessage">
            <p>No more products to load.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPageProducts;

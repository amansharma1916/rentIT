import React from 'react'
import './mainPage.css'
import NavBar from './NavBar_m'
import { useState } from 'react'
import MainPageProducts from './mainPageProducts'
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;
import { useEffect } from 'react';
const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
    setSearchTerm(''); 
  };
  useEffect(() => {
      document.title = 'User - RentIT';
    }, []);

  return (
    <div className="full-main-page">
      <div className="main-page">
        <div className="main-page-header">
          <div className="NavBar">
            <NavBar />
          </div>
          <div className="searchBar">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
          </div> 
        </div>
        <div className="main-page-content">
          <MainPageProducts />
        </div>
      </div>
    </div>
  )
}

export default MainPage

import React from 'react'
import './OrderPage.css'
import NavBar from './NavBar_m'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import MyProducts from './MyProducts'
import UserRentals from './UserRentals'

const OrderPage = () => {
    const [clicked, setClicked] = React.useState(false);
    const [clickedO, setClickedO] = React.useState(false);

    const handleMyProducts = () => {
        setClicked(!clicked);
        setClickedO(false);
    }


    const handleMyOrders = () => {
        setClickedO(!clickedO);
        setClicked(false);
    }
  return (
    <div>
      <div className="OrderPageContainer">
        <div className="NavBar">
          <NavBar />
        </div>
        <div className="OrderPage">
          <div className="OrderPageNav">
            <div className="OPNavL" ><button onClick={handleMyOrders} style={{height: clickedO?"5rem":"3rem",
                marginTop: clickedO?"1rem":"0rem",backgroundColor: clickedO?"#ffffff":"transparent",color: clickedO?"#000000":"#2bff00"
            }}>My Rentals</button></div>
            <div className="OPNavR"><button onClick={handleMyProducts} style={{height: clicked?"5rem":"3rem",
                marginTop: clicked?"1rem":"0rem",backgroundColor: clicked?"#ffffff":"transparent",color: clicked?"#000000":"#2bff00"
            }}>My Products</button></div>
          </div>
          <div className="OrderPageContent">
            {clickedO ? <UserRentals /> : null}
            {clicked ? <MyProducts /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage

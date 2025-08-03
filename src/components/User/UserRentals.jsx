import React from 'react'
const ServerUrl = import.meta.env.VITE_BASE_SERVER_URL;
import './UserRentals.css'
import { useState, useEffect } from 'react'



const UserRentals = () => {

  const userId = localStorage.getItem('userId');
  const [rentals, setRentals] = useState([]);
  
  const fetchRentals = async () => {
    try {
      const res = await fetch(`${ServerUrl}/getRentedProducts/${userId}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      
      if (data.length === 0) {
        alert('No rentals found');
        return;
      }
      setRentals(data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    document.title = 'My Rentals - RentIT';
    fetchRentals();
  }, []);

  const handleRemoveRental = async (productId) => {
    try {
      const res = await fetch(`${ServerUrl}/removeRental`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId , productId })
      });
      if (!res.ok) throw new Error('Failed to remove rental');
      alert('Rental removed successfully');
      fetchRentals();
    } catch (err) {
      console.error(err);
      alert('Error removing rental');
    }
  }

  return (
    <div>
      <div className="UserRentalcontainer">
        <div className="userRentalBar">
          {rentals.map((rental) => {
            return (
              <div className="myrentalbar" key={rental._id}>
                <div className="barimg">
                  <img src={rental.image} alt={rental.name} />
                </div>
                <div className="barname">
                  <p>{rental.name}</p>
                </div>
                <div className="barprice">
                  <p>Price: ₹{rental.price}/day</p>
                </div>
                <div className="barqnty">
                  <p>Quantity: {1}</p>
                </div>
                <div className="removeProduct">
                  <button onClick={() => handleRemoveRental(rental._id)}>Remove</button>
                </div>
              </div>
            )
          
          })}
        <div className="userRentalFooter">
          <p>Total Rentals: {rentals.length}</p>
        </div>
      </div>
    </div>
  </div>
  )

}

export default UserRentals

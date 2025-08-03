import React from 'react'
import './Dashboard.css'
import { useState } from 'react'
const ServerUrl = import.meta.env.VITE_BASE_SERVER_URL;
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleViewUser = async () => {
        console.log("clicked");
        setLoading(true);
        navigate('/admin/dashboard/viewUser');
        setLoading(false);
    };
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/login');
    };

  return (
    <div>
      <div className="adminColumnMain">
        <div className="adminHeader">
        <div className="logout-btn" onClick={handleLogout}>Logout</div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {localStorage.getItem('adminUsername')}</p>

        </div>
        <div className="adminContent">
            <div className="adminCard">
                <h2>Manage Users</h2>
                <button className="adminButton" onClick={handleViewUser}>{loading ? "Loading..." : "View Users"}</button>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

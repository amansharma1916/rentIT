import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const getuserDetail = () => {
      try {
        const res = fetch(`${ServerUrl}/getUserDetails?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          
        });
        res.then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user details');
          }
        }).then(data => {
          setUserId(data.userID);
          localStorage.setItem('userId', data.userID); // Store user ID in local storage
        }).catch(error => {
          console.error('Error fetching user details:', error);
        });
      } catch (error) {
        console.error('Error in getUserDetails:', error);
      }
    };

    const pingServer = async () => {
      try {
        const response = await fetch(`${ServerUrl}/ping`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Server responded:', data.message);
        } else {
          throw new Error('Failed to ping server');
        }
      } catch (error) {
        console.error('Error pinging server:', error);
      }
    };

  const Navigate = useNavigate();
  useEffect(() => {
    document.title = 'Login - RentIT';
    pingServer(); 
  }, []);

  const handelSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ServerUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        localStorage.setItem('userId', userId); 
        localStorage.setItem('isLoggedIn', 'true'); 
        localStorage.setItem('username', username); 
        setIsLoggedIn(true);
        
        await getuserDetail();
        Navigate('/mainPage');
      } else {
        const data = await response.json();
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handelSignin}>Login</button>
        </form>
        <p className="bottom-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="bottom-text">
          <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

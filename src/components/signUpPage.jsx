import React, { useState , use} from 'react';
import { Link } from 'react-router-dom';
import './signUpPage.css';
import { useNavigate } from "react-router-dom";
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;
import { useEffect } from 'react';



function SignUpPage() {
  const Navigate = useNavigate();
  const [uid, setUid] = useState(0);
  const getuserId = () =>{
    const userId = Math.floor(Math.random() * 1000000);
    setUid(userId);
    return userId;
  }


  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    document.title = 'SignUp - RentIT';
  }, []);

const handleSignUp = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${ServerUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form,        // spreading username, email, password
        userId: getuserId()  // sending uid from a function
      })
    });

    if (res.ok) {
      alert('Sign up successful!');
      setForm({
        username: '',
        email: '',
        password: ''
      });
      Navigate('/login');
    } else {
      const errorData = await res.json();
      alert('Sign up failed: ' + (errorData.message || 'Please try again.'));
    }
  } catch (error) {
    console.error('Error during sign up:', error);
    alert('An error occurred. Please try again later.');
  }
};


  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" onClick={handleSignUp}>Sign Up</button>
        </form>
        <p className="bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className="bottom-text">
          <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;

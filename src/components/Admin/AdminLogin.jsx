import React from 'react'
import './AdminLogin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();

    // const addAdmin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`${ServerUrl}/addAdmin`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username, password }),
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             setSuccessMsg('Admin added successfully!');
    //         } else {
    //             setErrorMsg(data.message || 'Failed to add admin.');
    //         }
    //     } catch (error) {
    //         setErrorMsg('An error occurred. Please try again later.');
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        if (username === '' || password === '') {
            setErrorMsg('Please fill in all fields');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${ServerUrl}/adminLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMsg('Login successful!');
                localStorage.setItem('adminToken', data.admin.adminId);
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('adminUsername', username); 
                navigate('/admin/dashboard');
                
            } else {
                setUsername('');
                setPassword('');
                setErrorMsg(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setErrorMsg('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }

    }



  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {errorMsg && <div className="error-msg">{errorMsg}</div>}

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin

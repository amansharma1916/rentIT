import React, { use } from 'react'
import './ViewUser.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const ViewUser = () => {
    const [loading, setLoading] = useState(false);
    const ServerUrl = import.meta.env.VITE_BASE_SERVER_URL;
    const [users, setUsers] = useState([]);
    const [empty, setEmpty] = useState(true);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${ServerUrl}/admin/getUsers`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
            if (data.length === 0) {
                setEmpty(true);
            } else {
                setEmpty(false);
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const removeUser = async (user_Id) => {
        try{
            const response = await fetch(`${ServerUrl}/admin/deleteUser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ user_Id })
            });
            if (!response.ok) throw new Error('Failed to remove user');
            setUsers(users.filter(user => user._id !== user_Id));
            alert('User removed successfully');

        }catch (error) {
            console.error('Error removing user:', error);
            alert('Failed to remove user');
        }
    }

    const removerUserProducts = async (userId) => {
        try {
            const response = await fetch(`${ServerUrl}/admin/deleteProductbyUserId`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) throw new Error('Failed to remove user products');
            // alert('User products removed successfully');
        } catch (error) {
            console.error('Error removing user products:', error);
            // alert('Failed to remove user products');
        }
    }

    const handleRemoveUser = async (user_Id , userId) => {
        const confirmRemove = window.confirm('Are you sure you want to remove this user?');
        if (!confirmRemove) return;

        await removerUserProducts(userId);
        await removeUser(user_Id);
        
    }


  return (
    <div>
            <div className="viewUserContainer">
                <div className="back-btn" onClick={()=>{
                    navigate('/admin/dashboard');
                }}>🔙back</div>
                <div className="userDetails" key={users.userID}>
                    <h2>User Details</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : empty ? (
                        <p>No users found.</p>) : 
                        (
                        <div className="userDetail">
                            {users.map(user => (
                                <div key={user._id} className="userCard">
                                        <button className="removeUser" onClick={() => handleRemoveUser(user._id,user.userID)}>remove</button>
                                    <div className="username">username :  {user.username}
                                    </div>
                                    <div className="email">Email : {user.email}</div>
                                    <div className="userProducts">
                                        <button className='userProduct-btn'>Products</button>
                                    </div>
                                    <div className="userRentals">
                                        <button className="userRentals-btn">Rentals</button>
                                    </div>

                                </div>

                            ))}
                            {empty && <p>No users found.</p>}

                        </div>
                    )}
                    
                </div>
            </div>
    </div>
  )
}

export default ViewUser

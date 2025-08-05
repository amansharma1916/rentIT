import React, { use } from 'react'
import './NavBar_m.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;



const NavBar_m = () => {
  const Navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('./uploads/profileImages/default.png');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageRef = useRef(null);
  const userId = localStorage.getItem('userId');
  const [TempUserId , setTempUserId] = useState(null);
  const handelLogoClick = () => {
    imageRef.current.click();
  }

 const handelLogoChange = async (e) => {
  setIsImageLoading(true);

  const file = e.target.files[0];
  if (!file) {
    alert("Please select an image file");
    setIsImageLoading(false);
    return;
  }

  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', localStorage.getItem('userId'));

    const res = await fetch(`${ServerUrl}/uploadImage`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Image uploaded successfully:", data);
      
      setProfileImage(data.profileImage);

    } else {
      console.error("Failed to upload image");
      alert("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("An error occurred while uploading.");
  } finally {
    setIsImageLoading(false);
  }
};

useEffect(() => {
  const username = localStorage.getItem('username');
  const getUserId = async () =>{
    const res = await fetch(`${ServerUrl}/getUserId?username=${username}`);
    if (res.ok) {
      const data = await res.json();
      
      setTempUserId(data.userId);
      
    } else {
      console.log("Failed to fetch user ID");
    }
  }
  
    getUserId();
    
  
}, []);


useEffect(() => {

  
const getProfileImage = async () => {
  if (!TempUserId) {
    return;
  }
  try {
    const res = await fetch(`${ServerUrl}/getProfileImage/${TempUserId}`);
    if (res.ok) {
      const data = await res.json();
      
      if (data.user.profileImage === '') {
        setProfileImage('src/components/User/images/guest_user.png');
      } else {
        setProfileImage(data.user.profileImage);
      }
      
    } else {
      console.error("Failed to fetch profile image");
    }
  } catch (error) {
    console.error("Error fetching profile image:", error);
  }
};

getProfileImage();

},[TempUserId]);




const handelLogout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  
  Navigate('/login');
}


  return (
    <div>
      <div className="UpperNavBar_m">
        <div className="NavBar_m">
          <div className="leftNavBar_m">
            <div className="logo_m" onClick={handelLogoClick}>
              <img
                src={profileImage}
                alt="Logo"
              />
              
              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                style={{ display: 'none' }}
                onChange={handelLogoChange}
              />
            </div>
              <div className="mUserName">
              <h1>{localStorage.getItem('username')}</h1>
            </div>
          </div>
          <div className="rightNavBar_m">
            <div className="flexBox_m">
              <div className="mlinks">
                <Link to={'/user/home'} className="links_m">Home</Link>
                <Link to={'/user/products'} className="links_m">Products</Link>
                <Link to={'/user/orders'} className="links_m">Orders</Link>
                <Link to={'/user/rent'} className="links_m">Rent</Link>
                <button className="links_m_button" onClick={handelLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar_m

import React from 'react'
import './landingPage.css'
import { Link, useNavigate } from 'react-router-dom'
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;
import { useEffect } from 'react';
const landingPage = () => {
  const lProducts = [
    {
      id: 1,
      name: "Laptop",
      image: "https://imgs.search.brave.com/eI3p8GeoigpFBd1HWQUmbT5qLy4njyoFshCRCq9GmYY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzL2MwMC9sYXB0/b3AtbW9ja3VwLWRl/c2lnbi0wNDEwLTU3/MDkxODcuanBnP2Zt/dA",
      description: "High performance laptop for rent",
      price: 500,
      location: "Ranchi"
    },
    {
      id: 2,
      name: "Camera",
      image: "https://imgs.search.brave.com/SQWlFksqwklAhOeD1TwIN2H4oWjsUI6y3YRc5MkLex8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxhY2ttYWdp/Y2Rlc2lnbi5jb20v/aW1hZ2VzL3Byb2R1/Y3RzL2xhbmRpbmcv/cHJvZHVjdHMvZGln/aXRhbC1maWxtLWNh/bWVyYXMvYmxhY2tt/YWdpYy1wb2NrZXQt/Y2luZW1hLWNhbWVy/YS00ay5qcGc_X3Y9/MTU5OTQ1ODE2MA",
      description: "Professional camera for photography",
      price: 300,
      location: "Jamshedpur"
    },
    {
      id: 2,
      name: "Camera",
      image: "https://imgs.search.brave.com/SQWlFksqwklAhOeD1TwIN2H4oWjsUI6y3YRc5MkLex8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxhY2ttYWdp/Y2Rlc2lnbi5jb20v/aW1hZ2VzL3Byb2R1/Y3RzL2xhbmRpbmcv/cHJvZHVjdHMvZGln/aXRhbC1maWxtLWNh/bWVyYXMvYmxhY2tt/YWdpYy1wb2NrZXQt/Y2luZW1hLWNhbWVy/YS00ay5qcGc_X3Y9/MTU5OTQ1ODE2MA",
      description: "Professional camera for photography",
      price: 300,
      location: "Jamshedpur"
    },
    {
      id: 2,
      name: "Camera",
      image: "https://imgs.search.brave.com/SQWlFksqwklAhOeD1TwIN2H4oWjsUI6y3YRc5MkLex8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxhY2ttYWdp/Y2Rlc2lnbi5jb20v/aW1hZ2VzL3Byb2R1/Y3RzL2xhbmRpbmcv/cHJvZHVjdHMvZGln/aXRhbC1maWxtLWNh/bWVyYXMvYmxhY2tt/YWdpYy1wb2NrZXQt/Y2luZW1hLWNhbWVy/YS00ay5qcGc_X3Y9/MTU5OTQ1ODE2MA",
      description: "Professional camera for photography",
      price: 300,
      location: "Jamshedpur"
    },
    {
      id: 2,
      name: "Camera",
      image: "https://imgs.search.brave.com/SQWlFksqwklAhOeD1TwIN2H4oWjsUI6y3YRc5MkLex8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxhY2ttYWdp/Y2Rlc2lnbi5jb20v/aW1hZ2VzL3Byb2R1/Y3RzL2xhbmRpbmcv/cHJvZHVjdHMvZGln/aXRhbC1maWxtLWNh/bWVyYXMvYmxhY2tt/YWdpYy1wb2NrZXQt/Y2luZW1hLWNhbWVy/YS00ay5qcGc_X3Y9/MTU5OTQ1ODE2MA",
      description: "Professional camera for photography",
      price: 300,
      location: "Jamshedpur"
    },
    {
      id: 2,
      name: "Camera",
      image: "https://imgs.search.brave.com/SQWlFksqwklAhOeD1TwIN2H4oWjsUI6y3YRc5MkLex8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxhY2ttYWdp/Y2Rlc2lnbi5jb20v/aW1hZ2VzL3Byb2R1/Y3RzL2xhbmRpbmcv/cHJvZHVjdHMvZGln/aXRhbC1maWxtLWNh/bWVyYXMvYmxhY2tt/YWdpYy1wb2NrZXQt/Y2luZW1hLWNhbWVy/YS00ay5qcGc_X3Y9/MTU5OTQ1ODE2MA",
      description: "Professional camera for photography",
      price: 300,
      location: "Jamshedpur"
    }
  ]

  function renderProductCard(product) {
    return (
      <div className="lproductCard" key={product.id}>
        <img src={product.image} alt={product.name} className="lproductImage" />
        <h2 className="lproductName">{product.name}</h2>
        <p className="lproductDescription">{product.description}</p>
        <p className="lproductPrice">Price: ₹{product.price}/day</p>
        <p className="lproductLocation">Location: {product.location}</p>
        
      </div>
    )
  }

  const Navigate = useNavigate();
  const handelLogin = ()=>{
    Navigate('/login');
  }
  const handelSignup = ()=>{
    Navigate('/signup');
  }

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
  
    useEffect(() => {
      pingServer(); 
    }, []);

  return (
    <div className="ParentPage">
    <div className="lFullPage">
        <div className="lmainPage">
            <div className="lnavBar">
              
              <div className="outerlogodiv">
                <div className="llogo">Rent It</div>
              </div>
              <div className="outeroptiondiv">
              <div className="loptions">
                <ul>
                  <li>Home</li>
                  <li>Browse Product</li>
                  <li><button className='llogin' onClick={handelLogin}>Login</button></li>
                  <li><button className='lsignup' onClick={handelSignup}>Sign Up</button></li>
                </ul>
              </div>
              </div>
            </div>
            <div className="mainText">
              <h1>Rent Anything. Anytime. Anywhere</h1>
            </div>
            <div className="lsearchBar">
              <input type="text" placeholder='Search Product' className='lsearchInput'/>
              <select name="location" id="loactionselect" placeholder='Location'>
                <option value="Ranchi">Ranchi</option>
                <option value="Jamshedpur">Jamshedpur</option>
              </select>
              <button className='lsearchButton' id='searchbutton'>Search</button>
            </div>
            
        </div>
    </div>
    <div className="lproductPage">
      <div className="lproductCardUpper">
        {lProducts.map(renderProductCard)}

        
      </div>
    </div>
    
    </div>
  )
}

export default landingPage

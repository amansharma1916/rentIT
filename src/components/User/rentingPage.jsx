import React, { use } from 'react'
import './rentingPage.css'
import NavBar from './NavBar_m'
import { useState , useEffect} from 'react'
const ServerUrl  = import.meta.env.VITE_BASE_SERVER_URL;
import { useNavigate } from 'react-router-dom';

const RentingPage = () => {
    const Navigate = useNavigate();
    const [productImage, setProductImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [quantityAvailable, setQuantityAvailable] = useState('');
    const pID = localStorage.getItem('userId');
    
    const handleProductAdd = async (e) => {
        e.preventDefault();
        
        if (!productImage || !productName || !productDescription || !pricePerDay || !quantityAvailable) {
            alert("Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append('image', productImage);
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', pricePerDay);
        formData.append('quantity', quantityAvailable);
        formData.append('pid', pID);
        formData.append('ownerName' , localStorage.getItem('username'));

        try {
            const response = await fetch(`${ServerUrl}/addProduct`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("Product added successfully!");
                
                setProductImage(null);
                setProductName('');
                setProductDescription('');
                setPricePerDay('');
                setQuantityAvailable('');
            } else {
                alert("Failed to add product. Please try again.- Frontend");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred while adding the product.");
        }
    };

    const handelEditProduct = () =>{
      Navigate('/user/editProduct');
    }


  return (
    <div>
        <div className="NavBar">
     <NavBar />
     </div>
     <div className="renting-content">
       
       <div className="productInputCard">
            <h2>Rent Your Product</h2>
            <form className="productForm">
            <input type="file" placeholder='Upload Product Image' onChange={(e) => setProductImage(e.target.files[0])} />
            <input type="text" placeholder="Product Name" required value={productName} onChange={(e) => setProductName(e.target.value)} />
            <input type="text" placeholder="Product Description" required value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            <input type="number" placeholder="Price per Day" required value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} />
            <input type="number" placeholder="Quantity Available" required value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)} />
            <button type="submit" onClick={handleProductAdd}>Submit</button>
            </form>
            <button onClick={handelEditProduct} id='productEditButton'>Edit Rented Products</button>
       </div>
     </div>
    </div>
  )
}

export default RentingPage

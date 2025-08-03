import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './components/landingPage'
import LoginPage from './components/loginPage'
import SignUpPage from './components/signUpPage'
import ProtectedRoutes from './ProtectedRoutes'
import AdminProtect from './AdminProtect'
import Dashboard from './components/Admin/User/Dashboard'
import MainPage from './components/User/mainPage'
import RentingPage from './components/User/rentingPage'
import ProductsPage from './components/User/ProductsPage'
import EditProductPage from './components/User/EditProductPage'
import OrederPage from './components/User/OrderPage'
import AdminLogin from './components/Admin/AdminLogin'
import ViewUser from './components/Admin/User/ViewUser'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/mainPage' element={<ProtectedRoutes><MainPage /></ProtectedRoutes>} />
          <Route path='/user/rent' element={<ProtectedRoutes><RentingPage /></ProtectedRoutes>} />
          <Route path='/user/products' element={<ProtectedRoutes><ProductsPage /></ProtectedRoutes>} />
          <Route path='/user/home' element={<ProtectedRoutes><MainPage /></ProtectedRoutes>} />
          <Route path='/user/editProduct' element={<ProtectedRoutes><EditProductPage /></ProtectedRoutes>} />
          <Route path='/user/orders' element={<ProtectedRoutes><OrederPage /></ProtectedRoutes>} />
          <Route path='/login/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminProtect><Dashboard /></AdminProtect>} />
          <Route path='/admin/dashboard/viewUser' element={<AdminProtect><ViewUser /></AdminProtect>} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

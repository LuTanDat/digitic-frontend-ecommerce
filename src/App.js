import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Signup from './pages/Signup';
import Resetpassword from './pages/Resetpassword';
import ChangePassword from './pages/ChangePassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TernAndContions from './pages/TernAndContions';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Introduce from './pages/Introduce';

import { jwtDecode } from 'jwt-decode';

function App() {

  console.log(jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmIyYTczMzNmMzk5MmYwZjNkYzY2MSIsImlhdCI6MTY5OTEwNjQyMywiZXhwIjoxNjk5MTkyODIzfQ.uKIsTjXUqsPO5-Ur6iWDxh2yBDHOUFi3AWC3r0Q2u8c"));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contact' element={<Contact />} />
            <Route path='introduce' element={<Introduce />} />
            <Route path='product' element={<Product />} />
            <Route path='product/:id' element={<SingleProduct />} />
            <Route path='blogs' element={<Blog />} />
            <Route path='blog/:id' element={<SingleBlog />} />
            <Route path='cart' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
            <Route path='my-orders' element={<PrivateRoutes><Orders /></PrivateRoutes>} />
            <Route path='my-profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path='checkout' element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
            <Route path='compare-product' element={<CompareProduct />} />
            <Route path='wishlist' element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
            <Route path='login' element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path='forgot-password' element={<Forgotpassword />} />
            <Route path='signup' element={<OpenRoutes><Signup /></OpenRoutes>} />
            <Route path='reset-password/:token' element={<Resetpassword />} />
            <Route path='change-password/' element={<ChangePassword />} />
            <Route path='privacy-policy' element={<PrivacyPolicy />} />
            <Route path='refund-policy' element={<RefundPolicy />} />
            <Route path='shipping-policy' element={<ShippingPolicy />} />
            <Route path='tern-conditions' element={<TernAndContions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

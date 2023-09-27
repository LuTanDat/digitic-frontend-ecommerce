import React from 'react'
import { Outlet } from 'react-router-dom'; // noi dung thay doi theo URL hien tai
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
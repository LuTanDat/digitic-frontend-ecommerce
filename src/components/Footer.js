import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from '../images/newsletter.png';


const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className='row align-items-center'>
            <div className='col-5'>
              <div className='footer-top-data d-flex gap-30 align-items-center'>
                <img src={newsletter} alt='newsletter' />
                <h2 className='mb-0 text-white'>Sign Up For Newsletter</h2>
              </div>
            </div>
            <div className='col-7'>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email"
                  aria-label="Your Email"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text py-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'>Contac Us</h4>
              <div>
                <address className='text-white fs-6'>
                  Demo Store <br /> No. 1259 Freedom, New York, 11111 <br /> United States
                </address>
                <a href='tel:+84 12345678' className='mt-3 d-block mb-1 text-white'>
                  0123456789
                </a>
                <a href='mailto:abc@gmail.com' className='mt-2 d-block mb-0 text-white'>
                  abc@gmail.com
                </a>
                <div className='social-icons d-flex align-items-center gap-15 mt-4'>
                  <a href='' className='text-white'><BsLinkedin className='fs-4' /></a>
                  <a href='' className='text-white'><BsInstagram className='fs-4' /></a>
                  <a href='' className='text-white'><BsYoutube className='fs-4' /></a>
                  <a href='' className='text-white'><BsGithub className='fs-4' /></a>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Information</h4>
              <div className='footer-links d-flex flex-column'>
                <Link to='/privacy-policy' className='text-white py-2 mb-1'>Privacy Policy</Link>
                <Link to='/refund-policy' className='text-white py-2 mb-1'>Refund Policy</Link>
                <Link to='/shipping-policy' className='text-white py-2 mb-1'>Shipping Policy</Link>
                <Link to='/tern-conditions' className='text-white py-2 mb-1'>Terms of Service</Link>
                <Link className='text-white py-2 mb-1'>Blogs</Link>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Acount</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>About Us</Link>
                <Link className='text-white py-2 mb-1'>Faq</Link>
                <Link className='text-white py-2 mb-1'>Contact</Link>
              </div>
            </div>
            <div className='col-2'>
              <h4 className='text-white mb-4'>Quick Links</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className='row'>
            <div className='col-12'>
              <p className='text-center mb-0 text-white'>
                &copy; {new Date().getFullYear()}; Powered by Developer's Lu Tan Dat
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
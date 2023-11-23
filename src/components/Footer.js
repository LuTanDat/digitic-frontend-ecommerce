/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram, BsFacebook } from "react-icons/bs";
import newsletter from '../images/newsletter.png';


const Footer = () => {
  return (
    <>
      {/* <footer className='py-4'>
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
      </footer> */}
      <footer className='py-2'>
        <div className="container-xxl">
          <div className='row'>
            <div className='col-12'>
              <div className='d-flex align-items-center justify-content-center gap-30 footer-mobile-head'>
                <h4 className='text-white text-center mb-0'>Liên lạc với chúng tôi</h4>
                <div className='social-icons d-flex align-items-center gap-15 justify-content-center'>
                  <a href='https://www.facebook.com/profile.php?id=100032169791462&mibextid=ZbWKwL' target="_blank" className='text-white'><BsFacebook className='fs-4' /></a>
                  <a href='https://instagram.com/lutandat1112?igshid=OGQ5ZDc2ODk2ZA==' target="_blank" className='text-white'><BsInstagram className='fs-4' /></a>
                </div>
              </div>
            </div>
            {/* <div className='col-3'>
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
            </div> */}
          </div>
        </div>
      </footer>
      <footer className='py-2'>
        <div className="container-xxl">
          <div className='row'>
            <div className='col-12'>
              <p className='text-center mb-0 text-white footer-mobile-second'>
                &copy; {new Date().getFullYear()}; Bản quyền thuộc về Lư Tấn Đạt {/* Powered by Developer's Lu Tan Dat */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
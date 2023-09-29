/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import { AiOutlineHome, AiOutlineMail, AiOutlineInfoCircle } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";

const Contact = () => {
  return (
    <>
      <Meta title='Contact Us' />
      <BreadCrumb title='Contact Us' />
      <div className='contact-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5844.272719427907!2d105.76927121185608!3d10.029328949028537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2sCan%20Tho%20University!5e0!3m2!1sen!2s!4v1695979343895!5m2!1sen!2s"
                width="600"
                height="450"
                className='border-0 w-100'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className='col-12 mt-5'>
              <div className='contact-inner-wrapper d-flex justify-content-between'>
                <div>
                  <h3 className='contact-title mb-4'>Contact</h3>
                  <form action='' className='d-flex flex-column gap-15'>
                    <div>
                      <input type='text' className='form-control' placeholder='Name'></input>
                    </div>
                    <div>
                      <input type='text' className='form-control' placeholder='Email'></input>
                    </div>
                    <div>
                      <input type='text' className='form-control' placeholder='Phone Number'></input>
                    </div>
                    <div>
                      <textarea
                        name=''
                        id=''
                        className='w-100 form-control'
                        cols="30"
                        rows="4"
                        placeholder='Comments'
                      >
                      </textarea>
                    </div>
                    <div>
                      <button className='button border-0'>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className='contact-title mb-4'>Get in touch with us</h3>
                  <div>
                    <ul className='ps-0'>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineHome className='fs-5' />
                        <address className='mb-0'>33 New Montgomery St. Ste 750 San Francisco, CA, USA 94105</address>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiPhoneCall className='fs-5' />
                        <a href='tel:+84 12345678'>0123456789</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineMail className='fs-5' />
                        <a href='mailto:abc@gmail.com'>abc@gmail.com</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineInfoCircle className='fs-5' />
                        <p className='mb-0'>Monday – Friday 10 AM – 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
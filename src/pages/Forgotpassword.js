import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const Forgotpassword = () => {
  return (
    <>
      <Meta title='Forgot Password' />
      <BreadCrumb title='Forgot Password' />
      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Reset Your Password</h3>
              <p className='text-center mt-2 mb-3'>We will send you an email to reset your password</p>
              <form action='' className='d-flex flex-column gap-15'>
                <div>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='form-control'
                  />
                </div>
                <div>
                  <div className='mt-3 d-flex flex-column justify-content-center align-items-center gap-15'>
                    <button className='button border-0' type='submit'>Submit</button>
                    <Link to='/login'>Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Forgotpassword

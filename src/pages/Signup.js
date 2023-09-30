import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import Container from '../components/Container';

const Signup = () => {
  return (
    <>
      <Meta title='Sign Up' />
      <BreadCrumb title='Sign Up' />
      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Sign Up</h3>
              <form action='' className='d-flex flex-column gap-15'>
                <div>
                  <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    className='form-control'
                  />
                </div>
                <div>
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    className='form-control'
                  />
                </div>
                <div>
                  <input
                    type='tel'
                    name='mobile'
                    placeholder='Mobile'
                    className='form-control'
                  />
                </div>
                <div className='mt-1'>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='form-control'
                  />
                </div>
                <div>
                  <div className='mt-3 d-flex justify-content-center align-items-center gap-15'>
                    <button className='button border-0'>SignUp</button>
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

export default Signup

import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

let signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(loginUser(values));
    },
  });
  return (
    <>
      <Meta title='Login' />
      <BreadCrumb title='Login' />
      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Login</h3>
              <form
                action=''
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column gap-15'
              >
                <CustomInput
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link to='/forgot-password'>Forgot Password?</Link>
                  <div className='mt-3 d-flex justify-content-center align-items-center gap-15'>
                    <button className='button border-0' type='submit'>Login</button>
                    <Link to='/signup' className='button signup' type='submit'>SignUp</Link>
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

export default Login

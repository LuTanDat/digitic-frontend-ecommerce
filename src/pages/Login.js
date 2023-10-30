/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

let loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authState = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(loginUser(values));
    },
  });
  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate("/")
      }
    }
  }, [authState])
  return (
    <>
      <Meta title='Login' />
      <BreadCrumb title='Đăng nhập' />
      <Container class1='login-wrapper py-5' style={{ backgroundColor: '#7985c9' }}>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Đăng nhập</h3>
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
                  placeholder='Mật khẩu'
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link to='/forgot-password'>Quên mật khẩu?</Link>
                  <div className='mt-3 d-flex justify-content-center align-items-center gap-15'>
                    <button className='button border-0' type='submit'>Đăng nhập</button>
                    <Link to='/signup' className='button signup' type='submit'>Đăng ký</Link>
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

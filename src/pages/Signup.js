import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../features/user/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

let signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Tên không được để trống"),
  lastName: Yup.string().required("Họ không được để trống"),
  email: Yup.string()
    .email("Email không khả dụng")
    .required("Email không được để trống"),
  mobile: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(
      /^(84|0[3|5|7|8|9])+([0-9]{8,9})$/,
      "Số điện thoại không hợp lệ"
    ),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ký tự hoa, ký tự thường, số và ký tự đặc biệt"
    ),
});

const Signup = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(registerUser(values));
    },
  });
  useEffect(() => {
    if (authState.createdUser !== undefined && authState.isError === false) {
      navigate("/login")
    }
  }, [authState])
  return (
    <>
      <Meta title='Sign Up' />
      <BreadCrumb title='Đăng ký' />
      <Container class1='login-wrapper py-5' style={{ backgroundColor: '#7985c9' }}>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Đăng ký</h3>
              <form
                action=''
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column gap-15'
              >
                <CustomInput
                  type='text'
                  name='lastName'
                  placeholder='Họ'
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
                <div className="error">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
                <CustomInput
                  type='text'
                  name='firstName'
                  placeholder='Tên'
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
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
                  type='tel'
                  name='mobile'
                  placeholder='Số điện thoại'
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <div className='custom-input-password'>
                  <CustomInput
                    type={isShowPassword ? "text" : "password"}
                    name='password'
                    placeholder='Mật khẩu'
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <span
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {
                      isShowPassword
                        ? <FaRegEye />
                        : <FaRegEyeSlash />
                    }
                  </span>
                </div>

                <div>
                  <div className='d-flex justify-content-center align-items-center gap-15'>
                    <button className='button border-0 signIn' type='submit'>Đăng ký</button>
                    <Link to='/login' className='button signup' type='submit'>Đăng nhập</Link>
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

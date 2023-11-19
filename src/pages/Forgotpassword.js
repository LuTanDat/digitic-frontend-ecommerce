import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice';

let emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không khả dụng")
    .required("Email không được để trống"),
});

const Forgotpassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: values => {
      dispatch(forgotPasswordToken(values));
    },
  });
  return (
    <>
      <Meta title='Forgot Password' />
      <BreadCrumb title='Quên mật khẩu' />
      <Container class1='login-wrapper py-5' style={{ backgroundColor: '#7985c9' }}>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Quên mật khẩu?</h3>
              <p className='text-center mt-2 mb-3'>Chúng tôi sẽ gửi cho bạn một email để reset mật khẩu của bạn!</p>
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
                <div className="error text-center">
                  {formik.touched.email && formik.errors.email}
                </div>
                <div>
                  <div className='mt-3 d-flex flex-column justify-content-center align-items-center gap-15'>
                    <button className='button border-0 btn-submit signIn' type='submit'>Gửi</button>
                    <Link to='/login' className='btn-submit text-center'>Hủy</Link>
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

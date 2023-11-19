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
import { changePassword, resetState } from '../features/user/userSlice';

let Schema = Yup.object().shape({
  oldPassword: Yup.string().required("Mật khẩu cũ không được để trống"),
  newPassword: Yup.string().required("Mật khẩu mới không được để trống"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetState());
  }, [])

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: Schema,
    onSubmit: values => {
      dispatch(changePassword(values));
    },
  });
  useEffect(() => {
    if (authState.updatedPassword !== undefined && authState.isError === false) {
      navigate("/my-profile");
    }
  }, [authState])
  return (
    <>
      <Meta title='Change Password' />
      <BreadCrumb title='Thay đổi mật khẩu' />
      <Container class1='login-wrapper py-5' style={{ backgroundColor: '#7985c9' }}>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Đổi mật khẩu</h3>
              <form
                action=''
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column gap-15'
              >
                <CustomInput
                  type='password'
                  name='oldPassword'
                  placeholder='Mật khẩu cũ'
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange("oldPassword")}
                  onBlur={formik.handleBlur("oldPassword")}
                />
                <div className="error">
                  {formik.touched.oldPassword && formik.errors.oldPassword}
                </div>
                <CustomInput
                  type='password'
                  name='newPassword'
                  placeholder='Mật khẩu mới'
                  value={formik.values.newPassword}
                  onChange={formik.handleChange("newPassword")}
                  onBlur={formik.handleBlur("newPassword")}
                />
                <div className="error">
                  {formik.touched.newPassword && formik.errors.newPassword}
                </div>
                <div>
                  <Link to='/forgot-password'>Quên mật khẩu?</Link>
                  <div className='mt-3 d-flex justify-content-center align-items-center gap-15'>
                    <button className='button border-0 btn-submit' type='submit'>Đổi mật khẩu</button>
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

export default ChangePassword

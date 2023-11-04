import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, updateProfile } from '../features/user/userSlice';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

let profileSchema = Yup.object().shape({
  firstName: Yup.string().required("Họ không được để trống"),
  lastName: Yup.string().required("Tên không được để trống"),
  email: Yup.string()
    .email("Email không khả dụng")
    .required("Email không được để trống"),
  mobile: Yup.string().required("Số điện thoại không được để trống"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);

  const userState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    dispatch(resetState());
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstName || "",
      lastName: userState?.lastName || "",
      email: userState?.email || "",
      mobile: userState?.mobile || "",
      address: userState?.address || "",
      city: userState?.city || "",
    },
    validationSchema: profileSchema,
    onSubmit: values => {
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });
  return (
    <>
      <Meta title={'My-Profile'} />
      <BreadCrumb title='Hồ sơ của tôi' />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center gap-3'>
                <h3 className='my-3 section-heading'>Hồ sơ của tôi</h3>
                <FiEdit className='fs-3' onClick={() => setEdit(false)} title='Chỉnh sửa thông tin' />
              </div>
              <Link to='/change-password' className='btn-change-password'>Đổi mật khẩu?</Link>
            </div>
          </div>
          <div className='col-12'>
            <form
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">Tên</label>
                <input
                  type="text"
                  name='firstName'
                  disabled={edit}
                  className="form-control"
                  id="example1"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">Họ</label>
                <input
                  type="text"
                  name='lastName'
                  disabled={edit}
                  className="form-control"
                  id="example2"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
                <div className="error">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input
                  type="email"
                  name='email'
                  disabled={edit}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail2" className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  name='mobile'
                  disabled={edit}
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example3" className="form-label">Địa chỉ</label>
                <input
                  type="text"
                  name='address'
                  disabled={edit}
                  className="form-control"
                  id="example3"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
                <div className="error">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example3" className="form-label">Thành phố</label>
                <input
                  type="text"
                  name='city'
                  disabled={edit}
                  className="form-control"
                  id="example3"
                  value={formik.values.city}
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                />
                <div className="error">
                  {formik.touched.city && formik.errors.city}
                </div>
              </div>
              {edit === false && <button type="submit" className="btn btn-primary">Save</button>}
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile

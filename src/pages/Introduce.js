/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta"; // thay doi tieu de
import {
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import Container from "./../components/Container";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createQuery } from "../features/contact/contactSlice";
import { useDispatch } from "react-redux";

let contactSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is Required"),
  mobile: Yup.string().required("Mobile is Required"),
  comment: Yup.string().required("Comment is Required"),
});

const Introduce = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery(values));
    },
  });
  return (
    <>
      <Meta title="Giới thiệu" />
      <BreadCrumb title="Giới thiệu" />
      <Container class1="contact-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">

          </div>
        </div>
      </Container>
    </>
  );
};

export default Introduce;

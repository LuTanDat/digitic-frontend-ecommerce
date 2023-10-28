/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "./../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosconfig"
import { createAnOrder, deleteUserCart, getUserCart, resetState } from "../features/user/userSlice";


let shippingSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  address: Yup.string().required("Address Details is Required"),
  state: Yup.string().required("State is Required"),
  city: Yup.string().required("City is Required"),
  country: Yup.string().required("Country is Required"),
  pincode: Yup.string().required("Zipcode is Required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);
  const authState = useSelector((state) => state.auth);
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    if (authState?.orderedProduct?.order !== null && authState?.orderedProduct?.success === true) {
      navigate("/my-orders");
    }
  }, [authState])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      // setShippingInfo(values);
      setTimeout(() => {
        checkOutHandler(values);
      }, 300)
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId?._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price
      })
    }
    setCartProductState(items);
  }, [])
  // console.log(cartProductState);

  const checkOutHandler = async (shippingInfo) => {

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load")
      return;
    }

    const result = await axios.post("http://localhost:5000/api/user/order/checkout", { amount: totalAmount + 5 }, config);
    if (!result) {
      alert("Something Went Wrong")
      return
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_7VjhqlVAo807jh", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Developer's LuDat",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          // razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);

        setTimeout(() => {
          dispatch(createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: result.data,
            shippingInfo
          }))
        }, 2000);
        setTimeout(() => { dispatch(deleteUserCart()) }, 2000); // lam trong gio hangf
      },
      prefill: {
        name: "Dev LuDat",
        email: "devludat@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Developer's LuDat Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5" style={{ marginTop: "70px" }}>
        <div className="row">
          <div className="col-8">
            <div className="checkout-left-data">
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>

              <h4 className="mb-3">Thông tin giao hàng</h4>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-wrap gap-15 justify-content-between"
              >
                {/* <div className="w-100">
                  <select
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="vietnam">Viet Nam</option>
                    <option value="usa">USA</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div> */}
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Tên"
                    className="form-control"
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Họ"
                    className="form-control"
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="form-control"
                    name='mobile'
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div className="w-100 pb-3 border-bottom">
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="form-control"
                    name='address'
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                {/* <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suit, etc (Optional)"
                    className="form-control"
                    name='other'
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name='city'
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name='state'
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      State/Province
                    </option>
                    <option value="Aberdeenshire">Aberdeenshire</option>
                    <option value="Angus">Angus</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name='pincode'
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>*/}
                <div className="w-100 border-bottom py-4">
                  <h4 className="mb-3">Sản phẩm</h4>
                  {cartState &&
                    cartState?.map((item, index) => {
                      return (
                        <div
                          className="d-flex gap-10 mb-2 align-items-center"
                          key={index}
                        >
                          <div className="w-75 d-flex gap-30">
                            <div className="position-relative">
                              <div>
                                <span
                                  style={{ top: "-10px", right: "-10px" }}
                                  className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                >
                                  {item?.quantity}
                                </span>
                                <img
                                  src={item?.productId?.images[0]?.url}
                                  width={100}
                                  height={100}
                                  alt="product"
                                />
                              </div>
                            </div>
                            <div>
                              <h5 className="total-price">
                                {item?.productId?.title}
                              </h5>
                              <p className="total-price">{item?.color?.title}</p>
                            </div>
                          </div>
                          <div className="flex-grow-1 text-center">
                            <h5 className="total">
                              {totalAmount ? (item?.price * item?.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Trở về giỏ hàng
                    </Link>
                    <Link to="/product" className="button">
                      Tiếp tục mua sắm
                    </Link>
                    {/* <button className="button" type="submit">
                      Place Order
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-4">
            <div className="border-bottom py-4">
              <h4 className="mb-3">Phương thức thanh toán</h4>
              <div>
                <input type="radio" id="COD" name="payment" value="COD" className="me-2" defaultChecked />
                <label htmlFor="COD">Thanh toán khi nhận hàng</label><br />
                <input type="radio" id="card" name="payment" value="card" className="me-2" />
                <label htmlFor="card">Thanh toán online</label><br />
              </div>
            </div>
            <div className="border-bottom py-4">
              <h4 className="mb-3">Thanh toán</h4>
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Tổng tiền </p>
                <p className="total-price">
                  {totalAmount ? (totalAmount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Phí vận chuyển </p>
                <p className="mb-0 total-price">
                  {totalAmount ? (20000).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                </p>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between align-items-center pt-4">
                <h4 className="total">Thành tiền </h4>
                <h5 className="total-price">
                  {totalAmount ? ((totalAmount + 20000)).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                </h5>
              </div>
              <button className="button w-100 mt-3" type="submit" style={{ backgroundColor: "#fd7e14" }}>
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;

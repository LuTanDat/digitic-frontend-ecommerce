/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "./../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosconfig"
import { createAnOrder, deleteUserCart, getUserCart, resetState, updateProfile } from "../features/user/userSlice";
import { PayPalButton } from "react-paypal-button-v2";
import { paymentService } from "../features/payment/paymentService";

let shippingSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  address: Yup.string().required("Address Details is Required"),
  // state: Yup.string().required("State is Required"),
  city: Yup.string().required("City is Required"),
  // country: Yup.string().required("Country is Required"),
  // pincode: Yup.string().required("Zipcode is Required"),
  mobile: Yup.string().required("Mobile is Required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);

  const [totalAmount, setTotalAmount] = useState(null);
  const [totalAmountAfterDiscount, setTotalAmountAfterDiscount] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Mặc định là thanh toán khi nhận hàng
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    let sumPrice = 0;
    let sumPriceAfterDiscount = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sumPrice = sumPrice + Number(cartState[index].quantity) * cartState[index].price;
      sumPriceAfterDiscount = sumPriceAfterDiscount + Number(cartState[index].quantity) * cartState[index].priceAfterDiscount;
      setTotalAmount(sumPrice);
      setTotalAmountAfterDiscount(sumPriceAfterDiscount);
    }
  }, [cartState]);

  useEffect(() => {
    if (authState?.orderedProduct?.createdOrder !== null && authState?.orderedProduct?.message === 'SUCCESS') {
      dispatch(deleteUserCart());
      navigate("/my-orders");
    }
    else if (authState?.orderedProduct?.message === 'ERR' && authState?.orderedProduct?.product.length > 0) {
      navigate("/cart");
    }
  }, [authState])

  const deliveryPrice = useMemo(() => {
    if (totalAmount >= 2000000 && totalAmount < 5000000) {
      return 10000
    } if (totalAmount === 0 || totalAmount >= 5000000) {
      return 0
    } else {
      return 20000
    }
  }, [totalAmount])

  const formik = useFormik({
    initialValues: {
      firstName: authState?.user?.firstName || "",
      lastName: authState?.user?.lastName || "",
      address: authState?.user?.address || "",
      city: authState?.user?.city || "",
      mobile: authState?.user?.mobile || "",
      // state: "",
      // country: "",
      // pincode: "",
      // other: "",   
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      if (values.firstName !== authState?.user?.firstName ||
        values.lastName !== authState?.user?.lastName ||
        values.address !== authState?.user?.address ||
        values.city !== authState?.user?.city ||
        values.mobile !== authState?.user?.mobile
      ) {
        dispatch(updateProfile(values));
      }
      setTimeout(() => {
        dispatch(createAnOrder({
          totalPrice: totalAmount + deliveryPrice, // loc tong gia trong cart
          totalPriceAfterDiscount: totalAmount - (totalAmount - totalAmountAfterDiscount) + deliveryPrice,
          orderItems: cartProductState, // loc tung sp trong cart
          paymentMethod: paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : paymentMethod === "paypal-card" ? "Thanh toán bằng Paypal" : "",
          shippingInfo: values,
        }))
      }, 500);
    },
  });

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId?._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color,
        price: cartState[index].price,
        priceAfterDiscount: cartState[index].priceAfterDiscount
      })
    }
    setCartProductState(items);
  }, [])


  // THANH TOAN PAYPAL

  const onSuccessPaypal = (details, data) => {
    // console.log("details, data: ", details, data);
    dispatch(createAnOrder({
      totalPrice: totalAmount + deliveryPrice, // loc tong gia trong cart
      totalPriceAfterDiscount: totalAmount - (totalAmount - totalAmountAfterDiscount) + deliveryPrice,
      orderItems: cartProductState, // loc tung sp trong cart
      paymentMethod: paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : paymentMethod === "paypal-card" ? "Thanh toán bằng Paypal" : "",
      shippingInfo: formik.values,
      isPaid: true,
      paidAt: details.update_time
    }))
  }

  const addPaypalScript = async () => {
    const { data } = await paymentService.getConfig()//get Client_id from DB
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
    script.async = true;
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [])

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
                <div className="w-100">
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
                <div className="flex-grow-1 pb-3 border-bottom">
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
                            <h5 className='total' style={{ color: item?.priceAfterDiscount !== item?.price ? "gray" : "red" }}>
                              {
                                item?.priceAfterDiscount !== item?.price ? <del>
                                  {item?.price * item?.quantity ? (item?.price * item?.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "đ"}
                                </del> : item?.price * item?.quantity ? (item?.price * item?.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "đ"
                              }
                            </h5>
                            {
                              item?.priceAfterDiscount !== item?.price && (
                                <h5 className='total' style={{ color: "red" }}>
                                  {item?.priceAfterDiscount * item?.quantity ? (item?.priceAfterDiscount * item?.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "đ"}
                                </h5>)
                            }
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
                    {/* <button className="button" type="submit" style={{ backgroundColor: "#fd7e14" }}>
                      Đặt hàng
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-4">
            <div className="border-bottom py-4">
              <h4 className="mb-3">Phương thức thanh toán</h4>
              <div className="form-check">
                <input
                  type="radio"
                  id="COD"
                  name="payment"
                  value="COD"
                  className="me-2 form-check-input"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => { setPaymentMethod(e.target.value) }}
                />
                <label htmlFor="COD">Thanh toán khi nhận hàng</label><br />
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  value="paypal-card"
                  className="me-2 form-check-input"
                  checked={paymentMethod === "paypal-card"}
                  onChange={(e) => { setPaymentMethod(e.target.value) }}
                />
                <label htmlFor="card">Thanh toán bằng Paypal</label><br />
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
                <p className="total">Giảm giá </p>
                <p className="total-price">
                  {totalAmountAfterDiscount ? (totalAmount - totalAmountAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : 0}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Phí vận chuyển </p>
                <p className="mb-0 total-price">
                  {totalAmount ? (deliveryPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : 0}
                </p>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between align-items-center pt-4">
                <h4 className="total">Thành tiền </h4>
                <h5 className="total-price">
                  {totalAmount ? ((totalAmount - (totalAmount - totalAmountAfterDiscount) + deliveryPrice)).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                </h5>
              </div>
              {
                paymentMethod === "paypal-card" && sdkReady ? (
                  <PayPalButton
                    amount={(totalAmount - (totalAmount - totalAmountAfterDiscount) + deliveryPrice)}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert("Error")
                    }}
                  />
                ) : (
                  <button
                    className="button w-100 mt-3"
                    type="submit"
                    style={{ backgroundColor: "#fd7e14" }}
                    onClick={formik.handleSubmit}
                  >
                    Đặt hàng
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;

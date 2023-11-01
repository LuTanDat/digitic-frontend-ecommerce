/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, getOrders, resetState } from '../features/user/userSlice';

const Orders = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };

  const dispatch = useDispatch();
  const canceledOrderState = useSelector((state) => state?.auth?.canceledOrder);
  const orderState = useSelector((state) => state?.auth?.getOrderedProduct?.orders);

  useEffect(() => {
    dispatch(resetState())
    dispatch(getOrders())
  }, [canceledOrderState])
  return (
    <>
      <Meta title={'My Orders'} />
      <BreadCrumb title='Đơn hàng' />
      <Container class1='cart-wrapper home-wrapper-2 py-3'>
        <div className='row'>
          {/* table head */}
          {/* <div className='col-12'>
            <div className='row'>
              <div className='col-3'>
                <h5>Tổng tiền</h5>
              </div>
              <div className='col-3'>
                <h5>Tiền sau khuyến mãi</h5>
              </div>
              <div className='col-3'>
                <h5>Thanh toán</h5>
              </div>
              <div className='col-3'>
                <h5>Trạng thái đơn hàng</h5>
              </div>
            </div>
          </div> */}
          {/* table body */}
          <div className='col-12'>
            {
              orderState && orderState?.map((item, index) => {
                return (
                  <div style={{ backgroundColor: "#febd69" }} className='row mb-3' key={index}>
                    <div className='col-2 p-2 d-flex align-items-center gap-1'>
                      <p className='mb-0'>Tổng tiền:</p>
                      <p className='mb-0'>
                        {item?.totalPrice ? (item?.totalPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                      </p>
                    </div>
                    <div className='col-3 p-2 d-flex align-items-center gap-1'>
                      <p className='mb-0'>Tổng tiền sau khuyến mãi:</p>
                      <p className='mb-0'>
                        {item?.totalPriceAfterDiscount ? (item?.totalPriceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                      </p>
                    </div>
                    <div className='col-3 p-2 d-flex align-items-center gap-1'>
                      <p className='mb-0'>Thanh toán:</p>
                      <p className='mb-0'>{item?.paymentMethod}</p>
                    </div>
                    <div className='col-4 p-2 d-flex gap-1 align-items-center justify-content-between align-items-center'>
                      <p className='mb-0'>Trạng thái đơn hàng: </p>
                      <p className='mb-0' style={{ fontWeight: item?.orderStatus === "Đã Hủy" ? "600" : "" }}>{item?.orderStatus}</p>
                      {
                        item?.orderStatus !== "Đã Hủy" &&
                        <button
                          className='p-1'
                          style={{ border: "1px solid #9255FD", borderRadius: "4px", color: "red" }}
                          onClick={() => { dispatch(cancelOrder({ id: item?._id, config2 })) }}
                        >
                          Hủy đơn hàng
                        </button>
                      }

                    </div>
                    {/* order details */}
                    <div className='col-12'>
                      <div className='row' style={{ backgroundColor: "#777777" }}>
                        <div className='col-12'>
                          <div className='row border-bottom text-center'>
                            <div className='col-6 p-2'>
                              <h6 className='text-white mb-0'>Sản phẩm</h6>
                            </div>
                            <div className='col-2 p-2'>
                              <h6 className='text-white mb-0'>Số lượng</h6>
                            </div>
                            <div className='col-2 p-2'>
                              <h6 className='text-white mb-0'>Giá</h6>
                            </div>
                            <div className='col-2 p-2'>
                              <h6 className='text-white mb-0'>Tổng tiền</h6>
                            </div>
                          </div>
                        </div>
                        {/* detail of order detail */}
                        {
                          item?.orderItems?.map((i, index) => {
                            return (
                              <div className='col-12' key={index}>
                                <div className='row p-3 d-flex align-items-center text-center' style={{ borderBottom: "1px solid rgb(140 138 138)" }}>
                                  <div className='col-6 d-flex align-items-center gap-3'>
                                    <div style={{ width: "15%" }}>
                                      <img
                                        src={i?.product?.images[0]?.url}
                                        className='img-fluid'
                                        alt='product image'
                                      />
                                    </div>
                                    <p className='text-white'>{i?.product?.title}</p>
                                  </div>
                                  <div className='col-2'>
                                    <p className='text-white'>{i?.quantity}</p>
                                  </div>
                                  <div className='col-2'>
                                    <p className='text-white'>
                                      {i?.priceAfterDiscount ? (i?.priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                                    </p>
                                  </div>
                                  <div className='col-2'>
                                    <p className='text-white'>
                                      {i?.priceAfterDiscount ? (i?.priceAfterDiscount * i?.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Container>
    </>
  )
}

export default Orders

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAOrder } from '../features/user/userSlice'
import StepOrderComponent from '../components/StepOrderComponent'
import { useMemo } from 'react'

const OrderDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getOrderId = location.pathname.split("/")[2];

  const aOrderState = useSelector((state) => state?.auth?.aOrder);

  console.log("aOrderState", aOrderState);

  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, [])

  const orderStatus = useMemo(() => {
    if (aOrderState?.orderStatus === "Đã đặt hàng") {
      return 0
    }
    else if (aOrderState?.orderStatus === "Đang xử lý") {
      return 1
    }
    else if (aOrderState?.orderStatus === "Đang giao") {
      return 2
    }
    else if (aOrderState?.orderStatus === "Đã nhận hàng") {
      return 3
    }
    else if (aOrderState?.orderStatus === "Đã Hủy") {
      return 4
    }
  }, [aOrderState?.orderStatus])

  const itemsOrderStatus = [
    {
      title: 'Đã đặt hàng',
    },
    {
      title: 'Đang xử lý',
    },
    {
      title: 'Đang giao',
    },
    {
      title: 'Đã nhận hàng',
    },
    {
      title: 'Đã Hủy',
    },
  ]

  return (
    <>
      <Meta title='Product Name' />
      <BreadCrumb title="Chi tiết đơn hàng" />

      <Container class1='main-product-wrapper home-wrapper-2 py-4'>
        <div className='row'>
          <div className='col-12'>
            <h3 className="mb-3 text-center fs-4">Chi Tiết Đơn Hàng</h3>
          </div>
          <div className='col-12 mb-3 mt-2 text-center'>
            <StepOrderComponent items={itemsOrderStatus} current={orderStatus} />
          </div>
          <div className="col-12 d-flex mb-4 mt-2 justify-content-around align-items-baseline">
            <div style={{ border: "1px solid #857575cc", borderRadius: "10px", padding: "15px", backgroundColor: "white" }}>
              <h5>Địa chỉ nhận hàng</h5>
              <p>{`Người nhận: ${aOrderState?.shippingInfo?.lastName} ${aOrderState?.shippingInfo?.firstName}`}</p>
              <p>{`SĐT: ${aOrderState?.shippingInfo?.mobile}`}</p>
              <p className='mb-0'>{`Địa chỉ: ${aOrderState?.shippingInfo?.address}`}</p>
            </div>
            <div style={{ border: "1px solid #857575cc", borderRadius: "10px", padding: "15px", backgroundColor: "white" }}>
              <h5>Thông tin đơn hàng</h5>
              <p>{`Mã đơn hàng: ${aOrderState?._id}`}</p>
              <p>{`Ngày đặt hàng: ${new Date(aOrderState?.createdAt).toLocaleString()}`}</p>
              <p>{`Phương thức thanh toán: ${aOrderState?.paymentMethod}`}</p>
              <p className='mb-0'>{`Thời gian thanh toán: ${new Date(aOrderState?.paidAt).toLocaleString()}`}</p>
            </div>
          </div>

          <div className='col-12'>
            <div className='row' style={{ backgroundColor: "#777777" }}>
              <div className='col-12'>
                <div className='row border-bottom text-center'>
                  <div className='col-md-6 d-none d-md-block p-2'>
                    <h6 className='text-white mb-0'>Sản phẩm</h6>
                  </div>
                  <div className='col-md-2 d-none d-md-block p-2'>
                    <h6 className='text-white mb-0'>Số lượng</h6>
                  </div>
                  <div className='col-md-2 d-none d-md-block p-2'>
                    <h6 className='text-white mb-0'>Giá</h6>
                  </div>
                  <div className='col-md-2 d-none d-md-block p-2'>
                    <h6 className='text-white mb-0'>Tổng tiền</h6>
                  </div>
                </div>
              </div>
              {/* detail of order detail */}
              {
                aOrderState?.orderItems?.map((i, index) => {
                  return (
                    <div className='col-12' key={index}>
                      <div className='row p-3 d-flex align-items-center text-center order-wrapper-mobile'
                        style={{ borderBottom: "1px solid rgb(140 138 138)" }}
                      >
                        <div className='col-md-6 d-flex align-items-center gap-3 order-product-info-mobile'>
                          <div className='order-product-image-mobile' style={{ width: "15%" }}>
                            <img
                              src={i?.product?.images[0]?.url}
                              className='img-fluid'
                              alt='product image'
                            />
                          </div>
                          <div className='order-product-detail-info-mobile'>
                            <p className='text-white order-name-product-mobile mb-0'>{i?.product?.title}</p>
                            <div className='d-block d-md-none'>
                              <p className='text-white order-quantity-product-mobile mb-0'>x{i?.quantity}</p>
                              <p className='text-white order-price-product-mobile mb-0'>
                                {i?.priceAfterDiscount ? (i?.priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-2 d-none d-md-block'>
                          <p className='text-white mb-0'>{i?.quantity}</p>
                        </div>
                        <div className='col-md-2 d-none d-md-block'>
                          <p className='text-white mb-0'>
                            {i?.priceAfterDiscount ? (i?.priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                          </p>
                        </div>
                        <div className='col-md-2 order-totalprice-order'>
                          <p className='d-block d-md-none mb-0'>Thành tiền: </p>
                          <p className='text-white mb-0'>
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

          <div className='col-12 my-3' style={{ textAlign: "right" }}>
            <p>{`Tổng tiền hàng: ${aOrderState?.itemsPrice ? (aOrderState?.itemsPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}`}</p>
            <p>{`Phí vận chuyển: ${aOrderState?.shippingPrice ? (aOrderState?.shippingPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}`}</p>
            <b>{`Thành tiền: ${aOrderState?.totalPrice ? (aOrderState?.totalPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}`}</b>
          </div>
          <div className='col-12 text-center'>Cảm ơn quý khách đã tin tưởng và ủng hộ. Xin cảm ơn!</div>
        </div>
      </Container>
    </>
  )
}

export default OrderDetail

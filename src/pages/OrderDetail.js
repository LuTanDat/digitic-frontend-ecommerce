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

      <Container class1='order-detail-wrapper home-wrapper-2 py-4'>
        <div className='row'>
          <div className='col-12'>
            <h3 className="mb-3 text-center fs-4">Chi Tiết Đơn Hàng</h3>
          </div>
          <div className='col-12 mb-3 mt-2 text-center'>
            <StepOrderComponent items={itemsOrderStatus} current={orderStatus} />
          </div>
          <div className="col-12 d-flex mb-4 justify-content-around align-items-center info-order-detail-mobile">
            <div style={{ border: "1px solid #857575cc", borderRadius: "10px", padding: "15px", backgroundColor: "white", marginTop: "16px" }}>
              <h5>Địa chỉ nhận hàng</h5>
              <p>{`Người nhận: ${aOrderState?.shippingInfo?.lastName} ${aOrderState?.shippingInfo?.firstName}`}</p>
              <p>{`SĐT: ${aOrderState?.shippingInfo?.mobile}`}</p>
              <p className='mb-0'>{`Địa chỉ: ${aOrderState?.shippingInfo?.address}`}</p>
            </div>
            <div style={{ border: "1px solid #857575cc", borderRadius: "10px", padding: "15px", backgroundColor: "white", marginTop: "16px" }}>
              <h5>Thông tin đơn hàng</h5>
              <p>{`Mã đơn hàng: ${aOrderState?._id}`}</p>
              <p>{`Ngày đặt hàng: ${new Date(aOrderState?.createdAt).toLocaleString()}`}</p>
              <p>{`Phương thức thanh toán: ${aOrderState?.paymentMethod}`}</p>
              <p className='mb-0'>{`Thời gian thanh toán: ${aOrderState?.paidAt ? new Date(aOrderState?.paidAt).toLocaleString() : "Chưa Thanh toán"}`}</p>
            </div>
          </div>

          <div className='col-12'>
            <div className='row' style={{ border: "1px solid #857575cc", borderRadius: "10px", padding: "15px", backgroundColor: "#e1d3d3" }}>
              <div className='col-12'>
                <div className='row text-center' style={{ borderBottom: "1px solid rgba(133, 117, 117, 0.8)" }}>
                  <div className='col-md-6 d-none d-md-block p-2'>
                    <h6 className=' mb-0'>Sản phẩm</h6>
                  </div>
                  <div className='col-md-2 d-none d-md-block p-2'>
                    <h6 className=' mb-0'>Số lượng</h6>
                  </div>
                  <div className='col-md-2 d-none d-md-block p-2'>
                    <h6 className=' mb-0'>Giá</h6>
                  </div>
                  <div className='col-md-2 d-none d-md-block p-2'>
                    <h6 className=' mb-0'>Tổng tiền</h6>
                  </div>
                </div>
              </div>
              {
                aOrderState?.orderItems?.map((i, index) => {
                  return (
                    <div className='col-12' key={index}>
                      <div className='row p-3 d-flex align-items-center text-center order-wrapper-mobile'
                        style={{ borderBottom: "1px solid rgb(203 180 180)" }}
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
                            <p className=' order-name-product-mobile mb-0'>{i?.product?.title}</p>
                            <div className='d-block d-md-none'>
                              <p className=' order-quantity-product-mobile mb-0'>x{i?.quantity}</p>
                              <p className=' order-price-product-mobile mb-0'>
                                {i?.priceAfterDiscount ? (i?.priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-2 d-none d-md-block'>
                          <p className=' mb-0'>{i?.quantity}</p>
                        </div>
                        <div className='col-md-2 d-none d-md-block'>
                          <p className=' mb-0'>
                            {i?.priceAfterDiscount ? (i?.priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                          </p>
                        </div>
                        <div className='col-md-2 order-totalprice-order'>
                          <p className='d-block d-md-none mb-0'>Thành tiền: </p>
                          <p className=' mb-0'>
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

          <div className='col-12 my-3 text-end'>
            <div className='d-flex justify-content-end gap-3'>
              <p>Tổng tiền hàng:</p>
              <p style={{ minWidth: 70 }}>{aOrderState?.itemsPrice ? (aOrderState?.itemsPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}</p>
            </div>
            <div className='d-flex justify-content-end gap-3'>
              <p>Phí vận chuyển:</p>
              <p style={{ minWidth: 70 }}>{aOrderState?.shippingPrice ? (aOrderState?.shippingPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}</p>
            </div>
            <div className='d-flex justify-content-end gap-3'>
              <b>Thành tiền:</b>
              <b style={{ minWidth: 70 }}>{aOrderState?.totalPrice ? (aOrderState?.totalPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}</b>
            </div>
          </div>
          <div className='col-12 text-center'>Cảm ơn quý khách đã tin tưởng và ủng hộ. Xin cảm ơn!</div>
        </div>
      </Container>
    </>
  )
}

export default OrderDetail

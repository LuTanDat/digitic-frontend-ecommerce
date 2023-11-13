/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';

import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import wishlist from '../images/wishlist.svg';
import watch from '../images/watch.jpg';
import watch2 from '../images/watch-1.avif';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';
import { getAllCoupons } from '../features/coupon/couponSlice';

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const { grid, data } = props;
  // console.log(Array.isArray(data));

  let location = useLocation();
  const couponState = useSelector((state) => state.coupon?.coupons);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [])

  const addToWishList = (id) => {
    dispatch(addToWishlist(id));
  }

  return (
    <>
      {data && data?.map((item, index) => {
        let priceAfterDiscount = item?.price;
        let discountPercent = 0;
        let isShowPriceDiscount = false;
        for (let j = 0; j < couponState.length; j++) {
          if (item._id === couponState[j].product?._id) {// co ma giam gia ko
            const currentDate = new Date();
            const startDate = new Date(couponState[j].start);
            const endDate = new Date(couponState[j].expiry);
            if (currentDate >= startDate && currentDate <= endDate) {// ma con han su dung ko
              discountPercent = couponState[j].discount;
              priceAfterDiscount = priceAfterDiscount * (100 - couponState[j].discount) / 100;
              isShowPriceDiscount = true;
            }
            break;
          }
        }
        return (
          <div
            key={index}
            className={`
            ${location.pathname === "/product" ?
                `gr-${grid}` :
                "col-xl-2-4 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-3 home-product-card"
              }`
            }
            disabled={item?.quantity === 0}
          >
            <div className='product-card position-relative'></div>
            <div className='wishlist-icon position-absolute'>
              <button className='border-0 bg-transparent'
                onClick={(e) => { addToWishList(item?._id) }}
              >
                {
                  location.pathname === "/wishlist" ? <button type='button' className='btn-close'></button> : <img src={wish} alt='wishlist' />
                }
              </button>
            </div>
            <Link to={item?.quantity !== 0 && '/product/' + item?._id} className={`w-100`}
            >
              <div className={`${grid === 12 ? "d-flex gap-3" : ""}`}>
                <div className={`product-image ${grid === 12 ? "w-25" : ""}`}>
                  <img
                    src={item?.images[0]?.url ? item?.images[0]?.url : watch}
                    className='img-fluid mx-auto'
                    alt='product image'
                    width={160}
                    style={{ width: "100%", height: "100%" }}
                  />
                  <img src={item?.images[0]?.url ? item?.images[1]?.url : watch}
                    className='img-fluid mx-auto'
                    alt='product image'
                    width={160}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className={`product-details ${grid === 12 ? "w-75" : ""}`}>
                  <h6 className='brand mt-2'>{item?.brand}</h6>
                  <h5 className='title mb-1'> {item?.title}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={Number(item?.totalrating) || 5}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p
                    style={{ wordWrap: 'break-word' }}
                    className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  >
                  </p>
                  <div className="d-flex gap-1 price-on-mobile-home">
                    <p className='price mb-0' style={{ color: isShowPriceDiscount ? "gray" : "red", fontSize: isShowPriceDiscount ? "14px" : "" }}>
                      {
                        isShowPriceDiscount ? <del>{(item?.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</del> :
                          (item?.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                      }
                    </p>
                    {
                      isShowPriceDiscount && (
                        <div className='d-flex gap-1'>
                          <p className='price mb-0' style={{ color: "red" }}>
                            {priceAfterDiscount ? (priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                          </p>
                          <h6 style={{ color: "#434141" }}>{`(-${discountPercent}%)`}</h6>
                        </div>
                      )
                    }
                  </div>
                </div>
                {/* <div className='action-bar position-absolute'>
                    <div className='d-flex flex-column gap-15'>
                      <button className='border-0 bg-transparent'>
                    <img src={prodcompare} alt='compare' />
                  </button>
                  <Link to={'/product/' + item?._id} className='border-0 bg-transparent'>
                    <img src={view} alt='view' />
                  </Link>
                      <button className='border-0 bg-transparent'>
                    <img src={addcart} alt='addcart' />
                  </button>
                    </div>
                  </div> */}
              </div>
            </Link>
          </div>
          </div >
        )
      })}

    </>
  )
}

export default ProductCard
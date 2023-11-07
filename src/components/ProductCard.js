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
        let isShowPriceDiscount = false;
        for (let j = 0; j < couponState.length; j++) {
          if (item._id === couponState[j].product?._id) {// co ma giam gia ko
            const currentDate = new Date();
            const startDate = new Date(couponState[j].start);
            const endDate = new Date(couponState[j].expiry);
            if (currentDate >= startDate && currentDate <= endDate) {// ma con han su dung ko
              priceAfterDiscount = priceAfterDiscount * (100 - couponState[j].discount) / 100;
              isShowPriceDiscount = true;
            }
            break;
          }
        }
        return (
          <div
            key={index}
            className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}
            disabled={item?.quantity === 0}
          >
            <div
              className='product-card position-relative'
            // style={{ height: "435px" }}
            >
              <div className='wishlist-icon position-absolute'>
                <button className='border-0 bg-transparent'
                  onClick={(e) => { addToWishList(item?._id) }}
                >
                  <img src={wish} alt='wishlist' />
                </button>
              </div>
              <Link to={item?.quantity !== 0 && '/product/' + item?._id}>
                <div className='product-image'>
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
                <div className='product-details'>
                  <h6 className='brand'>{item?.brand}</h6>
                  <h5 className='title'> {item?.title}</h5>
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
                  <div className="d-flex gap-2">
                    <p className='price' style={{ color: isShowPriceDiscount ? "gray" : "red" }}>
                      {
                        isShowPriceDiscount ? <del>{(item?.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</del> :
                          (item?.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                      }
                    </p>
                    {
                      isShowPriceDiscount && (
                        <p className='price' style={{ color: "red" }}>
                          {priceAfterDiscount ? (priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                        </p>
                      )
                    }
                  </div>
                </div>
                <div className='action-bar position-absolute'>
                  <div className='d-flex flex-column gap-15'>
                    {/* <button className='border-0 bg-transparent'>
                    <img src={prodcompare} alt='compare' />
                  </button>
                  <Link to={'/product/' + item?._id} className='border-0 bg-transparent'>
                    <img src={view} alt='view' />
                  </Link> */}
                    {/* <button className='border-0 bg-transparent'>
                    <img src={addcart} alt='addcart' />
                  </button> */}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )
      })}

    </>
  )
}

export default ProductCard
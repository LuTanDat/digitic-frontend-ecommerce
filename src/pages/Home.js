/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import { addToWishlist, getAllProducts } from '../features/products/productSlice';
// import BlogCard from "../components/BlogCard";
// import ProductCard from "../components/ProductCard";
// import SpecialProduct from "../components/SpecialProduct";
// import { services } from "../utils/Data";
// import moment from 'moment';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from 'antd';

import slider1 from '../images/slider1.webp';
import slider2 from '../images/slider2.webp';
import slider3 from '../images/slider3.webp';
import slider4 from '../images/slider4.webp';

import maylockhongkhi from '../images/may_loc_khong_khi_logo.webp';
import quat from '../images/Quat_logo.webp';
import denthongminh from '../images/den_thong_minh_logo.webp';
import maychieu from '../images/May_chieu_logo.webp';
import dogiadung from '../images/do_gia_dung_logo.webp';
import tvbox from '../images/TVBox_logo.webp';



// special product
import wish from '../images/wish.svg';
import wishlist from '../images/wishlist.svg';
import watch from '../images/watch.jpg';
import watch2 from '../images/watch-1.avif';
import ReactStars from "react-rating-stars-component";
import prodcompare from '../images/prodcompare.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
// special product end


const Home = () => {
  const arrImagesSlider = [slider1, slider2, slider3, slider4];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500
  };

  const blogState = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector((state) => state?.product?.products);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    getBlogs();
    getProducts();
  }, [])
  const getBlogs = () => {
    dispatch(getAllBlogs());
  }
  const getProducts = () => {
    dispatch(getAllProducts());
  }

  const addToWishList = (id) => {
    dispatch(addToWishlist(id));
  }

  return (
    <>
      <Meta title='Ecommerce App' />

      <Container class1="home-wrapper-1 py-3">
        <div className="row">
          <div className="col-12">
            <Slider {...settings}>
              {
                arrImagesSlider.map((image, index) => {
                  return (
                    <div key={index}>
                      <Image src={image} alt="slider" width="100%" preview={false} height="299px" />
                    </div>
                  )
                })
              }
            </Slider>
          </div>
          {/* <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>
                  From $999.00 or $41.62/mo. <br />
                  for 24 mo. Footnote*
                </p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>BEST SALE</h4>
                  <h5>Laptops Max</h5>
                  <p>
                    From $1699.00 or  <br /> $64.62/mo.
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>New arrival</h4>
                  <h5>Buy iPad air</h5>
                  <p>
                    From $599 or <br /> $49.91/mo. for 12 mo. *
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>15% off</h4>
                  <h5>Smartwatch 7</h5>
                  <p>
                    Shop the latest band  <br /> styles and colors.
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Free engraving</h4>
                  <h5> AirPods max</h5>
                  <p>
                    High-fidelity playback & <br /> ultra-low distortion
                  </p>
                </div>
              </div>

            </div>
          </div> */}
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Danh mục sản phẩm</h3>
          </div>
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div
                onClick={() => navigate("/product")}
                style={{ cursor: "pointer" }}
              >
                <img src={maylockhongkhi} alt="camera" className="d-block" style={{ height: "75px", margin: "0 auto 8px" }} />
                <p style={{ fontWeight: "600", textAlign: "center" }}>Máy lọc không khí</p>
              </div>
              <div
                onClick={() => navigate("/product")}
                style={{ cursor: "pointer" }}
              >
                <img src={quat} alt="camera" className="d-block" style={{ height: "75px", margin: "0 auto 8px" }} />
                <p style={{ fontWeight: "600", textAlign: "center" }}>Quạt</p>
              </div>
              <div
                onClick={() => navigate("/product")}
                style={{ cursor: "pointer" }}
              >
                <img src={denthongminh} alt="camera" className="d-block" style={{ height: "75px", margin: "0 auto 8px" }} />
                <p style={{ fontWeight: "600", textAlign: "center" }}>Đèn thông minh</p>
              </div>
              <div
                onClick={() => navigate("/product")}
                style={{ cursor: "pointer" }}
              >
                <img src={maychieu} alt="camera" className="d-block" style={{ height: "75px", margin: "0 auto 8px" }} />
                <p style={{ fontWeight: "600", textAlign: "center" }}>Máy chiếu</p>
              </div>
              <div
                onClick={() => navigate("/product")}
                style={{ cursor: "pointer" }}
              >
                <img src={dogiadung} alt="camera" className="d-block" style={{ height: "75px", margin: "0 auto 8px" }} />
                <p style={{ fontWeight: "600", textAlign: "center" }}>Đồ gia dụng</p>
              </div>
              <div
                onClick={() => navigate("/product")}
                style={{ cursor: "pointer" }}
              >
                <img src={tvbox} alt="camera" className="d-block" style={{ height: "75px", margin: "0 auto 8px" }} />
                <p style={{ fontWeight: "600", textAlign: "center" }}>TV Box</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="marquee-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Thương hiệu nổi bật</h3>
          </div>
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm nổi bật</h3>
          </div>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div
                    key={index}
                    className={"col-3"}
                  >
                    <Link to={'/product/' + item?._id}
                      className='product-card position-relative'
                    >
                      <div className='wishlist-icon position-absolute'>
                        <button className='border-0 bg-transparent'
                          onClick={(e) => { addToWishList(item?._id) }}
                        >
                          <img src={wish} alt='wishlist' />
                        </button>
                      </div>
                      <div className='product-image'>
                        <img
                          src={item?.images[0]?.url ? item?.images[0]?.url : watch}
                          className='img-fluid mx-auto'
                          alt='product image'
                          width={160}
                        />
                        <img src={watch2}
                          className='img-fluid mx-auto'
                          alt='product image'
                          width={160}
                        />
                      </div>
                      <div className='product-details'>
                        <h6 className='brand'>{item?.brand}</h6>
                        <h5 className='title'> {item?.title}</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={parseInt(item?.totalrating)}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className='price'>${item?.price}</p>
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
                )
              }
            })
          }
        </div>
      </Container>


      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services.map((service, index) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={index}>
                    <img src={service.image} alt="services" />
                    <div>
                      <h6>{service.title}</h6>
                      <p className="mb-0">{service.tagline}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container> */}
      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-01.webp" className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5>big screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-02.webp" className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-03.webp" className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-04.webp" className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">From $699 or $116.58/mo. for 12 mo.*</p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      {/* <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm đặc biệt</h3>
          </div>
        </div>
        <div className="row">
          {
            productState && productState?.map((item, index) => {
              if (item.tags === "special") {
                return <SpecialProduct
                  key={index}
                  id={item?._id}
                  brand={item?.brand}
                  title={item?.title}
                  totalrating={parseInt(item?.totalrating)}
                  price={item?.price}
                  sold={item?.sold}
                  quantity={item?.quantity}
                />;
              }
            })
          }
        </div>
      </Container> */}
      {/* <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến</h3>
          </div>
        </div>
        <div className="row">
          {
            productState && productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div
                    key={index}
                    className={"col-3"}
                  >
                    <div
                      className='product-card position-relative'
                    >
                      <div className='wishlist-icon position-absolute'>
                        <button className='border-0 bg-transparent'
                          onClick={(e) => { addToWishList(item?._id) }}
                        >
                          <img src={wish} alt='wishlist' />
                        </button>
                      </div>
                      <div className='product-image'>
                        <img
                          src={item?.images[0]?.url ? item?.images[0]?.url : watch}
                          className='img-fluid mx-auto'
                          alt='product image'
                          width={160}
                        />
                        <img src={watch2}
                          className='img-fluid mx-auto'
                          alt='product image'
                          width={160}
                        />
                      </div>
                      <div className='product-details'>
                        <h6 className='brand'>{item?.brand}</h6>
                        <h5 className='title'> {item?.title}</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={parseInt(item?.totalrating)}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className='price'>${item?.price}</p>
                      </div>
                      <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column gap-15'>
                          <button className='border-0 bg-transparent'>
                            <img src={prodcompare} alt='compare' />
                          </button>
                          <button className='border-0 bg-transparent'>
                            <img onClick={() => navigate("/product/" + item?._id)} src={view} alt='view' />
                          </button>
                          <button className='border-0 bg-transparent'>
                            <img src={addcart} alt='addcart' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </Container> */}
    </>
  );
};

export default Home;

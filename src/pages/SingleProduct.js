/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import ProductCard from '../components/ProductCard';
import ReactImageZoom from 'react-image-zoom';
import Color from './../components/Color';
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from 'react-icons/ai';
import Container from './../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProdToCart } from "../features/user/userSlice";
import { getUserCart } from '../features/user/userSlice';
import { getACoupon } from '../features/coupon/couponSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from 'antd';


const SingleProduct = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sliderKey, setSliderKey] = useState(0); // Thêm sliderKey
  // Xử lý sự kiện khi ảnh ở "other-prouduct-image" được click
  const handleOtherProductImageClick = (index) => {
    setSelectedImageIndex(index); // Cập nhật vị trí ảnh được chọn
    setSliderKey(sliderKey + 1); // Cập nhật sliderKey để cập nhật lại Slider
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    initialSlide: selectedImageIndex, // Sử dụng vị trí được lưu để đặt ảnh ban đầu
  };


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

  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false); // prouduct da add vao cart chua ?

  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth?.user);
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.products);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const couponState = useSelector((state) => state?.coupon);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart(config2));
    dispatch(getAllProducts());
    dispatch(getACoupon(getProductId));
  }, [])
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [])

  const props = {
    width: 400,
    height: 400,
    zoomWidth: 400,
    img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-hero-230912_Full-Bleed-Image.jpg.xlarge.jpg"
  };

  const [orderedProduct, setorderedProduct] = useState(true);

  const copyToClipboard = (text) => {
    console.log('text', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const [popularProduct, setPopularProduct] = useState([])
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === 'popular') {
        data.push(element)
      }
      setPopularProduct(data);
    }
  }, [productsState]);

  const [star, setStar] = useState(5);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Vui lòng chọn số sao");
      return false;
    } else if (comment === null) {
      toast.error("Vui lòng viết đánh giá về sản phẩm này.")
      return false;
    } else {
      dispatch(addRating({
        star: star,
        comment: comment,
        prodId: getProductId,
      }))
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 200)
    }
    return false;
  }

  // handle price product have discount ???
  let priceAfterDiscount = productState?.price;
  let discountPercent = 0;
  let isShowPriceDiscount = false;
  if (couponState.couponDiscount) {
    const currentDate = new Date();
    const startDate = new Date(couponState.couponStart);
    const endDate = new Date(couponState.couponExpiry);
    if (currentDate >= startDate && currentDate <= endDate) {
      discountPercent = couponState.couponDiscount;
      priceAfterDiscount = productState?.price * (100 - couponState.couponDiscount) / 100;
      isShowPriceDiscount = true;
    }
  }
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(productState?.price);

  const uploadCart = () => {
    // if (color === null) {
    //   toast.error("Please Choose Color");
    //   return false;

    if (!authState?._id) {
      navigate('/login', { state: location.pathname })// ben login lay trong location.state, de biet duong quay ve day thay vi chuyen den trang chu
    }
    else {
      dispatch(addProdToCart({
        productId: productState?._id,
        color: color || productState?.color,
        quantity,
        price: productState?.price,
        priceAfterDiscount: priceAfterDiscount,
      }))
      navigate('/cart');
    }
  }

  const [starRating, setStarRating] = useState(5); // Sử dụng state để theo dõi giá trị
  const [starKey, setStarKey] = useState(0); // Thêm starKey
  useEffect(() => {
    // Cập nhật giá trị starRating mỗi khi productState?.totalrating thay đổi
    if (productState?.totalrating && productState.totalrating !== "0") {
      setStarRating(Number(productState?.totalrating));
      setStarKey(starKey + 1); // Cập nhật sliderKey để cập nhật lại Slider
    }
  }, [productState?.totalrating]);

  return (
    <>
      <Meta title='Product Name' />
      <BreadCrumb title={productState?.title} />
      <Container class1='main-product-wrapper home-wrapper-2 py-4'>
        <div className='row'>
          <div className='col-7'>
            <div className='main-product-image'>
              <div>
                {/* <ReactImageZoom {...props} /> */}
                <Slider // mac dinh khong reder lai
                  key={sliderKey} // Sử dụng key để đảm bảo Slider được cập nhật khi sliderKey thay đổi
                  {...settings}>
                  {
                    productState?.images.map((item, index) => {
                      return (
                        <div key={index}>
                          <Image src={item?.url} alt="slider" width="100%" preview={true} height="100%" />
                        </div>
                      )
                    })
                  }
                </Slider>
              </div>
            </div>
            <div className='other-prouduct-image d-flex flex-wrap gap-3 pt-0'>
              {
                productState?.images.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ cursor: "pointer", width: "127px", height: "127px" }}
                      onClick={() => handleOtherProductImageClick(index)} // Gọi hàm khi ảnh được click
                    >
                      <img
                        src={item?.url}
                        className='img-fluid'
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        alt='' />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='col-5'>
            <div className='main-product-detail'>
              <div className='border-bottom'>
                <h3 className='title'>{productState?.title}</h3>
              </div>
              <div className='border-bottom py-2'>
                <div className='d-flex gap-15'>
                  <h4 className='price' style={{ color: isShowPriceDiscount ? "gray" : "red" }}>
                    {
                      isShowPriceDiscount ? <del>{formattedPrice}</del> : formattedPrice
                    }
                  </h4>
                  {
                    isShowPriceDiscount && (
                      <div className='d-flex gap-1'>
                        <h4 className='price' style={{ color: "red" }}>
                          {priceAfterDiscount ? (priceAfterDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 đ"}
                        </h4>
                        <h6 style={{ color: "#434141" }}>{`(-${discountPercent}%)`}</h6>
                      </div>
                    )
                  }
                </div>
                <div className='d-flex justify-content-between align-items-center gap-10'>
                  <div className='d-flex align-items-center gap-10'>
                    <ReactStars // mac dinh khong reder lai
                      key={starKey} // Sử dụng key để đảm bảo ReactStarts được cập nhật khi starKey thay đổi
                      count={5}
                      value={starRating}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className='mb-0'>{`${productState?.ratings?.length} đánh giá`}</p>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a href='#review' className='review-btn text-decoration-underline'>Viết đánh giá</a>
                    </div>)
                  }
                </div>
                <div>
                  <p className='review-btn m-2'>{`${productState?.numViews} lượt xem`}</p>
                </div>
              </div>
              <div className='pt-2'>
                {/* <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                  <h3 className='product-heading'>Size :</h3>
                  <div className='d-flex flex-wrap gap-15'>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>S</span>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>M</span>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>L</span>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>XL</span>
                  </div>
                </div> */}
                <div className='d-flex gap-30 flex-row mt-2 mb-3'>
                  {
                    alreadyAdded === false && <>
                      <h3 className='product-heading'>Màu :</h3>
                      <Color setColor={setColor} colorData={productState?.color} />
                    </>
                  }
                </div>
                <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3'>
                  {
                    alreadyAdded === false && <>
                      <h3 className='product-heading'>Số lượng :</h3>
                      <div>
                        <input
                          type='number'
                          name=''
                          min={1}
                          max={100}
                          className='form-control'
                          style={{ width: '70px' }}
                          id=''
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  }
                  <div className={'d-flex justify-content-center gap-30 ms-5' + alreadyAdded ? "ms-0" : "ms-5"}>
                    <button
                      className='button border-0'
                      type='button'
                      onClick={() => { alreadyAdded ? navigate('/cart') : uploadCart() }}
                    >
                      {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ hàng"}
                    </button>
                  </div>
                </div>
                <div className='d-flex gap-15 align-items-center'>
                  {/* <div>
                    <a href=''><TbGitCompare className='fs-5 me-2' /> Add to Compare</a>
                  </div> */}
                  {/* <div>
                    <a href=''><AiOutlineHeart className='fs-5 me-2' /> Thêm vào danh sách mong muốn</a>
                  </div> */}
                </div>
                <div className='d-flex gap-10 flex-column my-3'>
                  <h3 className='product-heading'>Vận chuyển và Trả hàng :</h3>
                  <p className='product-data'>
                    Chúng tôi vận chuyển tất cả các đơn đặt hàng nội địa trong vòng <b>3-7 ngày làm việc!</b>
                  </p>
                </div>
                <div className='d-flex gap-10 align-items-center mt-2'>
                  <h3 className='product-heading'>Chia sẻ </h3>
                  <a
                    href='javascript:void(0);'
                    onClick={() => {
                      copyToClipboard(
                        window.location.href
                      );
                    }}
                  >
                    Chọn vào đây để chia sẻ sản phẩm này cho bạn bè và người thân của bạn !
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='description-wrapper home-wrapper-2 py-4'>
        <div className='row'>
          <div className='col-8'>
            <h4 style={{ fontWeight: "600" }}>Mô tả</h4>
            <div className='bg-white p-3'>
              <p
                style={{ wordWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              >
              </p>
            </div>
          </div>
          <div className='col-4'>
            <div className='p-3 pt-0'>
              <h4 className='text-center' style={{ fontWeight: "600" }}>Thông số kỹ thuật</h4>
              <table className="table table-striped mb-0">
                <tbody>
                  <tr>
                    <td>Thương hiệu</td>
                    <td>{productState?.brand}</td>
                  </tr>
                  <tr>
                    <td>Kích thước</td>
                    <td>{productState?.size}</td>
                  </tr>
                  <tr>
                    <td>Trọng lượng</td>
                    <td>{productState?.weight}</td>
                  </tr>
                  <tr>
                    <td>Công suất</td>
                    <td>{productState?.power}</td>
                  </tr>
                  <tr>
                    <td>Tuổi thọ</td>
                    <td>{productState?.lifespan}</td>
                  </tr>
                  <tr>
                    <td>Bảo hành</td>
                    <td>{productState?.warranty}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='reviews-product-wrapper home-wrapper-2 py-3'>
        <div className='row'>
          <div className='col-12'>
            <h3 id='review'>Đánh giá</h3>
            <div className='review-inner-wrapper'>
              <div className='review-head d-flex justify-content-between align-items-end'>
                <div>
                  <h4 className='mb-2'>Tổng đánh giá</h4>
                  <div className='d-flex align-items-center gap-10'>
                    <ReactStars // mac dinh khong reder lai
                      key={starKey} // Sử dụng key để đảm bảo ReactStarts được cập nhật khi starKey thay đổi
                      count={5}
                      size={24}
                      value={parseInt(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className='mb-0'>{`${productState?.ratings?.length} đánh giá`}</p>
                  </div>
                </div>
              </div>
              <div className='review-form py-4'>
                <h4>Đánh giá</h4>
                <ReactStars
                  count={5}
                  size={24}
                  value={5}
                  edit={true}
                  activeColor="#ffd700"
                  onChange={(e) => { setStar(e) }}
                />
                <div>
                  <textarea
                    name=''
                    id=''
                    className='w-100 form-control'
                    cols="30"
                    rows="4"
                    placeholder='Nội dung đánh giá'
                    onChange={(e) => { setComment(e.target.value) }}
                  >
                  </textarea>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                  <button onClick={addRatingToProduct} className='button border-0' type='button'>Gửi đánh giá</button>
                </div>
              </div>
              <div className='reviews mt-4'>
                {
                  productState && productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className='review'>
                        <div className='d-flex gap-10 align-items-center'>
                          <h6 className='mb-0'>{authState?.firstName}</h6>
                          <ReactStars // mac dinh khong reder lai
                            key={starKey} // Sử dụng key để đảm bảo ReactStarts được cập nhật khi starKey thay đổi
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>

                        <p className='mt-3 mb-0'>
                          {item?.comment}
                        </p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>

    </>
  )
}

export default SingleProduct

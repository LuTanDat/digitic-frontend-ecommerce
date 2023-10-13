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

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false); // prouduct da add vao cart chua ?

  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.products);

  const cartState = useSelector((state) => state?.auth?.cartProducts);
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts())
  }, [])
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [])

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(addProdToCart({
        productId: productState?._id,
        color,
        quantity,
        price: productState?.price
      }))
      navigate('/cart');
    }
  }

  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
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

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About the Product.")
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



  return (
    <>
      <Meta title='Product Name' />
      <BreadCrumb title={productState?.title} />
      <Container class1='main-product-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-6'>
            <div className='main-product-image'>
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className='other-prouduct-image d-flex flex-wrap gap-15'>
              {
                productState?.images.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={item?.url}
                        className='img-fluid'
                        alt='' />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='col-6'>
            <div className='main-product-detail'>
              <div className='border-bottom'>
                <h3 className='title'>{productState?.title}</h3>
              </div>
              <div className='border-bottom py-3'>
                <p className='price'>$ {productState?.price}</p>
                <div className='d-flex align-items-center gap-10'>
                  <ReactStars
                    count={5}
                    size={24}
                    value={parseInt(productState?.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className='mb-0 t-review'>( 2 reviews )</p>
                </div>
                <a className='review-btn' href='#review'>
                  Write a Review
                </a>
              </div>
              <div className='py-3'>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h3 className='product-heading'>Type :</h3>
                  <p className='product-data'>Watch</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h3 className='product-heading'>Brand :</h3>
                  <p className='product-data'>{productState?.brand}</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h3 className='product-heading'>Category :</h3>
                  <p className='product-data'>{productState?.category}</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h3 className='product-heading'>Tags :</h3>
                  <p className='product-data'>{productState?.tags}</p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h3 className='product-heading'>Availability :</h3>
                  <p className='product-data'>In Stock</p>
                </div>

                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                  <h3 className='product-heading'>Size :</h3>
                  <div className='d-flex flex-wrap gap-15'>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>S</span>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>M</span>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>L</span>
                    <span className='badge border border-1 bg-white text-dark text-secondary'>XL</span>
                  </div>
                </div>
                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                  {
                    alreadyAdded === false && <>
                      <h3 className='product-heading'>Color :</h3>
                      <Color setColor={setColor} colorData={productState?.color} />
                    </>
                  }
                </div>
                <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3'>
                  {
                    alreadyAdded === false && <>
                      <h3 className='product-heading'>Quantity :</h3>
                      <div>
                        <input
                          type='number'
                          name=''
                          min={1}
                          max={10}
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
                      {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                    </button>
                    {/* <button to='/signup' className='button signup border-0'>Buy It Now</button> */}
                  </div>
                </div>
                <div className='d-flex gap-15 align-items-center'>
                  <div>
                    <a href=''><TbGitCompare className='fs-5 me-2' /> Add to Compare</a>
                  </div>
                  <div>
                    <a href=''><AiOutlineHeart className='fs-5 me-2' /> Add to Wishlist</a>
                  </div>
                </div>

                <div className='d-flex gap-10 flex-column my-3'>
                  <h3 className='product-heading'>Shipping & Returns :</h3>
                  <p className='product-data'>Free shipping and returns available on all orders!
                    We ship all US domestic orders within <b>5-10 business days!</b>
                  </p>
                </div>
                <div className='d-flex gap-10 align-items-center my-2'>
                  <h3 className='product-heading'>Product link :</h3>
                  <a
                    href='javascript:void(0);'
                    onClick={() => {
                      copyToClipboard(
                        window.location.href
                      );
                    }}
                  >
                    Copy product link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='description-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <h4>Description</h4>
            <div className='bg-white p-3'>
              <p
                style={{ wordWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              >
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='reviews-product-wrapper home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 id='review'>Reviews</h3>
            <div className='review-inner-wrapper'>
              <div className='review-head d-flex justify-content-between align-items-end'>
                <div>
                  <h4 className='mb-2'>Customer Reviews</h4>
                  <div className='d-flex align-items-center gap-10'>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className='mb-0'>Based on 2 reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a href='/' className='text-dark text-decoration-underline'>Write a Review</a>
                  </div>)
                }
              </div>
              <div className='review-form py-4'>
                <h4>Write a Review</h4>
                <ReactStars
                  count={5}
                  size={24}
                  value={4}
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
                    placeholder='Comments'
                    onChange={(e) => { setComment(e.target.value) }}
                  >
                  </textarea>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                  <button onClick={addRatingToProduct} className='button border-0' type='button'>Submit  Review</button>
                </div>
              </div>
              <div className='reviews mt-4'>
                {
                  productState && productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className='review'>
                        <div className='d-flex gap-10 align-items-center'>
                          <h6 className='mb-0'>Lu Tan Dat</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>

                        <p className='mt-3'>
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
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
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

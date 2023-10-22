import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/products/productSlice';
import { getUserCart } from '../features/user/userSlice';

const Header = () => {
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
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products);
  const [productOpt, setProductOpt] = useState([]); // de search trong mang nay
  const [paginate, setPaginate] = useState(true);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, [])
  // useEffect(() => {
  //   let sum = 0;
  //   for (let index = 0; index < cartState?.length; index++) {
  //     sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price))
  //     setTotal(sum);
  //   }
  // }, [cartState])

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({
        id: index,
        prod: element?._id,
        name: element?.title,
      })
    }
    setProductOpt(data);
  }, [productState])

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <>
      <header className='header-upper p-2'>
        <div className=''>
          <div className='row align-items-center w-100'>
            <div className='col-2'>
              <h2 className='text-center mb-0'>
                <Link to='/'>Tech Smart</Link>
              </h2>
            </div>
            <div className='col-5'>
              <div className='menu-links'>
                <div className='d-flex align-items-center gap-15'>
                  <NavLink to="/">Trang chủ</NavLink>
                  <NavLink to="/product">Sản phẩm</NavLink>
                  {/* <NavLink to="/blogs">Bài viết</NavLink> */}
                  <NavLink to="/contact">Liên hệ</NavLink>
                  <NavLink to="/introduce">Giới thiệu</NavLink>
                  {
                    authState?.user === null ?
                      "" :
                      <NavLink to="/my-orders">Đơn hàng của tôi</NavLink>}
                  {
                    authState?.user === null ?
                      "" :
                      <button onClick={handleLogout} className='border border-0 bg-transparent text-white text-uppercase' type='button'>Đăng Xuất</button>
                  }
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between gap-30'>
                <div className="input-group">
                  <Typeahead
                    id="pagination-example"
                    onPaginate={() => console.log('Results paginated')}
                    onChange={(selected) => {
                      navigate(`/product/${selected[0]?.prod}`)
                      dispatch(getAProduct(selected[0]?.prod))
                    }}
                    options={productOpt}
                    paginate={paginate}
                    labelKey={"name"}
                    minLength={2}
                    placeholder="Search for Products here..."
                  />
                  <span className="input-group-text" id="basic-addon2">
                    <BsSearch className='fs-5' />
                  </span>
                </div>
                {/* <div>
                  <Link to='/compare-product' className='d-flex align-items-center gap-10 text-white'>
                    <img src='images/compare.svg' alt='compare' />
                    <p className='mb-0'>Compare <br /> Products</p>
                  </Link>
                </div> */}
                <div>
                  <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                    <img src='images/wishlist.svg' alt='wishlist' />
                    <p className='mb-0' >Yêu thích</p>
                  </Link>
                </div>
                <div>
                  <Link to={authState?.user === null ? '/login' : '/my-profile'} className='d-flex align-items-center gap-10 text-white'>
                    <img src='images/user.svg' alt='user' />
                    {
                      authState?.user === null ?
                        <p className='mb-0'>Đăng nhập</p> :
                        <div>
                          <p className='mb-0'>Xin chào</p>
                          <p className='mb-0'>{authState?.user?.firstName}</p>
                        </div>
                    }
                  </Link>
                </div>
                <div>
                  <Link to='/cart' className='d-flex align-items-center gap-10 text-white position-relative'>
                    <img src='images/cart.svg' alt='cart' />
                    <div className='d-flex flex-column gap-10 position-absolute top-0 start-100 translate-middle'>
                      <span className='badge rounded-circle bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src='images/menu.svg' alt='menu' />
                      <span className='me-5 d-inline-block'>Shop categories</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}
    </>
  )
}

export default Header

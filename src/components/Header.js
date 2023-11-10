import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/products/productSlice';
import { getUserCart } from '../features/user/userSlice';
import { FaBars } from 'react-icons/fa';

import logo from '../images/logo.png';
import wishlist from '../images/wishlist.svg';
import user from '../images/user.svg';
import cart from '../images/cart.svg';

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
      <header className='header-upper p-2 fixed-header'>
        <div className=''>
          <div className='row align-items-center justify-content-between w-100'>
            <div className='col-md-1 col-2 d-block d-xl-none ps-md-4 nav__bars-btn fs-2 text-white'>
              <FaBars />
            </div>
            <div className='col-2 d-block d-md-none nav__bars-btn fs-2 text-white'>
              <BsSearch />
            </div>
            <div className='col-xl-2 col-md-3 col-4 p-0 ps-md-3 pe-md-3 ps-xl-5 pe-xl-4'>
              <Link to='/' style={{ width: "100%" }}>
                <img src={logo} alt='logo' style={{ width: "100%", height: "48px", maxWidth: "180px" }} />
              </Link>
            </div>
            <div className='col-xl-5 d-none d-xl-block'>
              <div className='menu-links hide-on-mobile-tablet'>
                <div className='d-flex align-items-center gap-15'>
                  <NavLink to="/">Trang chủ</NavLink>
                  <NavLink to="/product">Sản phẩm</NavLink>
                  {/* <NavLink to="/blogs">Bài viết</NavLink> */}
                  <NavLink to="/contact">Liên hệ</NavLink>
                  <NavLink to="/introduce">Giới thiệu</NavLink>
                  {
                    authState?.user === null ?
                      "" :
                      <NavLink to="/my-orders">Đơn hàng</NavLink>}
                  {
                    authState?.user === null ?
                      "" :
                      <button onClick={handleLogout} className='border border-0 bg-transparent text-white text-uppercase' type='button'>Đăng Xuất</button>
                  }
                </div>
              </div>
            </div>
            <div className='col-xl-2 col-md-5 d-none d-md-block'>
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
                  placeholder="Nhập tên sản phẩm muốn tìm..."
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
            </div>
            <div className='col-xl-2 col-md-3 col-4'>
              <div className='header-upper-links d-flex align-items-center justify-content-center gap-3'>
                <div>
                  <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                    <img src={wishlist} alt='wishlist' />
                    <p className='mb-0 d-none d-md-block' >Yêu thích</p>
                  </Link>
                </div>
                <div>
                  <Link to='/cart' className='d-flex align-items-center gap-10 text-white position-relative'>
                    <img src={cart} alt='cart' />
                    <div className='d-flex flex-column gap-10 position-absolute top-0 start-100 translate-middle'>
                      <span className='badge rounded-circle bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-xl-1 d-none d-xl-block p-0'>
              <div className='hide-on-mobile-tablet'>
                <Link to={authState?.user === null ? '/login' : '/my-profile'} className='d-flex align-items-center gap-1 text-white'>
                  <img src={user} alt='user' />
                  {
                    authState?.user === null ?
                      <p className='mb-0'>Đăng nhập</p> :
                      <div>
                        <p className='mb-0' style={{ whiteSpace: "nowrap" }}>Xin chào</p>
                        <p className='mb-0'>{authState?.user?.firstName}</p>
                      </div>
                  }
                </Link>
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

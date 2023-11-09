import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import Container from './../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const addedWishlistState = useSelector((state) => state?.product?.addToWishlist);

  useEffect(() => {
    getWishlistFromDb();
  }, [addedWishlistState])

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  }

  return (
    <>
      <Meta title='Wishlist' />
      <BreadCrumb title='Yêu thích' />
      <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          {wishlistState && wishlistState.length === 0 && <div className='text-center fs-3'>Không có sản phẩm yêu thích</div>}
          <ProductCard data={wishlistState} />
        </div>
      </Container>
    </>
  )
}

export default Wishlist

import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta'; // thay doi tieu de
import ReactStars from "react-rating-stars-component";

const OurStore = () => {
  return (
    <div>
      <Meta title='Our Store' />
      <BreadCrumb title='Our Store' />
      <div className='store-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-3'>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Shop By Categories</h3>
                <div>
                  <ul className='ps-0'>
                    <li>Watch</li>
                    <li>TV</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Filter By</h3>
                <div>
                  <h5 className="sub-title">Availablity</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        In Stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Out of Stock (0)
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div class="form-floating">
                      <input type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="from"
                      />
                      <label for="floatingInput">From</label>
                    </div>
                    <div class="form-floating">
                      <input type="email"
                        class="form-control"
                        id="floatingInput1"
                        placeholder="to"
                      />
                      <label for="floatingInput1">To</label>
                    </div>
                  </div>
                  <h5 className="sub-title">Colors</h5>
                  <div>
                    <ul className='colors ps-0'>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        S (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-2"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                        M (2)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Product Tag</h3>
                <div>
                  <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Headphone
                    </span>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Laptop
                    </span>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Mobile
                    </span>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Wire
                    </span>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Random Products</h3>
                <div>
                  <div className='random-products d-flex mb-3'>
                    <div className='w-50'>
                      <img src='images/watch.jpg' className='img-fluid' alt='watch' />
                    </div>
                    <div className='w-50'>
                      <h5>Kids headphones bulk 10 pack multi colored for students</h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$100.00</b>
                    </div>
                  </div>
                  <div className='random-products d-flex'>
                    <div className='w-50'>
                      <img src='images/watch.jpg' className='img-fluid' alt='watch' />
                    </div>
                    <div className='w-50'>
                      <h5>Kids headphones bulk 10 pack multi colored for students</h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$100.00</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-9'></div>
      </div>
    </div>
  )
}

export default OurStore;

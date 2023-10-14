import axios from "axios";
import { base_url, config } from '../../utils/axiosconfig';

// console.log(JSON.parse(localStorage.getItem("customer")).token);
// console.log("token", localStorage.getItem("token"));

const getProducts = async (data) => {
  console.log(data);
  const response = await axios.get(`${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.tag ? `tag=${data?.tag}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}`);
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(`${base_url}product/wishlist`, { prodId }, config);
  if (response.data) {
    return response.data;
  }
}

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
}

export const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
  rateProduct,

}
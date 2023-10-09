import axios from "axios";
import { base_url, config } from '../../utils/axiosconfig';

// console.log(JSON.parse(localStorage.getItem("customer")).token);
// console.log("token", localStorage.getItem("token"));

const postQuery = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry`, contactData);
  if (response.data) {
    return response.data;
  }
};

export const contactService = {
  postQuery,

}
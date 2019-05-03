import { PRODUCT_PRODUCT_LIST_SET_PRODUCTS, PRODUCT_COSTOMERS_LIST } from "../../types";
import config from "../../../config.json";
import axios from "axios";

export const productProductListFetchProdcuts = (
  clubId,
  // token,
  pageNum,
  pageSize,
  callback
) => {
  return dispatch => {
    axios
      .get(
        `${
          config.domain
        }/club/${clubId}/products?pagesize=${pageSize}&pagenum=${pageNum}`
        // ,
        // {
        //   headers: {
        //     Authorization: "Bearer " + token
        //   }
        // }
      )
      .then(response => {
        dispatch({
          type: PRODUCT_PRODUCT_LIST_SET_PRODUCTS,
          payload: { products: response.data, total: response.headers.total }
        });
        if (typeof callback === "function") callback();
      })
      .catch(err => console.log(err));
  };
};
export const productCustomerListFetchCustomers = (
  token,
  clubId,
  productId,
  pageNum,
  pageSize,
  callback
) => {
  return dispatch => {
    axios
      .get(
        `${
        config.domain
        }/club/${clubId}/product/${productId}?pagenum=${pageNum}&pagesize=${pageSize}`, {
          headers: {
            Authorization: "Bearer " + token
          },
        }
      )

      .then(response => {- 

        dispatch({
          type: PRODUCT_COSTOMERS_LIST,
          payload: { productCostomers: response.data, total: response.headers.total }
        });
        if (typeof callback === "function") callback();
      })
      .catch(err => console.log(err));
  };
};
export const removeProduct = (clubId, productId, token) => {
  return dispatch => {
    return axios.delete(`${config.domain}/club/${clubId}/product/${productId}`, {
        headers: {
          Authorization: "Bearer " + token
        },
        data: { isDeleted: true }
      })
      .then(response => {
        return (response)
      })
      .catch(e => {
        return (e)
      });
  }
}
export const getProductInfo = (productId) => {
  return dispatch => {
    return axios.get(`${config.domain}/club/product/${productId}/info`)
      .then(response => {
        return (response)
      })
      .catch(e => {
        return (e)
      });
  }
}
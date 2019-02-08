import { PRODUCT_PRODUCT_LIST_SET_PRODUCTS } from "../../types";
import config from "../../../config.json";
import axios from "axios";

export const productProductListFetchProdcuts = (
  clubId,
  token,
  pageNum,
  pageSize,
  callback
) => {
  return dispatch => {
    axios
      .get(
        `${
          config.domain
        }/club/${clubId}/product?pagesize=${pageSize}&pagenum=${pageNum}`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
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

import {
  CUSTOMER_CUSTOMER_LIST_FETCH_CUSTOMERS,
  CUSTOMER_CUSTOMER_LIST_CHANGE_QUERY
} from "../../types";
import axios from "axios";
import config from "../../../config.json";

export const customerCustomerListFetchCustomers = (
  clubId,
  pageNum,
  pageSize,
  query,
  token,
  callback
) => {
  return dispatch => {
    axios
      .get(
        `${
          config.domain
        }/club/${clubId}/customer?pagenum=${pageNum}&pagesize=${pageSize}&filter=${query}`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

      .then(response => {
        dispatch({
          type: CUSTOMER_CUSTOMER_LIST_FETCH_CUSTOMERS,
          payload: { customers: response.data, total: response.headers.total }
        });

        if (typeof callback === "function") callback();
      })
      .catch(err => console.log(err));
  };
};

export const customerCustomerListChangeQuery = query => {
  return {
    type: CUSTOMER_CUSTOMER_LIST_CHANGE_QUERY,
    payload: query
  };
};

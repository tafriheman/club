import {
  CUSTOMER_CUSTOMER_LIST_FETCH_CUSTOMERS,
  CUSTOMER_CUSTOMER_LIST_CHANGE_QUERY,
  CUSTOMER_MESSAGES_LIST
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


export const GetCustomerMessageList = (userId,
  pageNum,
  pageSize,
  token) => {
  return dispatch => {
    return axios.get(`${config.domain}/user/${userId}/message?pagenum=${pageNum}&pagesize=${pageSize}`,
     {
          headers: {
            Authorization: "Bearer " + token
          }
        })
      .then(response => {
        dispatch({
          type: CUSTOMER_MESSAGES_LIST,
          payload: { userMessage: response.data, total: response.headers.total }
        });
        return (response)
      })
      .catch(e =>{
      });
  }
}
export const GetMessageDetail = (userId,
  messageId,
  token) => {
  return dispatch => {
    return axios.get(`${config.domain}/user/${userId}/message/${messageId}`,
     {
          headers: {
            Authorization: "Bearer " + token
          }
        })
      .then(response => {

        return (response)
      })
      .catch(e =>{
        return (e)
      });
  }
}
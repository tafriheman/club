import {
  CUSTOMER_CUSTOMER_LIST_FETCH_CUSTOMERS
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const customerCustomerListFetchCustomers = (clubId, pageNum, pageSize, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/customer?pagenum=${pageNum}&pagesize=${pageSize}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => dispatch({
      type: CUSTOMER_CUSTOMER_LIST_FETCH_CUSTOMERS,
      payload: { customers: response.data, total: response.headers.total }
    })).catch();
  }
}
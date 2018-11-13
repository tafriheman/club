import {
  CUSTOMER_CUSTOMER_ADD_CHANGE_PROP,
  CUSTOMER_CUSTOMER_ADD_RESET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const customerCustomerAddChangeProp = (prop, value) => {
  return {
    type: CUSTOMER_CUSTOMER_ADD_CHANGE_PROP,
    payload: { prop, value }
  }
}

export const customerCustomerSubmitForm = (form, history, clubId) => {
  return dispatch => {
  dispatch(customerCustomerAddChangeProp('error', ''));
  axios.post(`${config.domain}/club/${clubId}/customer`, form)
    .then(response => {
      dispatch({
        type: CUSTOMER_CUSTOMER_ADD_RESET_FORM
      });
      history.replace('/dashboard/customer/list')
    }).catch(e => dispatch(customerCustomerAddChangeProp('error', e.response.data.message)));
  }
}

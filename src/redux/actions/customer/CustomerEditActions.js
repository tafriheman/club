import {
  CUSTOMER_CUSTOMER_EDIT_CHANGE_PROP, 
  CUSTOMER_CUSTOMER_EDIT_SET_CUSTOMER,
  CUSTOMER_CUSTOMER_EDIT_RESET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const customerCustomerEditChangeProp = (prop, value) => {
  return {
    type: CUSTOMER_CUSTOMER_EDIT_CHANGE_PROP,
    payload: { prop, value }
  }
}

export const customerCustomerEditSetCustomer = (user, history) => {
  history.push('/dashboard/customer/edit')
  return {
    type: CUSTOMER_CUSTOMER_EDIT_SET_CUSTOMER,
    payload: user
  }
}

export const customerCustomerEditSubmitForm = (clubId, customerId, form, token, history) => {
  return dispatch => {
    dispatch(customerCustomerEditChangeProp('error', ''));
    axios.patch(`${config.domain}/club/${clubId}/customer/${customerId}`, form, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        dispatch({
          type: CUSTOMER_CUSTOMER_EDIT_RESET_FORM
        });
        history.replace(`/dashboard/customers/1`)
      }).catch(e => dispatch(customerCustomerEditChangeProp('error', e.response.data.message)));
  }
}
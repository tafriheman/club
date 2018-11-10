import { 
  PRODUCT_PRODUCT_ADD_CHANGE_PROP, 
  PRODUCT_PRODCUT_ADD_FETCH_CATEGORIES,
  PRODUCT_PRODUCT_ADD_RESET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const productProductAddChangeProp = (prop, value) => {
  return {
    type: PRODUCT_PRODUCT_ADD_CHANGE_PROP,
    payload: { prop, value }
  }
}

export const prodcutProductAddFetchCategories = (clubId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/category`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      dispatch({
        type: PRODUCT_PRODCUT_ADD_FETCH_CATEGORIES,
        payload: response.data 
      })
    }); 
  }
}

export const productProductAddSubmitForm = (clubId, token, form, history) => {
  return dispatch => {
    axios.post(`${config.domain}/club/${clubId}/product`, form,{
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      // TODO go to product list
      dispatch({
        type: PRODUCT_PRODUCT_ADD_RESET_FORM
      })

    }).catch(e => {
      dispatch(productProductAddChangeProp('error', e.response.data.message))
    })
  }
}
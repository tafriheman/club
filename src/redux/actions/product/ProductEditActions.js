import { 
  PRODUCT_PRODUCT_EDIT_CHANGE_PROP, 
  PRODUCT_PRODCUT_EDIT_FETCH_CATEGORIES,
  PRODUCT_PRODUCT_EDIT_RESET_FORM,
  PRODUCT_PRODUCT_EDIT_SET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const productProductEditSetForm = (product, history) => {
  return dispatch => {
    dispatch({
      type: PRODUCT_PRODUCT_EDIT_SET_FORM,
      payload: product
    });
    history.push('/dashboard/product/edit');
  }
}

export const productProductEditChangeProp = (prop, value) => {
  return {
    type: PRODUCT_PRODUCT_EDIT_CHANGE_PROP,
    payload: { prop, value }
  }
}

export const prodcutProductEditFetchCategories = (clubId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/category`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      dispatch({
        type: PRODUCT_PRODCUT_EDIT_FETCH_CATEGORIES,
        payload: response.data 
      })
    }); 
  }
}

export const productProductEditSubmitForm = (clubId, productId, token, form, history) => {
  return dispatch => {
    axios.patch(`${config.domain}/club/${clubId}/product/${productId}`, form, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      history.push('/dashboard/product/list')
      dispatch({
        type: PRODUCT_PRODUCT_EDIT_RESET_FORM
      })

    }).catch(e => {
      dispatch(productProductEditChangeProp('error', e.response.data.message))
    })
  }
}
import {
  CAMPIAN_CAMPAIN_ADD_CHANGE_PROP,
  CAMPIAN_CAMPAIN_ADD_CHANGE_GIFT_PROP,
  CAMPIAN_CAMPAIN_ADD_RESET_FORM,
  CAMPAIN_CAMPAIN_ADD_TOGGLE_PRODUCT_DIALOG,
  CAMPAIN_CAMPAIN_ADD_FETCH_PRODUCTS,
  CAMPAIN_CAMPAIN_ADD_SET_GIFT
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const campainCampainAddToggleProductDialog = () => {
  return {
    type: CAMPAIN_CAMPAIN_ADD_TOGGLE_PRODUCT_DIALOG
  }
}

export const campainCampainAddChangeProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_ADD_CHANGE_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainAddChangeGiftProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_ADD_CHANGE_GIFT_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainAddSubmitForm = (clubId, form, token, history) => {
  return dispatch => {
    dispatch(campainCampainAddChangeProp('error', ''))
    axios.post(`${config.domain}/club/${clubId}/campaign`, form,{
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(respones => {
      history.push('/dashbaord/campain/list');
      dispatch({ type: CAMPIAN_CAMPAIN_ADD_RESET_FORM })
    }).catch(e => dispatch(campainCampainAddChangeProp('error', e.response.data.message)));
  }
}

export const campainCampainAddFetchProducts = (clubId, token, pagenum, pagesize) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/product?pagenum=${pagenum}&pagesize=${pagesize}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => dispatch({
      type: CAMPAIN_CAMPAIN_ADD_FETCH_PRODUCTS,
      payload: {
        products: response.data,
        total: response.headers.total
      } 
    })).catch();
  }
}

export const campainCampainAddSetGift = (gifts) => {
  return {
    type: CAMPAIN_CAMPAIN_ADD_SET_GIFT,
    payload: gifts
  };
}
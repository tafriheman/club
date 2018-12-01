import {
  CAMPIAN_CAMPAIN_EDIT_CHANGE_PROP,
  CAMPIAN_CAMPAIN_EDIT_CHANGE_GIFT_PROP,
  CAMPIAN_CAMPAIN_EDIT_RESET_FORM,
  CAMPAIN_CAMPAIN_EDIT_TOGGLE_PRODUCT_DIALOG,
  CAMPAIN_CAMPAIN_EDIT_FETCH_PRODUCTS,
  CAMPAIN_CAMPAIN_EDIT_SET_GIFT,
  CAMPAIN_CAMPAIN_EDIT_SET_CAMPAIN
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const campainCampainEditToggleProductDialog = () => {
  return {
    type: CAMPAIN_CAMPAIN_EDIT_TOGGLE_PRODUCT_DIALOG
  }
}

export const campainCampainEditChangeProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_EDIT_CHANGE_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainEditChangeGiftProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_EDIT_CHANGE_GIFT_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainEditSubmitForm = (clubId, campainId, form, token, history) => {
  return dispatch => {
    dispatch(campainCampainEditChangeProp('error', ''))
    axios.patch(`${config.domain}/club/${clubId}/campaign/${campainId}`, form,{
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      history.push('/dashboard/campain/list');
      dispatch({ type: CAMPIAN_CAMPAIN_EDIT_RESET_FORM })
    }).catch(e => dispatch(campainCampainEditChangeProp('error', e.response.data.message)));
  }
}

export const campainCampainEditFetchProducts = (clubId, token, pagenum, pagesize) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/product?pagenum=${pagenum}&pagesize=${pagesize}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => dispatch({
      type: CAMPAIN_CAMPAIN_EDIT_FETCH_PRODUCTS,
      payload: {
        products: response.data,
        total: response.headers.total
      } 
    })).catch();
  }
}

export const campainCampainEditSetGift = (gifts) => {
  return {
    type: CAMPAIN_CAMPAIN_EDIT_SET_GIFT,
    payload: gifts
  };
}

export const campainCampainEditSetCampain = (campain, history) => {
  return dispatch => {
    dispatch({ 
      type: CAMPAIN_CAMPAIN_EDIT_SET_CAMPAIN,
      payload: campain
    });
    history.push('/dashboard/campain/edit');
  }
}
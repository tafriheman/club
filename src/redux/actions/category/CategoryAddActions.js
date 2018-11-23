import { 
  CATEGORY_CATEGORY_ADD_CHANGE_PROP,
  CATEGORY_CATEGORY_ADD_FETCH_CATEGORIES,
  CATEGORY_CATEGORY_ADD_RESET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const categoryCategoryAddChangeProp = (prop, value) => {
  return {
    type: CATEGORY_CATEGORY_ADD_CHANGE_PROP,
    payload: { prop, value }
  }
}

export const categoryCategoryAddFetchCategories = (clubId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/category`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      dispatch({
        type: CATEGORY_CATEGORY_ADD_FETCH_CATEGORIES,
        payload: response.data 
      })
    }); 
  }
}

export const categoryCategorySubmitForm = (clubId, token, form, history) => {
  return dispatch => {
    dispatch(categoryCategoryAddChangeProp('error', ''));
    axios.post(`${config.domain}/club/${clubId}/category`, form, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      history.push('/dashboard/category/list');
      dispatch({
        type: CATEGORY_CATEGORY_ADD_RESET_FORM
      })
    })
    .catch(e => dispatch(categoryCategoryAddChangeProp('error', e.response.data.message)));
  }
}
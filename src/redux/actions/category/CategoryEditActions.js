import { 
  CATEGORY_CATEGORY_EDIT_CHANGE_PROP,
  CATEGORY_CATEGORY_EDIT_FETCH_CATEGORIES,
  CATEGORY_CATEGORY_EDIT_RESET_FORM,
  CATEGORY_CATEGORY_EDIT_SET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const categoryCategoryEditSetForm = (category, history) => {
  return dispatch => {
    dispatch({
      type: CATEGORY_CATEGORY_EDIT_SET_FORM,
      payload: category
    })
    history.push('/dashboard/category/edit');
  }
  
}

export const categoryCategoryEditChangeProp = (prop, value) => {
  return {
    type: CATEGORY_CATEGORY_EDIT_CHANGE_PROP,
    payload: { prop, value }
  }
}

export const categoryCategoryEditFetchCategories = (clubId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/category`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      dispatch({
        type: CATEGORY_CATEGORY_EDIT_FETCH_CATEGORIES,
        payload: response.data 
      })
    }); 
  }
}

export const categoryCategoryEditSubmitForm = (clubId, categoryId, token, form, history) => {
  return dispatch => {
    dispatch(categoryCategoryEditChangeProp('error', ''));
    axios.patch(`${config.domain}/club/${clubId}/category/${categoryId}`, form, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      history.push('/dashboard/category/list');
      dispatch({
        type: CATEGORY_CATEGORY_EDIT_RESET_FORM
      })
    })
    .catch(e => dispatch(categoryCategoryEditChangeProp('error', e.response.data.message)));
  }
}
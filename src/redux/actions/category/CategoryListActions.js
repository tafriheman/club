import { 
  CATEGORY_CATEGORY_LIST_FETCH_CATEGORIES
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const categoryCategoryListFetchCategories = (clubId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/category`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      dispatch({
        type: CATEGORY_CATEGORY_LIST_FETCH_CATEGORIES,
        payload: response.data 
      })
    }); 
  }
}

import {
  CAMPIAN_CAMPAIN_LIST_CHANGE_PROP,
  CAMPIAN_CAMPAIN_LIST_CHANGE_GIFT_PROP,
  CAMPIAN_CAMPAIN_LIST_RESET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

export const campainCampainListChangeProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_LIST_CHANGE_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainListChangeGiftProp = (prop, value) => {
  return {
    type: CAMPIAN_CAMPAIN_LIST_CHANGE_GIFT_PROP,
    payload: {
      prop, value
    }
  }
}

export const campainCampainListSubmitForm = (clubId, form, token, history) => {
  return dispatch => {
    dispatch(campainCampainListChangeProp('error', ''))
    axios.post(`${config.domain}/club/${clubId}/campaign`, form,{
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(respones => {
      history.push('/dashbaord/campain/list');
      dispatch({ type: CAMPIAN_CAMPAIN_LIST_RESET_FORM })
    }).catch(e => dispatch(campainCampainListChangeProp('error', e.respones.data.message)));
  }
}
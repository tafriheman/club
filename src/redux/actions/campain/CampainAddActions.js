import {
  CAMPIAN_CAMPAIN_ADD_CHANGE_PROP,
  CAMPIAN_CAMPAIN_ADD_CHANGE_GIFT_PROP,
  CAMPIAN_CAMPAIN_ADD_RESET_FORM
} from '../../types';
import axios from 'axios';
import config from '../../../config.json';

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
    }).catch(e => dispatch(campainCampainAddChangeProp('error', e.respones.data.message)));
  }
}
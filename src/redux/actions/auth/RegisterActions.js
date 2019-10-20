import { AUTH_REGISTER_CHANGE_FORM, AUTH_REGISTER_RESET, COMPLETE_INFO_LOCATION } from '../../types';
import axios from 'axios';
import config from '../../../config.json';
import _ from 'lodash';

export const authRegisterChangeForm = (prop, value) => {
  return {
    type: AUTH_REGISTER_CHANGE_FORM,
    payload: { prop, value }
  }
};

export const authRegisterChangeFormNew = (prop, value) => {
  return {
    type: COMPLETE_INFO_LOCATION,
    payload: { prop, value }
  }
};

export const authRegisterSubmitForm = (form, history) => {
  return dispatch => {
    dispatch(authRegisterChangeForm('error', ''));
    axios.post(`${config.domain}/club/register`, _.omit(form, ['error']))
      .then(response => {
        dispatch({
          type: AUTH_REGISTER_RESET
        });
        history.push('/verify');
      })
      .catch(e => dispatch(authRegisterChangeForm('error', e.response.data.message)));
  }
}
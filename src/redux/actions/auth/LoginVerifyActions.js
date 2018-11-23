import { AUTH_LOGIN_VERIFY_CHANGE_PROP, AUTH_LOGIN_VERIFY_ERROR, AUTH_LOGIN_VERIFY_RESET } from '../../types';
import axios from 'axios';
import config from '../../../config.json';
import { appFetchUser } from '../app';

export const authLoginVerifyChangeProp = (prop, value) => {
  return {
    type: AUTH_LOGIN_VERIFY_CHANGE_PROP,
    payload: { prop, value }
  }
};

export const authLoginVerifySendVerificationCode = (phone, history) => {
  return dispatch => {
    dispatch({ 
      type: AUTH_LOGIN_VERIFY_ERROR,
      payload: ''
    });
    axios.post(`${config.domain}/club/login`, { phone })
      .then(response => {
        history.push('/verify')
      })
      .catch(e => dispatch({
        type: AUTH_LOGIN_VERIFY_ERROR,
        payload: e.response.data.message
      }));
  }
}

export const authLoginVerifyVerifyCode = (phone, code, history) => {
  return dispatch => {
    dispatch({
      type: AUTH_LOGIN_VERIFY_ERROR,
      payload: ''
    });
    axios.post(`${config.domain}/club/verify`, { phone, code })
      .then(response => {
        localStorage.setItem(config.USER_KEY, JSON.stringify(response.data))
        dispatch(appFetchUser());
        dispatch({
          type: AUTH_LOGIN_VERIFY_RESET
        })
        history.push('/dashboard/plugins');
      }) 
      .catch(e => dispatch({
        type: AUTH_LOGIN_VERIFY_ERROR,
        payload: e.response.data.message
      }));
  }
}
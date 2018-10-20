import { AUTH_LOGIN_VERIFY_CHANGE_PROP, AUTH_LOGIN_VERIFY_ERROR, AUTH_LOGIN_VERIFY_RESET } from '../../types';
import { appSetUser } from '../app';
import axios from 'axios';
import config from '../../../config.json';

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
        dispatch(appSetUser(response.data));
        history.push('/');
        dispatch({
          type: AUTH_LOGIN_VERIFY_RESET
        })
      }) 
      .catch(e => dispatch({
        type: AUTH_LOGIN_VERIFY_ERROR,
        payload: e.response.data.message
      }));
  }
}
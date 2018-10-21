import { APP_LOGOUT, APP_FETCH_USER } from '../../types';
import config from '../../../config.json';

export const appFetchUser = () => {
  let result = JSON.parse(localStorage.getItem(config.USER_KEY));
  return {
    type: APP_FETCH_USER,
    payload: result ? result : { user: null, club: null, token: null }
  }
}

export const appLogout = () => {
  localStorage.removeItem(config.USER_KEY);
  return {
    type: APP_LOGOUT
  }
}
import { APP_SET_USER, APP_LOGOUT } from '../../types';
import config from '../../../config.json';

export const appSetUser = (user) => {
  localStorage.setItem(config.USER_KEY, JSON.stringify(user));
  return {
    type: APP_SET_USER,
    payload: user
  }
}

export const appLogout = () => {
  localStorage.removeItem(config.USER_KEY);
  return {
    type: APP_LOGOUT
  }
}
import { APP_SET_USER } from '../../types';
import config from '../../../config.json';

export const appSetUser = (user) => {
  localStorage.setItem(config.USER_KEY, JSON.stringify(user));
  return {
    type: APP_SET_USER,
    payload: user
  }
}
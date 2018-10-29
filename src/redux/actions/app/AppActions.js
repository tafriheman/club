import { 
  APP_LOGOUT, 
  APP_FETCH_USER,
  APP_FETCH_CLUB_INFO,
  APP_FETCH_ADVERTISE
} from '../../types';
import config from '../../../config.json';
import axios from 'axios';

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

export const appFetchAdvertise = (token) => {
  return dispatch => {
    axios.get(`${config.domain}/adv`, { headers: { Authorization: 'Bearer ' + token }})
      .then(response => dispatch({
        type: APP_FETCH_ADVERTISE,
        payload: response.data
      }))
      .catch();
  }
}

export const appFetchClubInfo = (clubId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/info`, { headers: { Authorization: 'Bearer ' + token }})
      .then(response => dispatch({
        type: APP_FETCH_CLUB_INFO,
        payload: response.data
      }))
      .catch();
  }
}
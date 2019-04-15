import { AUTH_REGISTER_CHANGE_FORM, CLUB_USER_DATA } from '../../types';
import axios from 'axios';
import config from '../../../config.json';
import _ from 'lodash';

export const clubRegisterChangeForm = (prop, value) => {
  return {
    type: AUTH_REGISTER_CHANGE_FORM,
    payload: { prop, value }
  }
};
export const userData = (userData) => {
  return {
    type: CLUB_USER_DATA,
    userData
  }
};

export const clubMembership = (phone) => {
  return dispatch => {
    return axios.post(`${config.domain}/user/login`, { phone: phone})
      .then(response => {return(response)})
      .catch(e => dispatch(clubRegisterChangeForm('error', e.response.data.message)));
  }
}
export const clubMembershipVerify = (phone, code) => {
  return dispatch => {
    return axios.post(`${config.domain}/user/verify`, { phone, code })
      .then(response => {
        localStorage.setItem('user_token', response.data.token);
        return (response)
      })
      .catch(e => dispatch(clubRegisterChangeForm('error', e.response.data.message)));
  }
}
export const completeClubMembership = (full_name, birth_date, gender, marital_status, userId) => {
  return dispatch => {
    return axios.post(`${config.domain}/user/profile/${userId}`, { full_name, birth_date, gender, marital_status })
      .then(response => {
        return (response)
      })
      .catch(e => dispatch(clubRegisterChangeForm('error', e.response.data.message)));
  }
}
export const AddOrderClub = (form, clubId) => {
  return dispatch => {
    return axios
      .post(`${config.domain}/user/${clubId}/order`, form)
      .then(response => {
          return response;
      })
      .catch(e => dispatch(clubRegisterChangeForm('error', e.response.data.message)));
  };
};

export const cancelMemebrShip = (clubId,userId) => {
  return dispatch => {
    return axios
      .delete(`${config.domain}/user/${userId}/club/${clubId}`)
      .then(response => {
        return response;
      })
      .catch(e => dispatch(clubRegisterChangeForm('error', e.response.data.message)));
  };
};
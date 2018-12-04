import {
  CAMPAIN_CAMPAIN_LIST_FETCH_CAMPAINS, 
  CAMPAIN_CAMPAIN_LIST_CHANGE_PROP,
  CAMAPIN_CAMPAIN_LSIT_TOGGLE_CAMPAIN_BOARD,
  CAMPAIN_CAMPAIN_LIST_FETCH_USERS
} from '../../types';
import config from '../../../config.json';
import axios from 'axios';

export const campainCampainListChangeProp = (prop, value) => {
  return {
    type: CAMPAIN_CAMPAIN_LIST_CHANGE_PROP,
    payload: {
      prop,
      value
    }
  }
} 

export const campainCampainListFetchCampains = (clubId, token, pageNum, pageSize) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/campaign?pagesize=${pageSize}&pagenum=${pageNum}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      dispatch({
        type: CAMPAIN_CAMPAIN_LIST_FETCH_CAMPAINS,
        payload: { campains: response.data, total: response.headers.total }
      }) 
    })
  }
}

export const campainCampainListDeleteCampain = (clubId, campainId, token, campains, total) => {
  return dispatch => {
    axios.delete(`${config.domain}/club/${clubId}/campaign/${campainId}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => dispatch({
      type: CAMPAIN_CAMPAIN_LIST_FETCH_CAMPAINS,
      payload: {
        campains: campains.filter(camp => camp._id !== campainId),
        total: total - 1
      }
    })).catch(e => dispatch(campainCampainListChangeProp('error', e.response.data.message)))
  }
}


export const campainCampainListFetchUsers = (clubId, campainId, pagenum, pagesize, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/campaign/${campainId}/board?pagenum=${pagenum}&pagesize=${pagesize}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => dispatch({
      type: CAMPAIN_CAMPAIN_LIST_FETCH_USERS,
      payload: {
        attenders: response.data.attenders,
        all_attenders: response.data.all_attenders,
        all_issued_gifts: response.data.all_issued_gifts,
        total: response.headers.total
      }
    })).catch()
  }
}

export const campainCampainListToggleCampainBoard = (id) => {
  return {
    type: CAMAPIN_CAMPAIN_LSIT_TOGGLE_CAMPAIN_BOARD,
    payload: id
  }
}
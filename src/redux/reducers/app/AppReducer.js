import { APP_LOGOUT, APP_FETCH_USER } from '../../types';

const INITIAL_STATE = {
  user: null,
  club: null,
  token: null 
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case APP_LOGOUT:
      return INITIAL_STATE;
    case APP_FETCH_USER:
      return { ...state, user: action.payload.user, club: action.payload.club, token: action.payload.token };
    default:
      return state;
  }
}
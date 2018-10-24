import { APP_LOGOUT, APP_FETCH_USER, APP_FETCH_ADVERTISE, APP_FETCH_CLUB_INFO } from '../../types';

const INITIAL_STATE = {
  user: null,
  club: null,
  token: null,
  advertise: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case APP_LOGOUT:
      return INITIAL_STATE;
    case APP_FETCH_USER:
      return { ...state, user: action.payload.user, club: action.payload.club, token: action.payload.token };
    case APP_FETCH_ADVERTISE:
      return { ...state, advertise: action.payload };
    case APP_FETCH_CLUB_INFO:
      return { ...state, club: action.payload };
    default:
      return state;
  }
}
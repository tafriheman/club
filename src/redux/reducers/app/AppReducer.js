import { APP_SET_USER, APP_LOGOUT } from '../../types';

const INITIAL_STATE = {
  user: null,
  club: null,
  token: null 
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case APP_LOGOUT:
      return INITIAL_STATE;
    case APP_SET_USER:
      return { ...state, user: action.paylod.user, club: action.paylod.club, token: action.paylod.token };
    default:
      return state;
  }
}
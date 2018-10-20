import { AUTH_LOGIN_VERIFY_CHANGE_PROP, AUTH_LOGIN_VERIFY_ERROR, AUTH_LOGIN_VERIFY_RESET } from '../../types';

const INITIAL_STATE = {
  phone: '',
  code: '',
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_LOGIN_VERIFY_CHANGE_PROP:
      return { ...state,  [action.payload.prop]: action.payload.value };
    case AUTH_LOGIN_VERIFY_ERROR:
      return { ...state, error: action.payload };
    case AUTH_LOGIN_VERIFY_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
}
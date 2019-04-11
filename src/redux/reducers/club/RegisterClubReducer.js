import { AUTH_REGISTER_CHANGE_FORM, AUTH_REGISTER_RESET, CLUB_USER_DATA } from '../../types';

const INITIAL_STATE = {
  form: {
    phone: '',
  },
  userData:{},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_REGISTER_RESET:
      return INITIAL_STATE;
    case AUTH_REGISTER_CHANGE_FORM:
      return {...state, form: { ...state.form, [action.payload.prop]: action.payload.value } };
    case CLUB_USER_DATA:
      return Object.assign({}, state, {
        ...action
      })
    default:
      return state;
  }
}
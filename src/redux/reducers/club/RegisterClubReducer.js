import { AUTH_REGISTER_CHANGE_FORM, AUTH_REGISTER_RESET } from '../../types';

const INITIAL_STATE = {
  form: {
    phone: '',
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_REGISTER_RESET:
      return INITIAL_STATE;
    case AUTH_REGISTER_CHANGE_FORM:
      return {...state, form: { ...state.form, [action.payload.prop]: action.payload.value } };
    default:
      return state;
  }
}
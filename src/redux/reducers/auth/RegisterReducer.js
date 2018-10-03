import { AUTH_REGISTER_CHANGE_FORM } from '../../types';

const INITIAL_STATE = {
  form: {
    name: '',
    phone: '',
    logo: '',
    images: [],
    location: {}
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_REGISTER_CHANGE_FORM:
      return {...state, form: { ...state.form, [action.payload.prop]: action.payload.value } };
    default:
      return state;
  }
}
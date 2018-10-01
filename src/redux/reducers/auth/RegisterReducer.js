import { REGISTER_CHANGE_FORM } from '../../types';

const INITIAL_STATE = {
  form: {
    name: '',
    phone: '',
    logo: '',
    images: []
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_CHANGE_FORM:
      return {...state, form: { ...state.form, [action.payload.prop]: action.payload.vaule } };
    default:
      return state;
  }
}
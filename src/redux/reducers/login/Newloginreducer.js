import {
  COMPLETE_INFO,
  COMPLETE_INFO_ERROR,
  COMPLETE_INFO_LOCATION
} from '../../types';

const INITIAL_STATE = {
  full_name: '',
  day: '',
  month: '',
  year: '',
  mday: '',
  mmonth: '',
  myear: '',
  gender: '',
  marital_status: '',
  marital_date: '0/0/0',
  form: {
    location: {},
  },
  enable_push: false,
  error: '',
  user_id: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPLETE_INFO:
      return { ...state, [action.payload.prop]: action.payload.value };
    case COMPLETE_INFO_LOCATION:
      return { ...state, form: { ...state.form, [action.payload.prop]: action.payload.value } }
    case COMPLETE_INFO_ERROR:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
}
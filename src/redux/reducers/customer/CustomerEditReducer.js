import  {
  CUSTOMER_CUSTOMER_EDIT_CHANGE_PROP, 
  CUSTOMER_CUSTOMER_EDIT_SET_CUSTOMER,
  CUSTOMER_CUSTOMER_EDIT_RESET_FORM
} from '../../types';

const INTIAL_STATE = {
  _id: '',
  full_name: '',
  phone: '',
  address: '',
  job: '',
  city: '',
  birth_date: '',
  error: ''
};

export default (state = INTIAL_STATE, action) => {
  switch(action.type) {
    case CUSTOMER_CUSTOMER_EDIT_RESET_FORM:
      return INTIAL_STATE;
    case CUSTOMER_CUSTOMER_EDIT_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CUSTOMER_CUSTOMER_EDIT_SET_CUSTOMER:    
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
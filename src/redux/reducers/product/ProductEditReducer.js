import {
  PRODUCT_PRODUCT_EDIT_CHANGE_PROP, 
  PRODUCT_PRODCUT_EDIT_FETCH_CATEGORIES, 
  PRODUCT_PRODUCT_EDIT_RESET_FORM,
  PRODUCT_PRODUCT_EDIT_SET_FORM
} from '../../types';

const INITIAL_STATE = {
  name: '',
  description: '',
  point: '',
  price: '',
  type: '',
  links: [],
  category: '',
  error: '',
  categories: [],
  images: [],
  _id: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PRODUCT_PRODUCT_EDIT_SET_FORM: 
      return { ...state, ...action.payload }
    case PRODUCT_PRODUCT_EDIT_RESET_FORM:
      return INITIAL_STATE;
    case PRODUCT_PRODCUT_EDIT_FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case PRODUCT_PRODUCT_EDIT_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
}
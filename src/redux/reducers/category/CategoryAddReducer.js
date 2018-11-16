import {
  CATEGORY_CATEGORY_ADD_CHANGE_PROP,
  CATEGORY_CATEGORY_ADD_FETCH_CATEGORIES,
  CATEGORY_CATEGORY_ADD_RESET_FORM
} from '../../types';
  
const INITIAL_STATE = {
  categories: [],
  name: '',
  parent: '',
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CATEGORY_CATEGORY_ADD_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CATEGORY_CATEGORY_ADD_FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case CATEGORY_CATEGORY_ADD_RESET_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}
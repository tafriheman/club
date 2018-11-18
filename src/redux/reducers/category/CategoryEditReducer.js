import {
  CATEGORY_CATEGORY_EDIT_CHANGE_PROP,
  CATEGORY_CATEGORY_EDIT_FETCH_CATEGORIES,
  CATEGORY_CATEGORY_EDIT_RESET_FORM,
  CATEGORY_CATEGORY_EDIT_SET_FORM
} from '../../types';
  
const INITIAL_STATE = {
  _id: '',
  categories: [],
  name: '',
  parent: '',
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CATEGORY_CATEGORY_EDIT_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CATEGORY_CATEGORY_EDIT_FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case CATEGORY_CATEGORY_EDIT_RESET_FORM:
      return INITIAL_STATE;
    case CATEGORY_CATEGORY_EDIT_SET_FORM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
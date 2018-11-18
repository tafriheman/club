import {
  CATEGORY_CATEGORY_LIST_FETCH_CATEGORIES
} from '../../types';

const INITIAL_STATE = {
  categories: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CATEGORY_CATEGORY_LIST_FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
} 
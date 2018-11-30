import {
  CAMPAIN_CAMPAIN_LIST_FETCH_CAMPAINS,
  CAMPAIN_CAMPAIN_LIST_CHANGE_PROP
} from '../../types'

const INITIAL_STATE = {
  pageSize: 12,
  total: 0,
  campains: [],
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CAMPAIN_CAMPAIN_LIST_FETCH_CAMPAINS:
      return { ...state, campains: action.payload.campains, total: action.payload.total };
    case CAMPAIN_CAMPAIN_LIST_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
}
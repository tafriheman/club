import {
  CAMPAIN_CAMPAIN_LIST_FETCH_CAMPAINS,
  CAMPAIN_CAMPAIN_LIST_CHANGE_PROP,
  CAMAPIN_CAMPAIN_LSIT_TOGGLE_CAMPAIN_BOARD,
  CAMPAIN_CAMPAIN_LIST_FETCH_USERS
} from '../../types'

const INITIAL_STATE = {
  pageSize: 12,
  total: 0,
  campains: [],
  error: '',
  board: {
    open: false,
    attenders: [],
    all_attenders: 0,
    all_issued_gifts: 0,
    total: 100,
    campain: '',
    pageSize: 12
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CAMPAIN_CAMPAIN_LIST_FETCH_CAMPAINS:
      return { ...state, campains: action.payload.campains, total: action.payload.total };
    case CAMPAIN_CAMPAIN_LIST_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CAMAPIN_CAMPAIN_LSIT_TOGGLE_CAMPAIN_BOARD:
      return {
         ...state, 
         board: { 
          ...INITIAL_STATE.board,
          open: !state.board.open, 
          campain: action.payload 
        } 
      }
    case CAMPAIN_CAMPAIN_LIST_FETCH_USERS:
      return { ...state, 
        board: { 
          ...state.board, 
          attenders: action.payload.attenders, 
          all_attenders: action.payload.all_attenders,
          all_issued_gifts: action.payload.all_issued_gifts,
          // total: action.payload.total 
        } 
      }
    default:
      return state;
  }
}
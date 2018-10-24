import { DASHBOARD_TRANSACTIONS_FETCH_TRANSACTIONS } from '../../types';

const INITIAL_STATE = {
  pageSize: 12,
  total: 0,
  transactions: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DASHBOARD_TRANSACTIONS_FETCH_TRANSACTIONS:
      return { ...state, total: action.payload.total, transactions: action.payload.transactions }
    default:
      return state
  }
}
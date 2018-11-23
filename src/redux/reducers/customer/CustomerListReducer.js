import {
  CUSTOMER_CUSTOMER_LIST_FETCH_CUSTOMERS,
  CUSTOMER_CUSTOMER_LIST_CHANGE_QUERY
} from '../../types';

const INITIAL_STATE = {
  pageSize: 12,
  total: 0,
  customers: [],
  query: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CUSTOMER_CUSTOMER_LIST_CHANGE_QUERY:
      return { ...state, query: action.payload };
    case CUSTOMER_CUSTOMER_LIST_FETCH_CUSTOMERS:
      return { ...state, customers: action.payload.customers, total: action.payload.total };
    default:
      return state;
  }
}
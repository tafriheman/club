import {
  PRODUCT_PRODUCT_LIST_SET_PRODUCTS
} from '../../types';

const INITIAL_STATE = {
  pageSize: 12,
  total: 0,
  products: [],
  fethcinProducts:true
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PRODUCT_PRODUCT_LIST_SET_PRODUCTS:
      return { ...state, products: action.payload.products, total: action.payload.total, fethcinProducts:true };
    default:
      return state;
  }
}
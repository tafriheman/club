import {
  PRODUCT_PRODUCT_LIST_SET_PRODUCTS,
  PRODUCT_COSTOMERS_LIST
} from '../../types';

const INITIAL_STATE = {
  pageSize: 12,
  total: 0,
  products: [],
  fethcinProducts:true,
  productCostomers:[],
  totalProductCostomers:0,
  frtchingProductCustomers:true
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PRODUCT_PRODUCT_LIST_SET_PRODUCTS:
      return { ...state, products: action.payload.products, total: action.payload.total, fethcinProducts:true };
    case PRODUCT_COSTOMERS_LIST:
      return { ...state, productCostomers: action.payload.productCostomers, totalProductCostomers: action.payload.total, frtchingProductCustomers: false };
    default:
      return state;
  }
}
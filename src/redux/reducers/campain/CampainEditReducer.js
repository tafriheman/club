import { 
  CAMPIAN_CAMPAIN_EDIT_CHANGE_PROP, 
  CAMPIAN_CAMPAIN_EDIT_CHANGE_GIFT_PROP,
  CAMPAIN_CAMPAIN_EDIT_TOGGLE_PRODUCT_DIALOG, 
  CAMPAIN_CAMPAIN_EDIT_FETCH_PRODUCTS,
  CAMPAIN_CAMPAIN_EDIT_SET_GIFT,
  CAMPAIN_CAMPAIN_EDIT_SET_CAMPAIN
} from '../../types';

const INITIAL_STATE = {
  _id: '',
  name: '',
  expire_date: '',
  start_date: '',
  description: '',
  point_of_register: 1,
  point_of_add_member: 1,
  images: [],
  gift: {
    type: 'free',
    free: '',
    min_point_to_achive: '',
    productName: '',
    fType: ''
  },
  gifts: [],
  error: '',
  productDialogOpen: false,
  products: [],
  pageSize: 12,
  total: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CAMPIAN_CAMPAIN_EDIT_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CAMPIAN_CAMPAIN_EDIT_CHANGE_GIFT_PROP:
      return { ...state, gift: { ...state.gift, [action.payload.prop]: action.payload.value }}
    case CAMPAIN_CAMPAIN_EDIT_TOGGLE_PRODUCT_DIALOG:
      return { ...state, productDialogOpen: !state.productDialogOpen };
    case CAMPAIN_CAMPAIN_EDIT_FETCH_PRODUCTS:
      return { ...state, products: action.payload.products, total: action.payload.total };
    case CAMPAIN_CAMPAIN_EDIT_SET_GIFT:
      return { ...state, gift: INITIAL_STATE.gift, gifts: action.payload };
    case CAMPAIN_CAMPAIN_EDIT_SET_CAMPAIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
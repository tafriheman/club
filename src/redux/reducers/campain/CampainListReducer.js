import { 
  CAMPIAN_CAMPAIN_LIST_CHANGE_PROP, 
  CAMPIAN_CAMPAIN_LIST_CHANGE_GIFT_PROP 
} from '../../types';

const INITIAL_STATE = {
  name: '',
  expire_date: '',
  start_date: '',
  description: '',
  point_of_register: '',
  point_of_add_member: '',
  images: [],
  gift: {
    type: 'free',
    free: '',
    min_point_to_achive: '' 
  },
  gifts: [],
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CAMPIAN_CAMPAIN_LIST_CHANGE_PROP:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CAMPIAN_CAMPAIN_LIST_CHANGE_GIFT_PROP:
      return { ...state, gift: { ...state.gift, [action.payload.prop]: action.payload.value }}
    default:
      return state;
  }
}
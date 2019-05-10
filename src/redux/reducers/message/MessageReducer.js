import { CUSTOMER_MESSAGES_LIST } from '../../types';

const INITIAL_STATE = {
 userMessage:[],
 fetchingUserMessages:true,
 totalUSerMessages:0,
 pageSize:12
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CUSTOMER_MESSAGES_LIST:
      return { userMessage: action.payload.userMessage, totalUSerMessages: action.payload.total, fetchingUserMessages:false };
   
    default:
      return state;
  }
}
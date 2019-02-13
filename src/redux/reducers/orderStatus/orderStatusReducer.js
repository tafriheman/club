import ActionType from "../../types/orderStatus";

const INTIAL_STATE = {
  list: { data: {} },
  error: { data: {} },
  loading: false
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.ORDERSTATUS_LIST: {
      return {
        ...state,
        list: { data: action.payload }
      };
    }
    case ActionType.ORDERSTATUS_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionType.ORDERSTATUS_DONE: {
      return {
        ...state,
        loading: false
      };
    }
    case ActionType.ORDERSTATUS_ERROR: {
      return {
        ...state,
        error: { data: action.payload }
      };
    }
    default:
      return state;
  }
};

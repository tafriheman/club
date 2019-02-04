import ActionType from "../../types/order";

const INTIAL_STATE = {
  list: { data: {} },
  add: { data: {} },
  delete: { data: {} },
  update: { data: {} },
  parentList: { data: {} },
  error: { data: {} },
  loading: false
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.ORDER_LIST: {
      return {
        ...state,
        list: { data: action.payload }
      };
    }
    case ActionType.PARENT_ORDER_LIST: {
      return {
        ...state,
        parentList: { data: action.payload }
      };
    }
    case ActionType.ORDER_ADD: {
      return {
        ...state,
        add: { data: action.payload }
      };
    }
    case ActionType.ORDER_DELETE: {
      return {
        ...state,
        delete: { data: action.payload }
      };
    }
    case ActionType.ORDER_EDIT: {
      return {
        ...state,
        update: { data: action.payload }
      };
    }
    case ActionType.ORDER_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionType.ORDER_DONE: {
      return {
        ...state,
        loading: false
      };
    }
    case ActionType.ORDER_ERROR: {
      return {
        ...state,
        error: { data: action.payload }
      };
    }
    default:
      return state;
  }
};

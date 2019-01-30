import ActionType from "../../types/label";

const INTIAL_STATE = {
  list: { data: {} },
  add: { data: {} },
  delete: { data: {} },
  update: { data: {} },
  loading: false
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.LABEL_LIST: {
      return {
        ...state,
        list: { data: action.payload }
      };
    }
    case ActionType.LABEL_Add: {
      return {
        ...state,
        add: { data: action.payload }
      };
    }
    case ActionType.LABEL_DELETE: {
      return {
        ...state,
        delete: { data: action.payload }
      };
    }
    case ActionType.LABEL_EDIT: {
      return {
        ...state,
        update: { data: action.payload }
      };
    }
    case ActionType.LABEL_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionType.LABEL_DONE: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
};

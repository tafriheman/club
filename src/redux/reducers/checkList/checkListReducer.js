import ActionType from "../../types/checkList";

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
    case ActionType.CHECKLIST_LIST: {
      return {
        ...state,
        list: { data: action.payload }
      };
    }
    case ActionType.PARENT_CHECKLIST_LIST: {
      return {
        ...state,
        parentList: { data: action.payload }
      };
    }
    case ActionType.CHECKLIST_ADD: {
      return {
        ...state,
        add: { data: action.payload }
      };
    }
    case ActionType.CHECKLIST_DELETE: {
      return {
        ...state,
        delete: { data: action.payload }
      };
    }
    case ActionType.CHECKLIST_EDIT: {
      return {
        ...state,
        update: { data: action.payload }
      };
    }
    case ActionType.CHECKLIST_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionType.CHECKLIST_DONE: {
      return {
        ...state,
        loading: false
      };
    }
    case ActionType.CHECKLIST_ERROR: {
      return {
        ...state,
        error: { data: action.payload }
      };
    }
    default:
      return state;
  }
};

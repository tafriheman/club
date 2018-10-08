import { LAYOUT_DASHBOARD_LAYOUT_TOGGLE_DRAWER } from '../../types';

const INITIAL_STATE = {
  mobileOpen: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LAYOUT_DASHBOARD_LAYOUT_TOGGLE_DRAWER:
      return { ...state, mobileOpen: !state.mobileOpen };
    default:
      return state;
  }
}
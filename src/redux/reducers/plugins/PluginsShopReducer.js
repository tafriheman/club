import { PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG } from '../../types';

const INITIAL_STATE = {
  isPluginDialogOpen: false,
  pageSize: 12,
  total: 10
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG:
      return { ...state, isPluginDialogOpen: !state.isPluginDialogOpen };
    default:
      return state;
  }
}
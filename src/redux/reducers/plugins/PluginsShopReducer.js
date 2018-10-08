import { PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG } from '../../types';

const INITIAL_STATE = {
  isPluginDialogOpen: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG:
      return { ...state, isPluginDialogOpen: !state.isPluginDialogOpen };
    default:
      return state;
  }
}
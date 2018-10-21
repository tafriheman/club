import { PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG, PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS } from '../../types';

const INITIAL_STATE = {
  isPluginDialogOpen: false,
  pageSize: 12,
  total: 100,
  plugins: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG:
      return { ...state, isPluginDialogOpen: !state.isPluginDialogOpen };
    case PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS:
      return { ...state, plugins: action.payload };
    default:
      return state;
  }
}
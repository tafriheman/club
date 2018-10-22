import { 
  PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG, 
  PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS,
  PLUGINS_PLUGINS_SHOP_SET_SELECTED_PLUGIN
} from '../../types';

const INITIAL_STATE = {
  isPluginDialogOpen: false,
  plugin: '',
  pageSize: 12,
  total: 0,
  plugins: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG:
      return { ...state, isPluginDialogOpen: !state.isPluginDialogOpen };
    case PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS:
      return { ...state, plugins: action.payload.plugins, total: action.payload.total };
    case PLUGINS_PLUGINS_SHOP_SET_SELECTED_PLUGIN:
      return { ...state, plugin: action.payload }
    default:
      return state;
  }
}
import { 
  PLUGINS_MY_PLUGINS_TOGGLE_PLUGIN_DIALOG,
  PLUGINS_MY_PLUGINS_FETCH_PLUGINS,
  PLUGINS_MY_PLUGINS_SET_ERROR,
  PLUGINS_MY_PLUGINS_SET_SELECTED_PLUGIN
} from '../../types';

const INITIAL_STATE = {
  isPluginDialogOpen: false,
  pageSize: 12,
  total: 100,
  plugin: '',
  error: '',
  plugins: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLUGINS_MY_PLUGINS_SET_ERROR:
      return { ...state, error: action.payload }
    case PLUGINS_MY_PLUGINS_FETCH_PLUGINS:
      return { ...state, plugins: action.payload.plugins, total: action.payload.total };
    case PLUGINS_MY_PLUGINS_SET_SELECTED_PLUGIN:
      return { ...state, plugin: action.payload };
    case PLUGINS_MY_PLUGINS_TOGGLE_PLUGIN_DIALOG:
      return { ...state, isPluginDialogOpen: !state.isPluginDialogOpen }
    default:
      return state;
  }
}
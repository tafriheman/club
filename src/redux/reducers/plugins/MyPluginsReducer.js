import { PLUGINS_MY_PLUGINS_TOGGLE_PLUGIN_DIALOG } from '../../types';

const INITIAL_STATE = {
  isPluginDialogOpen: false,
  pageSize: 12,
  total: 100 
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLUGINS_MY_PLUGINS_TOGGLE_PLUGIN_DIALOG:
      return { ...state, isPluginDialogOpen: !state.isPluginDialogOpen };
    default:
      return state;
  }
}
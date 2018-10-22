import { 
  PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG, 
  PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS,
  PLUGINS_PLUGINS_SHOP_SET_SELECTED_PLUGIN
} from '../../types';
import axios from 'axios'; 
import config from '../../../config.json';

export const pluginsPluginsShopTogglePluginDialog = () => {
  return {
    type: PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG
  }
}

export const pluginsPluginsShopFetchPlugin = (clubId, pluginId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/plugin/${pluginId}`, { headers: { Authorization: 'Bearer ' + token }})
      .then(response => {
        dispatch({
          type: PLUGINS_PLUGINS_SHOP_SET_SELECTED_PLUGIN,
          payload: response.data
        });
        dispatch({
          type: PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG
        });
      }
     );
  }
}

export const pluginsPluginsShopFetchPlugins = (clubId, pageNum, pageSize, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/plugin?pagenum=${pageNum}&pagesize=${pageSize}`, { headers: { Authorization: 'Bearer ' + token }}) 
      .then(response => {
        dispatch({
          type: PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS,
          payload: { plugins: response.data, total: response.headers.total } 
        });
      })
      .catch();
  }
}
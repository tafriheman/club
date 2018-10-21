import { PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG, PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS } from '../../types';
import axios from 'axios'; 
import config from '../../../config.json';

export const pluginsPluginsShopTogglePluginDialog = () => {
  return {
    type: PLUGINS_PLUGINS_SHOP_TOGGLE_PLUGIN_DIALOG
  }
}

export const pluginsPluginsShopFetchPlugins = (clubId, pageNum, pageSize, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/plugin?pagenum=${pageNum}&pagesize=${pageSize}`, { headers: { Authorization: 'Bearer ' + token }}) 
      .then(response => {
        dispatch({
          type: PLUGINS_PLUGINS_SHOP_FETCH_PLUGINS,
          payload: response.data
        });
      })
      .catch();
  }
}
import { 
  PLUGINS_MY_PLUGINS_TOGGLE_PLUGIN_DIALOG,
  PLUGINS_MY_PLUGINS_SET_SELECTED_PLUGIN,
  PLUGINS_MY_PLUGINS_FETCH_PLUGINS,
  PLUGINS_MY_PLUGINS_SET_ERROR
} from '../../types';
import axios from 'axios'; 
import config from '../../../config.json';


export const pluginsMyPluginsTogglePluginDialog = () => {
  return {
    type: PLUGINS_MY_PLUGINS_TOGGLE_PLUGIN_DIALOG
  }
}

export const pluginsMyPluginsFetchPlugin = (clubId, pluginId, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/plugin/${pluginId}`, { headers: { Authorization: 'Bearer ' + token }})
      .then(response => {
        dispatch({
          type: PLUGINS_MY_PLUGINS_SET_SELECTED_PLUGIN,
          payload: response.data
        });
        dispatch({
          type: PLUGINS_MY_PLUGINS_TOGGLE_PLUGIN_DIALOG
        });
      }
     );
  }
}

export const pluginsMyPluginsFetchPlugins = (clubId, pageNum, pageSize, token) => {
  return dispatch => {
    axios.get(`${config.domain}/club/${clubId}/myplugin?pagenum=${pageNum}&pagesize=${pageSize}`, { headers: { Authorization: 'Bearer ' + token }}) 
      .then(response => {
        dispatch({
          type: PLUGINS_MY_PLUGINS_FETCH_PLUGINS,
          payload: { plugins: response.data.plugins, total: response.headers.total } 
        });
      })
      .catch();
  }
}

export const pluginsMyPluginsExtendPlugin = (clubId, plugins, token) => {
  console.log(plugins);
  return dispatch => {
    axios.post(`${config.domain}/club/${clubId}/plugin`, { plugins }, { headers: { Authorization: 'Bearer ' + token }})    
      .then(response => {
        window.location = response.data.url;
      })
      .catch(e => {
        dispatch(pluginsMyPluginsSetError(e.response.message))
      })
  }
}

export const pluginsMyPluginsSetError = (error) => {
  return {
    type: PLUGINS_MY_PLUGINS_SET_ERROR,
    payload: error
  }
}
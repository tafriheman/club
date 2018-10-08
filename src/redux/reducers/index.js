import { combineReducers } from 'redux';
import { AuthRegisterReducer } from './auth';
import { LayoutDashboardLayoutReducer } from './dashboard';
import { PluginsMyPluginsReducer, PluginsPluginsShopReducer } from './plugins';


export default combineReducers({
    authRegister: AuthRegisterReducer,
    layoutDashboardLayout: LayoutDashboardLayoutReducer,
    pluginsPluginsShop: PluginsPluginsShopReducer,
    pluginsMyPlugins: PluginsMyPluginsReducer 
});
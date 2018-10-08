import { combineReducers } from 'redux';
import { AuthRegisterReducer } from './auth';
import { DashboardDashboardLayoutReducer } from './dashboard';
import { PluginsMyPluginsReducer, PluginsPluginsShopReducer } from './plugins';


export default combineReducers({
    authRegister: AuthRegisterReducer,
    dashboardDashboardLayout: DashboardDashboardLayoutReducer,
    pluginsPluginsShop: PluginsPluginsShopReducer,
    pluginsMyPlugins: PluginsMyPluginsReducer 
});
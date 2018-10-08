import { combineReducers } from 'redux';
import { AuthRegisterReducer } from './auth';
import { DashboardDashboardLayoutReducer } from './dashboard';

export default combineReducers({
    authRegister: AuthRegisterReducer,
    dashboardDashboardLayout: DashboardDashboardLayoutReducer,
    pluginsPluginsShop: () => [],
    pluginsMyPlugins: () => [] 
});
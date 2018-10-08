import { combineReducers } from 'redux';
import { AuthRegisterReducer } from './auth';
import { LayoutDashboardLayoutReducer } from './layout';
import { PluginsMyPluginsReducer, PluginsPluginsShopReducer } from './plugins';
import { DashboardTransactionsReducer } from './dashboard';

export default combineReducers({
    authRegister: AuthRegisterReducer,
    layoutDashboardLayout: LayoutDashboardLayoutReducer,
    pluginsPluginsShop: PluginsPluginsShopReducer,
    pluginsMyPlugins: PluginsMyPluginsReducer ,
    dashboardTransactions: DashboardTransactionsReducer
});
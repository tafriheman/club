import { combineReducers } from 'redux';
import { AuthRegisterReducer, LoginVerifyReducer } from './auth';
import { LayoutDashboardLayoutReducer } from './layout';
import { PluginsMyPluginsReducer, PluginsPluginsShopReducer } from './plugins';
import { DashboardTransactionsReducer } from './dashboard';
import { AppReducer } from './app';
import { CustomerListReducer } from './customer';

export default combineReducers({
    authRegister: AuthRegisterReducer,
    authLoginVerify: LoginVerifyReducer,
    layoutDashboardLayout: LayoutDashboardLayoutReducer,
    pluginsPluginsShop: PluginsPluginsShopReducer,
    pluginsMyPlugins: PluginsMyPluginsReducer ,
    dashboardTransactions: DashboardTransactionsReducer,
    app: AppReducer,
    customerCustomerList: CustomerListReducer
});
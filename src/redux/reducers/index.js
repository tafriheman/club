import { combineReducers } from "redux";
import { AuthRegisterReducer, LoginVerifyReducer } from "./auth";
import { LayoutDashboardLayoutReducer } from "./layout";
import { PluginsMyPluginsReducer, PluginsPluginsShopReducer } from "./plugins";
import { DashboardTransactionsReducer } from "./dashboard";
import { AppReducer } from "./app";
import {
  CustomerListReducer,
  CustomerAddReducer,
  CustomerEditReducer
} from "./customer";
import {
  ProductAddReducer,
  ProductListReducer,
  ProductEditReducer
} from "./product";
import {
  CategoryAddReducer,
  CategoryListReducer,
  CategoryEditReducer
} from "./category";
import {
  CampainAddReducer,
  CampainListReducer,
  CampainEditReducer
} from "./campain";

import RegisterClubReducer from './club/RegisterClubReducer'
import LabelReducer from "./label/labelReducer";
import CheckListReducer from "./checkList/checkListReducer";
import OrderReducer from "./order/orderReducer";
import OrderStatusReducer from "./orderStatus/orderStatusReducer";
import MessageReducer from "./message/MessageReducer";
import CompleteInfo from "./login/Newloginreducer";

export default combineReducers({
  club:RegisterClubReducer,
  authRegister: AuthRegisterReducer,
  authLoginVerify: LoginVerifyReducer,
  layoutDashboardLayout: LayoutDashboardLayoutReducer,
  pluginsPluginsShop: PluginsPluginsShopReducer,
  pluginsMyPlugins: PluginsMyPluginsReducer,
  dashboardTransactions: DashboardTransactionsReducer,
  app: AppReducer,
  customerCustomerList: CustomerListReducer,
  customerCustomerAdd: CustomerAddReducer,
  customerCustomerEdit: CustomerEditReducer,
  productProductAdd: ProductAddReducer,
  productProductList: ProductListReducer,
  productProductEdit: ProductEditReducer,
  categoryCategoryAdd: CategoryAddReducer,
  categoryCategoryList: CategoryListReducer,
  categoryCategoryEdit: CategoryEditReducer,
  campainCampainAdd: CampainAddReducer,
  campainCampainList: CampainListReducer,
  campainCampainEdit: CampainEditReducer,
  label: LabelReducer,
  checkList: CheckListReducer,
  order: OrderReducer,
  orderStatus: OrderStatusReducer,
  message: MessageReducer,
  CompleteInfo: CompleteInfo
});

import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  appFetchUser,
  appFetchAdvertise,
  appFetchClubInfo
} from "./redux/actions";
import config from "./config.json";

// auth modules

import Login from "./modules/auth/Login.jsx";
import ProductDetails from "./modules/Product/ProductDetails.jsx";
import Register from "./modules/auth/Register.jsx";
import Verify from "./modules/auth/Verify.jsx";
import Label from "./modules/labels";
import CheckList from "./modules/checkList";
import Order from "./modules/order";
import CreditCards from "./modules/CreditCard/CreditCardCustomer";
import CreditCardsMe from "./modules/CreditCard/CreditCardsMe";
import Basket from "./modules/Basket/index";
import Checkout from "./modules/Basket/checkout";
import OrderCustomer from "./modules/orderCustomer/OrderCustomer.jsx";
import CustomerProfile from "./modules/Customer/CustomerProfile.jsx";
import CustomerHistory from "./modules/Customer/CustomerHistory.jsx";
import MessageCustomer from "./modules/messageCustomer/messageCustomer.jsx";
import MessageDetails from "./modules/messageCustomer/MessageDetails.jsx";
import SmsBC from "./modules/SmsBC/SmsBC.jsx";
import ProductCustomers from "./modules/Product/ProductCustomers.jsx";
import Events from "./modules/Event/EventList.jsx";
import ClubCategories from "./modules/Club/Categories";
import ClubCategoryProducts from "./modules/Club/Products";
import ClubCategoryProduct from "./modules/Club/Product";

//coffeeshop
import CoffeeShop from "./modules/coffeeshop/coffeeshop";
// dashboard layout
import DashboardLayout from "./modules/Layout/DashboardLayout.jsx";
import ClubProfileLayout from "./modules/Layout/ClubProfile/ClubProfileLayout";
class Router extends Component {
  componentWillMount() {
    this.props.appFetchUser();
  }

  componentWillReceiveProps(nextProps) {
    const { appFetchAdvertise, appFetchClubInfo, token, club } = nextProps;

    if (token && this.props.token === null) {
      appFetchAdvertise(token);
      appFetchClubInfo(club._id, token);
    }
  }
  hasPermission(permission) {
    const { club } = this.props;
    //console.log("clubPermissions:", club);
    if (club && club.permissions.indexOf(permission) === -1) return false;
    return true;
  }
  render() {
    const user = JSON.parse(localStorage.getItem(config.USER_KEY));
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ClubProfileLayout} exact />
          <Route path="/clubs/:clubId" component={ClubProfileLayout} />
          <Route
            path="/dashboard/products/:clubId/custmers/:productId"
            component={ProductCustomers}
            exact
          />
          <Route path="/orders" component={OrderCustomer} exact />
          <Route path="/CoffeeShop" component={CoffeeShop} exact />
          <Route path="/profile" component={CustomerProfile} exact />
          <Route path="/profile/customer" component={CustomerHistory} exact />
          <Route path="/messages" component={MessageCustomer} exact />
          <Route path="/message/:code" component={MessageDetails} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/verify" component={Verify} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/b/:str" component={SmsBC} exact />
          <Route path="/basket" component={Basket} exact />
          <Route path="/checkout" component={Checkout} exact />
          <Route path="/creditcards" component={CreditCards} exact />
          <Route path="/events" component={Events} exact />
          <Route path="/creditcards/me" component={CreditCardsMe} exact />
          <Route path="/club/:id/categories" component={ClubCategories} exact />
          <Route
            path="/club/:id/categories/:id/products"
            component={ClubCategoryProducts}
            exact
          />
          <Route
            path="/club/:id/products/:id"
            component={ClubCategoryProduct}
            exact
          />
          <Route
            path="/dashboard/product/list"
            component={DashboardLayout}
            exact
          />

          <Route
            path="/dashboard/product/edit"
            component={DashboardLayout}
            exact
          />
          {this.hasPermission(config.campain.add) && (
            <Route
              path="/dashboard/campain/add"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.campain.list) && (
            <Route
              path="/dashboard/campain/list"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.campain.update) && (
            <Route
              path="/dashboard/campain/edit"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.category.add) && (
            <Route
              path="/dashboard/category/add"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.category.list) && (
            <Route
              path="/dashboard/category/list"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.category.edit) && (
            <Route
              path="/dashboard/category/edit"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.product.add) && (
            <Route
              path="/dashboard/product/add"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.customer.list) && (
            <Route
              path="/dashboard/customers/:number"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.customer.edit) && (
            <Route
              path="/dashboard/customer/edit"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.customer.add) && (
            <Route
              path="/dashboard/customer/add"
              component={DashboardLayout}
              exact
            />
          )}
          <Route
            path="/dashboard/customer/list"
            component={DashboardLayout}
            exact
          />
          {this.hasPermission(config.label.add) && (
            <Route path="/dashboard/labels" component={DashboardLayout} exact />
          )}
          {this.hasPermission(config.label.add) && (
            <Route
              path="/dashboard/customer/:customerId/labels"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.checkList.add) && (
            <Route
              path="/dashboard/checkLists"
              component={DashboardLayout}
              exact
            />
          )}
          {this.hasPermission(config.order.add) && (
            <Route path="/dashboard/order" component={DashboardLayout} exact />
          )}
          <Route path="/product/:productId" component={ProductDetails} exact />

          <Route path="/dashboard/plugins" component={DashboardLayout} exact />
          <Route
            path="/dashboard/my/plugins"
            component={DashboardLayout}
            exact
          />
          <Route
            path="/dashboard/transactions"
            component={DashboardLayout}
            exact
          />
          <Route path="/dashboard/cc/add" component={DashboardLayout} exact />
          <Route path="/dashboard/cc/list" component={DashboardLayout} exact />
          <Route path="/dashboard/cc/list" component={DashboardLayout} exact />
          <Route path="/dashboard/messages" component={DashboardLayout} exact />
          <Route path="/dashboard/addevent" component={DashboardLayout} exact />
          <Route path="/dashboard/setting" component={DashboardLayout} exact />
          <Route
            path="/dashboard/grade/setting"
            component={DashboardLayout}
            exact
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({
  app,
  customerCustomerEdit,
  categoryCategoryEdit,
  productProductEdit,
  campainCampainEdit
}) => {
  return {
    ...app,
    customerEditId: customerCustomerEdit._id,
    categoryEditId: categoryCategoryEdit._id,
    productEditId: productProductEdit._id,
    campainEditId: campainCampainEdit._id
  };
};

export default connect(
  mapStateToProps,
  {
    appFetchUser,
    appFetchAdvertise,
    appFetchClubInfo
  }
)(Router);

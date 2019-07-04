import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import config from "../../config.json";
import Message from "../message/index.jsx";
// plugins module
import PluginsShop from "../Plugins/PluginsShop";
import MyPlugins from "../Plugins/MyPlugins";

// Customer module
import CustomerList from "../Customer/CustomerList";
import CustomerAdd from "../Customer/CustomerAdd";
import CustomerEdit from "../Customer/CustomerEdit";
import CustomerLabels from "../Customer/labels";

// CreditCard module
//import CreditCardList from "../CreditCard/CreditCardList";
import CreditCardAdd from "../CreditCard/CreditCardAdd";
import CreditCardList from "../CreditCard/CreditCardList";
// Category module
import CategoryAdd from "../Category/CategoryAdd";
import CategoryList from "../Category/CategoryList";
import CategoryEdit from "../Category/CategoryEdit";

// Product module
import ProductAdd from "../Product/ProductAdd";
import ProductList from "../Product/ProductList";
import ProductEdit from "../Product/ProductEdit";
import ProductDetails from "../Product/ProductDetails";

// Campain module
import CampainAdd from "../Campain/CampainAdd";
import CampainList from "../Campain/CampainList";
import CampainEdit from "../Campain/CampainEdit";

// Dashboard module
import Transactions from "../Dashboard/Transactions";
import AboutUs from "../Dashboard/AboutUs";
import Dashboard from "../Dashboard/Dashboard";
import Support from "../Dashboard/Support";

import Label from "../labels";
import CheckList from "../checkList";
import Order from "../order";

class Router extends Component {
  hasPermission(permission) {
    const { club } = this.props;
    if (club && club.permissions.indexOf(permission) === -1) return false;
    return true;
  }

  render() {
    const {
      customerEditId,
      categoryEditId,
      productEditId,
      campainEditId
    } = this.props;

    return (
      <Switch>
        {/* campain module routes */}
        {this.hasPermission(config.campain.add) && (
          <Route path="/dashboard/campain/add" component={CampainAdd} exact />
        )}
        {this.hasPermission(config.campain.list) && (
          <Route path="/dashboard/campain/list" component={CampainList} exact />
        )}
        {this.hasPermission(config.campain.update) && (
          <Route
            path="/dashboard/campain/edit"
            render={props => {
              return campainEditId.length === 0 ? (
                <Redirect to="/dashboard/campain/list" />
              ) : (
                <CampainEdit {...props} />
              );
            }}
            exact
          />
        )}
        {/* categories module routes */}
        {this.hasPermission(config.category.add) && (
          <Route path="/dashboard/category/add" component={CategoryAdd} exact />
        )}
        {this.hasPermission(config.category.list) && (
          <Route
            path="/dashboard/category/list"
            component={CategoryList}
            exact
          />
        )}
        {this.hasPermission(config.category.edit) && (
          <Route
            path="/dashboard/category/edit"
            render={props => {
              return categoryEditId.length === 0 ? (
                <Redirect to="/dashboard/category/list" />
              ) : (
                <CategoryEdit {...props} />
              );
            }}
            exact
          />
        )}
        {/* prodcuts module routes */}
        {this.hasPermission(config.product.add) && (
          <Route path="/dashboard/product/add" component={ProductAdd} exact />
        )}
        {/* {this.hasPermission(config.product.list) && ( */}
        <Route
          path="/"
          render={() => <ProductList isClubProfile={true} />}
          exact
        />
        {/* )} */}
        {/* {this.hasPermission(config.product.list) && ( */}
        <Route
          path="/dashboard/product/list"
          render={() => <ProductList isClubProfile={false} />}
          exact
        />
        {/* )} */}
        {/* {this.hasPermission(config.product.edit) && ( */}
        <Route
          path="/dashboard/product/edit"
          render={props => {
            return productEditId.length === 0 ? (
              <Redirect to="/dashboard/product/list" />
            ) : (
              <ProductEdit {...props} />
            );
          }}
          exact
        />
        {/* )} */}
        {/* customer module routes */}
        {this.hasPermission(config.customer.list) && (
          <Route
            path="/dashboard/customers/:number"
            component={CustomerList}
            exact
          />
        )}
        {this.hasPermission(config.customer.list) && (
          <Route
            path="/dashboard/customer/:customerId/labels"
            component={CustomerLabels}
            exact
          />
        )}
        {this.hasPermission(config.customer.edit) && (
          <Route
            path="/dashboard/customer/edit"
            render={props => {
              return customerEditId.length === 0 ? (
                <Redirect to="/dashboard/customer/list" />
              ) : (
                <CustomerEdit {...props} />
              );
            }}
            exact
          />
        )}
        {this.hasPermission(config.customer.add) && (
          <Route path="/dashboard/customer/add" component={CustomerAdd} exact />
        )}
        {/* plugins module routes */}
        <Route path="/dashboard/plugins" component={PluginsShop} exact />
        <Route path="/dashboard/my/plugins" component={MyPlugins} exact />
        {/* dashboard module routes */}
        <Route path="/dashboard/transactions" component={Transactions} exact />
        {/* <Route path='/dashboard/about' component={AboutUs} exact /> */}
        {/* <Route path='/dashboard' component={Dashboard} exact /> */}
        {/* <Route path='/dashboard/support' component={Support} exact /> */}

        {/*order Route */}
        {this.hasPermission(config.label.add) && (
          <Route path="/dashboard/labels" component={Label} exact />
        )}
        {this.hasPermission(config.checkList.add) && (
          <Route path="/dashboard/checkLists" component={CheckList} exact />
        )}
        {this.hasPermission(config.order.add) && (
          <Route path="/dashboard/order" component={Order} exact />
        )}
        {/*CreditCardModule*/}
        <Route path="/dashboard/cc/add" component={CreditCardAdd} exact />
        <Route path="/dashboard/cc/list" component={CreditCardList} exact />

        <Route path="/product/:productId" component={ProductDetails} exact />
        <Route path="/dashboard/messages" component={Message} exact />
      </Switch>
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

export default withRouter(connect(mapStateToProps)(Router));

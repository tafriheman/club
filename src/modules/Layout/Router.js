import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import config from '../../config.json';

// plugins module
import PluginsShop from '../Plugins/PluginsShop';
import MyPlugins from '../Plugins/MyPlugins';

// Customer module
import CustomerList from '../Customer/CustomerList';
import CustomerAdd from '../Customer/CustomerAdd';
import CustomerEdit from '../Customer/CustomerEdit';

// Category module
import CategoryAdd from '../Category/CategoryAdd';
import CategoryList from '../Category/CategoryList';
import CategoryEdit from '../Category/CategoryEdit';

// Product module
import ProductAdd from '../Product/ProductAdd'; 
import ProductList from '../Product/ProductList'; 

// Dashboard module
import Transactions from '../Dashboard/Transactions';
import AboutUs from '../Dashboard/AboutUs';
import Dashboard from '../Dashboard/Dashboard';
import Support from '../Dashboard/Support';

class Router extends Component {

  hasPermission(permission) {
    if (this.props.club.permissions.indexOf(permission) === -1)
      return false;
    return true;
  }

  render() {

    const { customerEditId, categoryEditId } = this.props;

    return (
      <Switch>
        {/* categories module routes */}
        {
          this.hasPermission(config.category.add) &&
          <Route path='/dashboard/category/add' component={CategoryAdd} exact />
        }
        {
          this.hasPermission(config.category.list) &&
          <Route path='/dashboard/category/list' component={CategoryList} exact />
        }
        {
          this.hasPermission(config.category.edit) &&
          <Route path='/dashboard/category/edit' render={(props) => {
            return categoryEditId.length === 0 ? <Redirect to="/dashboard/category/list" /> : <CategoryEdit {...props}/>
          }} exact />
        }
        {/* prodcuts module routes */}
        {
          this.hasPermission(config.product.add) &&
          <Route path='/dashboard/product/add' component={ProductAdd} exact />
        }
        {
          this.hasPermission(config.product.list) &&
          <Route path='/dashboard/product/list' component={ProductList} exact />
        }
        {/* customer module routes */}
        {
          this.hasPermission(config.customer.list) &&
          <Route path='/dashboard/customer/list' component={CustomerList} exact />
        }
        {
          this.hasPermission(config.customer.edit) &&
          <Route path='/dashboard/customer/edit' render={(props) => {
            return customerEditId.length === 0 ? <Redirect to="/dashboard/customer/list" /> : <CustomerEdit {...props}/>
          }} exact />
        }
        {
          this.hasPermission(config.customer.add) &&
          <Route path='/dashboard/customer/add' component={CustomerAdd} exact />
        }
        {/* plugins module routes */}
        <Route path='/dashboard/plugins' component={PluginsShop} exact />
        <Route path='/dashboard/my/plugins' component={MyPlugins} exact />
        {/* dashboard module routes */}
        <Route path='/dashboard/transactions' component={Transactions} exact />
        {/* <Route path='/dashboard/about' component={AboutUs} exact /> */}
        {/* <Route path='/dashboard' component={Dashboard} exact /> */}
        {/* <Route path='/dashboard/support' component={Support} exact /> */}
      </Switch>
    );
  }
}

const mapStateToProps = ({ app, customerCustomerEdit, categoryCategoryEdit }) => {
  return { ...app, customerEditId: customerCustomerEdit._id, categoryEditId: categoryCategoryEdit._id };
}

export default withRouter(connect(mapStateToProps)(Router));
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import config from '../../config.json';
import moment from 'jalali-moment';

// plugins module
import PluginsShop from '../Plugins/PluginsShop';
import MyPlugins from '../Plugins/MyPlugins';

// Customer module
import CustomerList from '../Customer/CustomerList';

// Dashboard module
import Transactions from '../Dashboard/Transactions';
import AboutUs from '../Dashboard/AboutUs';
import Dashboard from '../Dashboard/Dashboard';
import Support from '../Dashboard/Support';

class Router extends Component {

  hasPermission(permission) {
    let permissions = [];
    let pluginsInfo = this.props.club.plugins;
    let date = moment().format('jYYYY/jMM/jDD');

    if(pluginsInfo.length === 0 || !pluginsInfo[0].plugin.permissions)
      return false;

    for (let i = 0; i < pluginsInfo.length; i++) {
      if(pluginsInfo[i].expire_date >= date) {
        permissions.push(...pluginsInfo[i].plugin.permissions);
      }
    }

    if (permissions.indexOf(permission) === -1)
      return false;
    return true;
  }

  render() {
    return (
      <Switch>
        {/* customer module routes */}
        {
          this.hasPermission(config.customer.list) &&
          <Route path='/dashboard/customer/list' component={CustomerList} exact />
        }
        {/* plugins module routes */}
        <Route path='/dashboard/plugins' component={PluginsShop} exact />
        <Route path='/dashboard/my/plugins' component={MyPlugins} exact />
        {/* dashboard module routes */}
        <Route path='/dashboard/transactions' component={Transactions} exact />
        <Route path='/dashboard/about' component={AboutUs} exact />
        <Route path='/dashboard' component={Dashboard} exact />
        <Route path='/dashboard/support' component={Support} exact />
      </Switch>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return { ...app };
}

export default withRouter(connect(mapStateToProps)(Router));
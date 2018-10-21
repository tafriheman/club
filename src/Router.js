import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { appFetchUser } from './redux/actions';
import config from './config.json';

// auth modules
import Login from './modules/Auth/Login.jsx';
import Register from './modules/Auth/Register.jsx';
import Verify from './modules/Auth/Verify.jsx';

// dashboard layout
import DashboardLayout from './modules/Layout/DashboardLayout.jsx';

class Router extends Component {

  componentWillMount() {
    this.props.appFetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/verify' component={Verify} exact />
          <Route path='/register' component={Register} exact />
          {
            !JSON.parse(localStorage.getItem(config.USER_KEY)) ? <Redirect to='/login'/> 
            : <Route path='/' component={DashboardLayout} />
          }
        </Switch>
      </BrowserRouter>
    );
  }
}


export default connect(null, {
  appFetchUser
})(Router);
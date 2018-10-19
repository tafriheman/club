import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// auth modules
import Login from './modules/Auth/Login.jsx';
import Register from './modules/Auth/Register.jsx';
import Verify from './modules/Auth/Verify.jsx';

// dashboard layout
import DashboardLayout from './modules/Layout/DashboardLayout.jsx';

class Router extends Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} exact />
            <Route path='/verify' component={Verify} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/' component={DashboardLayout} />
          </Switch>
        </BrowserRouter>
      );
    }
}

export default Router;
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// auth modules
import Login from './modules/auth/Login.jsx';
import Register from './modules/auth/Register.jsx';

// dashboard layout
import DashboardLayout from '../src/modules/dashboard/DashboardLayout.jsx';

class Router extends Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/' component={DashboardLayout} />
          </Switch>
        </BrowserRouter>
      );
    }
}

export default Router;
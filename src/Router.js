import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// auth modules
import Login from './modules/auth/Login.jsx';
import Register from './modules/auth/Register.jsx';

class Router extends Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} exact />
            <Route paht='/register' component={Register} exact />
          </Switch>
        </BrowserRouter>
      );
    }
}

export default Router;
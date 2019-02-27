import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'

import reducers from './redux/reducers';
import Router from './Router';

// css
import './assets/css/global/index.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  direction: 'rtl'
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [ReduxThunk]

class App extends Component {
  render() {
    const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
    return (
      <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Router />
          </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;

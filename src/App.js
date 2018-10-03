import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';

import reducers from './redux/reducers';
import Router from './Router';

// css
// import 'antd/dist/antd.css';
import './assets/css/global/index.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  direction: 'rtl'
});

class App extends Component {
  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
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

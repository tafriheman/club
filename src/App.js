import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';

import reducers from './redux/reducers';
import Router from './Router';

// css
import 'antd/dist/antd.css';
import './assets/css/global/index.css';

class App extends Component {
  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

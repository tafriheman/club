import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';

import reducers from './redux/reducers';

// css
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
      </Provider>
    );
  }
}

export default App;

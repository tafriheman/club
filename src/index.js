import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
require('react-web-vector-icons/fonts');
unregister();

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

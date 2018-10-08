import React from 'react';
import { Switch, Route } from 'react-router-dom';

// plugins module
import PluginsShop from '../Plugins/PluginsShop';
import MyPlugins from '../Plugins/MyPlugins';

// Dashboard module
import Transactions from '../Dashboard/Transactions';

export default () => {
  return (
    <Switch>
      {/* plugins module routes */}
      <Route path='/plugins' component={PluginsShop} exact />
      <Route path='/my/plugins' component={MyPlugins} exact />
      {/* dashboard module routes */}
      <Route path='/transactions' component={Transactions} exact />
    </Switch>
  );
}
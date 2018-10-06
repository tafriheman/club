import React from 'react';
import { Switch, Route } from 'react-router-dom';

// plugins module
import PluginsShop from '../Plugins/PluginsShop';
import MyPlugins from '../Plugins/MyPlugins';

export default () => {
  return (
    <Switch>
      <Route path='/plugins' component={PluginsShop} exact />
      <Route path='/my/plugins' component={MyPlugins} exact />
    </Switch>
  );
}
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// plugins module
import PluginsShop from '../Plugins/PluginsShop';

export default () => {
  return (
    <Switch>
      <Route path='/plugins' component={PluginsShop} exact />
    </Switch>
  );
}
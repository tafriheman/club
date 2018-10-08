import React, { Component } from 'react';
import PluginCard from './components/PluginCard.jsx';
import PluginDialog from './components/PluginDialog';
import { Grid } from '@material-ui/core'

class PluginsShop extends Component {
  render() {
    return (
      <div>
        <Grid container direction="row" spacing={8}>
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
        </Grid>
        <PluginDialog />
      </div>
    );
  }
}

export default PluginsShop;
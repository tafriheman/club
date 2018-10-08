import React, { Component } from 'react';
import PluginCard from './components/PluginCard.jsx';
import { Grid } from '@material-ui/core'

class MyPlugins extends Component {
  render() {
    return (
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
      </Grid>
    );
  }
}

export default MyPlugins;

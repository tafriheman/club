import React, { Component } from 'react';
import PluginCard from './components/PluginCard.jsx';
import { Grid } from '@material-ui/core';
import PluginDialog from './components/PluginDialog';

class MyPlugins extends Component {
  render() {
    return (
      <div>
        <Grid container direction="row" spacing={8}>
          <PluginCard type="my-plugins"/>
          <PluginCard type="my-plugins"/>
          <PluginCard type="my-plugins"/>
          <PluginCard type="my-plugins"/>
          <PluginCard type="my-plugins"/>
          <PluginCard type="my-plugins"/>
        </Grid>
        <PluginDialog type="my-plugins"/>
      </div>
    );
  }
}

export default MyPlugins;

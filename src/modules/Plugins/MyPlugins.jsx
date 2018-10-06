import React, { Component } from 'react';
import Plugin from './components/Plugin.jsx';
import { Grid } from '@material-ui/core'

class MyPlugins extends Component {
  render() {
    return (
      <Grid container direction="row" spacing={8}>
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
        <Plugin />
      </Grid>
    );
  }
}

export default MyPlugins;

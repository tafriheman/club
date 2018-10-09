import React, { Component } from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';


class AboutUs extends Component {
  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="headline" algin="right" style={{ width: '100%', marginBottom: '20px' }}>درباره ما</Typography>
        <Typography variant="body1" align="right" style={{ width: '100%', lineHeight: '1.2em' }}>
          درباره ما ...................
        </Typography> 
      </Grid>
    );
  }
}

export default AboutUs;
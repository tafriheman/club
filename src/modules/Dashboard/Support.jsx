import React, { Component } from 'react';
import {
  Grid,
  Typography,
  withStyles
} from '@material-ui/core'
import styles from './styles/Support';
import compose from 'recompose/compose';

class Dashboard extends Component {
  render(){
    const { classes } = this.props;
    
    return (
       <Grid container direction="column" alignItems="center">
          <Typography variant="title" align="right" className={classes.header}>پشتیبانی</Typography>
        </Grid>
    );
  }
}

export default compose(
  withStyles(styles)
)(Dashboard);
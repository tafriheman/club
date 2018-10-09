import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import {
  withStyles,
  Paper,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';

class Advertise extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper classes={{ root: classes.container }}>
        <Grid container direction="row" justify="space-between" alignItems="baseline">
          <Typography variant="title">
            افزونه ارسال پیامک به مشتریان افزوده شد
            </Typography>
          <Button 
            variant="contained" 
            color="primary"
            classes={{ root: classes.button }}
          >
            asdf
          </Button>
        </Grid>
      </Paper>
    );
  }
}

const styles = theme => ({
  container: {
    color: 'white',
    backgroundColor: 'red',
    padding: '10px',
    marginBottom: '20px',
  },
  button: {
    color: 'white',
    background: 'black'
  }

});

export default compose(
  withStyles(styles)
)(Advertise);
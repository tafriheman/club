import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import {
  withStyles,
  Paper,
  Grid,
  Typography,
  Button
} from '@material-ui/core';

class Advertise extends Component {
  render() {
    const { classes, advertise } = this.props;

    return (
      advertise ?
      <Paper classes={{ root: classes.container }}>
        <Grid container direction="row" justify="space-between" alignItems="baseline">
          <Typography variant="title">
            { advertise.text }
          </Typography>
          {
            advertise.link ?
            <Button 
              href={advertise.link}
            >
              برو به
            </Button> : ''
          }
        </Grid>
      </Paper>
      : ''
    );
  }
}

const styles = theme => ({
  container: {
    color: 'white',
    backgroundColor: 'yellow',
    padding: '10px',
    marginBottom: '20px',
  }
 });

const mapStateToProps = ({ app }) => {
  return { ...app };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Advertise);
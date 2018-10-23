import React, { Component } from 'react';
import { Close as CloseIcon, Error as ErrorIcon } from '@material-ui/icons';
import { Snackbar, SnackbarContent, withStyles, IconButton } from '@material-ui/core'

class MySnackBarError extends Component {
  render() {
    const { open, message, onClose, classes } = this.props;
    return (
      <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
        >
        <SnackbarContent
            classes={{ root: classes.root, action: classes.action }}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <ErrorIcon style={{ marginLeft: '5px' }}/>
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() =>  onClose('')}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          /> 
      </Snackbar>
    );
  }
}

const styles = theme => ({
  icon: {
    fontSize: 20,
  },
  root: {
    backgroundColor: theme.palette.error.dark,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '50px'
  },
  action: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 'auto'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }, 
});

export default withStyles(styles)(MySnackBarError);
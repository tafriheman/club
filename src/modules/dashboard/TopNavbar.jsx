import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

class TopNavbar extends Component {

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = theme => ({
  appBar: {
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
      marginRight: 240,
      width: `calc(100% - 240px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

export default withStyles(styles)(TopNavbar);
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { dashboardDashboardLayoutToggleNavbar } from '../../redux/actions';

class TopNavbar extends Component {

  render() {
    const { classes, dashboardDashboardLayoutToggleNavbar } = this.props;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={dashboardDashboardLayoutToggleNavbar}
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

export default compose(
  withStyles(styles),
  connect(null, { 
    dashboardDashboardLayoutToggleNavbar
  })
)(TopNavbar);
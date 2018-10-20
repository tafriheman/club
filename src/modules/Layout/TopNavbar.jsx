import React, { Component } from 'react';
import { Toolbar, AppBar, IconButton, Avatar, Button }  from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { layoutDashboardLayoutToggleNavbar, appLogout } from '../../redux/actions';
import styles from './styles/TopNavbar';
import { withRouter } from 'react-router-dom';

class TopNavbar extends Component {

  render() {
    const { classes, layoutDashboardLayoutToggleNavbar, appLogout, history } = this.props;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={layoutDashboardLayoutToggleNavbar}
              className={classes.navIconHide}
            >
            <MenuIcon />
          </IconButton>
          <Avatar src={require('../../assets/images/global/logo.jpg')}/>
          <h3 className={classes.clubName}>نام فروشگاه</h3>
          <Button 
            className={classes.logoutButton}
            onClick={() => {
              appLogout();
              history.push('/login');
            }}
          >
            خروج
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, { 
    layoutDashboardLayoutToggleNavbar,
    appLogout
  })
)(TopNavbar);
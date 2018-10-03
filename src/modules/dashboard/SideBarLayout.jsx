import React, { Component } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { dashboardDashboardLayoutToggleNavbar } from '../../redux/actions';


class SideBarLayout extends Component {

  render() {
    const { classes, dashboardDashboardLayoutToggleNavbar, mobileOpen } = this.props;

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={dashboardDashboardLayoutToggleNavbar}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

const styles = theme => ({
  drawerPaper: {
    height: '100vh',
    width: '240px',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    }
  }
});

const mapStateToProps = ({ dashboardDashboardLayout }) => {
  const { mobileOpen } = dashboardDashboardLayout;

  return { mobileOpen };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { 
    dashboardDashboardLayoutToggleNavbar
  })
)(SideBarLayout);
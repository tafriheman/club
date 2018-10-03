import React, { Component } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';


class SideBarLayout extends Component {

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
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

export default withStyles(styles)(SideBarLayout);
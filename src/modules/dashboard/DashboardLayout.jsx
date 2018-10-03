import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SideBarLayout from './SideBarLayout';
import TopNavbar from './TopNavbar';


class DashboardLayout extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TopNavbar />
        <SideBarLayout />
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});



export default withStyles(styles, { withTheme: true })(DashboardLayout);
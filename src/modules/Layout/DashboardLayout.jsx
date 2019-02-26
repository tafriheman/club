import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SideBarLayout from "./SidebarLayout";
import TopNavbar from "./TopNavbar";
import Router from "./Router";
import CustomerRouter from './CustomerRouter'
import styles from "./styles/DashboardLayout";
import Advertise from "./components/Advertise";
import PropTypes from 'prop-types'

class DashboardLayout extends React.Component {
  render() {
    const { classes, isAuthed } = this.props;
    // console.log(this.props);
    return (
      <div className={classes.root}>
        <TopNavbar />
        <SideBarLayout isAuthed />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Advertise />
            {isAuthed ?
                <Router/>
                :
                <CustomerRouter />
            }
        </main>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
    isAuthed: PropTypes.bool.isRequired
}

DashboardLayout.propTypes = {
    isAuthed: false
}

export default withStyles(styles, { withTheme: true })(DashboardLayout);

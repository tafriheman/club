import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SideBarLayout from "../SidebarLayout"
import TopNavbar from "../TopNavbar";
import ClubRouter from "./ClubRouter";
import Router from "../Router";
import styles from "../styles/DashboardLayout";
import Advertise from "../components/Advertise";

class ClubProfileLayout extends React.Component {
  render() {
    const { classes } = this.props;
    // console.log(this.props);
    return (
      <div className={classes.root} >
        <TopNavbar isClubProfile/>
        <SideBarLayout isClubProfile />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Advertise />
          <ClubRouter />
          <Router/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ClubProfileLayout);

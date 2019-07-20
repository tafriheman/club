import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SideBarLayout from "./SidebarLayout";
import TopNavbar from "./TopNavbar";
import Router from "./Router";
import styles from "./styles/DashboardLayout";
import Advertise from "./components/Advertise";
import { timeout } from "q";

class DashboardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCount: 1
    };
  }
  componentDidMount() {
    this.setState({ productCount: 2 });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TopNavbar isClubProfile={false} productCount={50} />
        <SideBarLayout isClubProfile={false} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Advertise />
          <Router />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DashboardLayout);

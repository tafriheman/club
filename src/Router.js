import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  appFetchUser,
  appFetchAdvertise,
  appFetchClubInfo
} from "./redux/actions";
import config from "./config.json";

// auth modules
import Login from "./modules/auth/Login.jsx";
import Register from "./modules/auth/Register.jsx";
import Verify from "./modules/auth/Verify.jsx";
import Label from "./modules/labels";
import CheckList from "./modules/checkList";
import Order from "./modules/order";
// dashboard layout
import DashboardLayout from "./modules/Layout/DashboardLayout.jsx";

class Router extends Component {
  componentWillMount() {
    this.props.appFetchUser();
  }

  componentWillReceiveProps(nextProps) {
    const { appFetchAdvertise, appFetchClubInfo, token, club } = nextProps;

    if (token && this.props.token === null) {
      appFetchAdvertise(token);
      appFetchClubInfo(club._id, token);
    }
  }

  render() {
    const user = JSON.parse(localStorage.getItem(config.USER_KEY));
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/verify" component={Verify} exact />
          <Route path="/register" component={Register} exact />
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <Route path="/dashboard" render={(props) => <DashboardLayout isAuthed={true}/>} />
          )}
          <Redirect path="/" to="/dashboard/product/list" exact />

          <Route path="/dashboard/labels" component={Label} exact />
          <Route path="/dashboard/checkLists" component={CheckList} exact />
          <Route path="/dashboard/order" component={Order} exact />

          {/*club routs*/}
          <Route path="/clubs/" render={(props) => <DashboardLayout isAuthed={false}/>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return { ...app };
};

export default connect(
  mapStateToProps,
  {
    appFetchUser,
    appFetchAdvertise,
    appFetchClubInfo
  }
)(Router);

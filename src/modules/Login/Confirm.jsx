import React, { Component } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { authLoginVerifyChangeProp, authLoginVerifyVerifyCodeNew } from '../../redux/actions';

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, error, code, authLoginVerifyChangeProp, authLoginVerifyVerifyCodeNew, phone, history } = this.props;

    return (
      <div className="sectin__container" style={{ display: "flex" }}
      >
        <TopNavbar isClubProfile />
        <SideBarLayout isClubProfile />
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ padding: 15, paddingTop: 130 }}
        >
          <div
            style={{
              background: "#F0F1F6",
              width: 300,
              padding: 20,
              paddingBottom: 30
            }}
          >
            <div style={{ width: "90%", margin: "auto" }}

            >
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                placeholder="کدفعالسازی را وارد کنید."
                type="number"
                style={{ background: "white" }}
                onChange={e => authLoginVerifyChangeProp('code', e.target.value)}
              />
              <Button
                style={{
                  background: "#7D0B0B",
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: 10
                }}
                onClick={() => {
                  authLoginVerifyVerifyCodeNew(phone, code, history)

                }}
              // onClick={() => this.props.history.push("/newLoginRegister")}
              >
                فعال سازی
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ authLoginVerify, CompleteInfo }) => {
  return { ...authLoginVerify, ...CompleteInfo };
}

export default compose(
  connect(mapStateToProps, {
    authLoginVerifyChangeProp,
    authLoginVerifyVerifyCodeNew
  })
)(Verify);
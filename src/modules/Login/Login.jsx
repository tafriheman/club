import React, { Component } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  authLoginVerifyChangeProp,
  authLoginVerifySendVerificationCodeNew
} from "../../redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {
      classes,
      phone,
      authLoginVerifyChangeProp,
      error,
      authLoginVerifySendVerificationCodeNew,
      history
    } = this.props;
    return (
      <div className="sectin__container" style={{ display: "flex" }}>
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
            <div style={{ width: "90%", margin: "auto" }}>
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                placeholder="شماره موبایل"
                type="number"
                style={{ background: "white" }}
                value={phone}
                onChange={e => {
                  var str = e.target.value;
                  authLoginVerifyChangeProp("phone", str.replace(/\s+/g, ""));
                }}
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


                  authLoginVerifySendVerificationCodeNew(phone, history);

                }}
              // onClick={() => this.props.history.push("/newLoginConfirm")}
              >
                ارسال کد فعال سازی
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = ({ authLoginVerify }) => {
  return { ...authLoginVerify };
};

export default compose(
  connect(
    mapStateToProps,
    {
      authLoginVerifyChangeProp,
      authLoginVerifySendVerificationCodeNew
    }
  )
)(Login);

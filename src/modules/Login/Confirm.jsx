import React, { Component } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
                placeholder="کدفعالسازی را وارد کنید."
                type="number"
                style={{ background: "white" }}
              />
              <Button
                style={{
                  background: "#7D0B0B",
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: 10
                }}
                onClick={() => this.props.history.push("/newLoginRegister")}
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

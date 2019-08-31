import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";

export default class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { map: undefined, firstLoad: true, disabled: false };
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
              width: 340,
              background: "#7D0B0B"
            }}
          >
            <p style={{ textAlign: "center", color: "white" }}>دریافت هدیه</p>
          </div>
          <div
            style={{
              background: "#F0F1F6",
              width: 340,
              paddingBottom: 10
            }}
          >
            <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  padding: 10,
                  color: "gray"
                }}
              >
                شما هدیه خود را دریافت نمودید
              </p>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
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
                متتستی یشمبت هیشست متتستی یشمبت هیشست متتستی یشمبت هیشست متتستی
                یشمبت هیشست متتستی یشمبت هیشست متتستی یشمبت هیشست را متتستی
                یشمبت هیشست
              </p>
              <img
                src="https://picsum.photos/id/504/250/400"
                style={{ width: "100%", height: 300 }}
              ></img>
              <Button
                style={{
                  background: "#7D0B0B",
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: 20,
                  height: 55,
                  width: "90%"
                }}
                onClick={() => this.props.history.push("/getRewardResid")}
              >
                دریافت هدیه
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

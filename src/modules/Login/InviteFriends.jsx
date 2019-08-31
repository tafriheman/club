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
            <p style={{ textAlign: "center", color: "white" }}>
              لطفا محل زندگی خود را انتخاب نمایید
            </p>
          </div>
          <div
            style={{
              background: "#F0F1F6",
              width: 300,
              padding: 20,
              paddingBottom: 30
            }}
          >
            <div style={{ width: "90%", margin: "auto" }}>
              <p style={{ textAlign: "center", fontSize: 14, color: "gray" }}>
                متتستی یشمبت هیشست متتستی یشمبت هیشست متتستی یشمبت هیشست متتستی
                یشمبت هیشست متتستی یشمبت هیشست متتستی یشمبت هیشست را متتستی
                یشمبت هیشست
              </p>
              <Button
                style={{
                  background: "#5BBE4A",
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: 20,
                  height: 55
                }}
                onClick={() => this.props.history.push("/inviteFriends")}
              >
                <a
                  href="whatsapp://send?text=عنوان هدیه عضویت در کلاب"
                  data-action="share/whatsapp/share"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    height: "100%",
                    width: "100%"
                  }}
                >
                  Share via Whatsapp
                </a>
              </Button>
              <Button
                style={{
                  background: "#5BBE4A",
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: 20,
                  height: 55
                }}
                onClick={() => this.props.history.push("/getReward")}
              >
                دریافت جایزه
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

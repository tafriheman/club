import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";

//MapBox
import mapboxgl from "mapbox-gl";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { setRTLTextPlugin } from "mapbox-gl";

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { completeUserInfo, completeClubMembershipp } from '../../redux/actions';
import jwtDecode from 'jwt-decode';

// config map
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoicm1zMjEiLCJhIjoiY2ptcmp0aXgzMDF0azNwbGJyMDl1emppbiJ9.abyt2atUYYbJ8k95PjjCSw"
});

// setRTLTextPlugin(
//   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.2/mapbox-gl-rtl-text.js"
// );

class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { map: undefined, firstLoad: true, disabled: false };
    this.setMap = this.setMap.bind(this);
  }
  setMap(el) {
    this.setState({ map: el });
    let locator = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.state.map.addControl(locator);

    let THIS = this;
    locator.on("geolocate", function (e) {
      THIS.state.map.setZoom(15);
      THIS.state.map.setCenter([e.coords.longitude, e.coords.latitude]);
    });

    // fire geolocate manully
    setTimeout(function () {
      let btn = document.getElementsByClassName("mapboxgl-ctrl-geolocate")[0];
      btn && btn.click();
    }, 2000);
  }

  render() {
    const {
      classes,
      full_name,
      user_id,
      day,
      month,
      year,
      mday,
      mmonth,
      myear,
      location,
      gender,
      marital_status,
      completeUserInfo, completeClubMembershipp,
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
              width: 300,
              padding: 20,
              height: 10,
              background: "#7D0B0B"
            }}
          ></div>
          <div
            style={{
              background: "#F0F1F6",
              width: 300,
              padding: 20,
              paddingBottom: 30
            }}
          >
            <div style={{ width: "90%", margin: "auto" }}>
              <p style={{ textAlign: "center" }}>
                لطفا محل زندگی خود را انتخاب نمایید
              </p>
              <Grid item xs={12} container direction="column">
                <Map
                  style="mapbox://styles/mapbox/streets-v9"
                  containerStyle={{
                    width: "100%",
                    height: 300
                  }}
                  center={[52.5837, 29.5918]}
                  zoom={[11]}
                  onStyleLoad={el => this.setMap(el)}
                ></Map>
              </Grid>
              <Button
                style={{
                  background: "#7D0B0B",
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: 20
                }}
                onClick={() => {
                  let birth_date = "";
                  let monthh = month < 10 ? "0" + month : month;
                  if (year !== 1300) {
                    birth_date = `${year}/${monthh}/${day}`;
                  }
                  let marital_date = "";
                  if (mday.length !== 0 && mmonth.length !== 0 && myear.length !== 0) {
                    let mmonthh = mmonth < 10 ? "0" + mmonth : mmonth;
                    if (myear !== 1300) {
                      marital_date = `${myear}/${mmonthh}/${mday}`;
                    }
                  }
                  let token = localStorage.getItem('user_token');
                  completeClubMembershipp(
                    full_name, birth_date, gender, marital_status,
                    user_id, location, marital_date,
                    token, history)
                }}
              >
                مرحله بعد
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = ({ CompleteInfo }) => {
  return { ...CompleteInfo };
}

export default compose(
  connect(mapStateToProps, {
    completeUserInfo,
    completeClubMembershipp
  })
)(RegisterInfo);
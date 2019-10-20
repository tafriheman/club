import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import _ from 'lodash';

//MapBox
import mapboxgl from "mapbox-gl";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { setRTLTextPlugin } from "mapbox-gl";

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { completeClubMembershipp, authRegisterChangeFormNew } from '../../redux/actions';

// config map
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibWFoc2FzaWFkYXRhbiIsImEiOiJjazF4dWRnejAwZGV6M21vNDY0OWVmbGRvIn0.LqDcbGyRh3s0VHtntRucxQ"
});

setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.1/mapbox-gl-rtl-text.js');

class RegisterInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { map: undefined, firstLoad: true, disabled: false };

    this.onMapClick = this.onMapClick.bind(this);
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
    locator.on('geolocate', function (e) {
      THIS.state.map.setZoom(15);
      THIS.state.map.setCenter([e.coords.longitude, e.coords.latitude])
    });

    // fire geolocate manully
    setTimeout(function () {
      let btn = document.getElementsByClassName('mapboxgl-ctrl-geolocate')[0];
      btn && btn.click();
    }, 2000);
  }

  onMapClick(map, e) {
    this.props.authRegisterChangeFormNew('location', e.lngLat);
  }

  renderMarker() {
    const { location } = this.props.form;
    if (!_.isEmpty(location)) {
      return (
        <Marker
          coordinates={[location.lng, location.lat]}
        >
          <img src={require('../../assets/images/auth/marker.png')} alt='marker' style={{ width: 24, height: 24 }} />
        </Marker>
      );
    }
  }

  render() {
    const {
      full_name,
      user_id,
      day,
      month,
      year,
      mday,
      mmonth,
      myear,
      gender,
      marital_status,
      completeClubMembershipp,
      form,
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
              <Grid item xs={12} container direction="column" style={{
                paddingLeft: '600px'
              }}>
                <Map
                  style="mapbox://styles/mapbox/streets-v9"
                  containerStyle={{
                    width: '100%',
                    height: '300px',
                    paddingLeft: '272px',
                    borderRadius: '10px'
                  }}
                  // center={form.location.lat ? [form.location.lng, form.location.lat] : [22.5837, 29.5918]}
                  center={form.location.lat ? [form.location.lng, form.location.lat] : [52.5837, 29.5918]}
                  zoom={form.location.lat ? [this.state.map.getZoom()] : [11]}
                  onClick={this.onMapClick}
                  onStyleLoad={el => this.setMap(el)}
                >
                  {this.renderMarker()}
                </Map>
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
                    user_id, form.location, marital_date,
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
    completeClubMembershipp,
    authRegisterChangeFormNew
  })
)(RegisterInfo);
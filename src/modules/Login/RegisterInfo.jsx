import React, { Component } from "react";
import {
  Grid, Typography, Button, TextField,
  FormControl, Select, MenuItem
} from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { completeUserInfo, completeClubMembership } from '../../redux/actions';

class RegisterInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      ezdDay: "",
      ezdMonth: "",
      ezdYear: ""
    };
    this.days = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31
    ];
  }

  renderYear() {
    var i = 0;
    let rt = [];
    for (i = 100; i > 0; i--)
      rt.push(<MenuItem value={i + 1298}>{i + 1298}</MenuItem>);

    return rt;
  }
  render() {
    const {
      classes,
      full_name,
      day,
      month,
      year,
      mday,
      mmonth,
      myear,
      completeUserInfo, completeClubMembership,
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
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                placeholder="نام و نام خانوداگی"
                type="text"
                style={{ background: "white" }}
                value={full_name}
                onChange={(event) => { completeUserInfo('full_name', event.target.value) }}
              />
              <Grid container xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    position: "inline-block",
                    fontSize: 14,
                    paddingTop: 20,
                    paddingLeft: 10,
                    color: "green"
                  }}
                >
                  تاریخ تولد
                </Typography>
                <FormControl>
                  <Select
                    style={{
                      paddingTop: 10,
                      paddingBottom: 5
                    }}
                    value={this.state.birthDay}
                    onChange={e => this.setState({ birthDay: e.target.value })}
                    displayEmpty
                    variant="outlined"
                    value={day}
                    onChange={(event) => { completeUserInfo('day', event.target.value) }}
                  >
                    <MenuItem value="" disabled>
                      روز
                    </MenuItem>
                    {this.days.map((item, i) => {
                      return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl style={{ marginRight: 10 }}>
                  <Select
                    style={{
                      paddingTop: 10,
                      paddingBottom: 5
                    }}
                    value={month}
                    onChange={(event) => { completeUserInfo('month', event.target.value) }}
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      ماه
                    </MenuItem>
                    {this.days.map((item, i) => {
                      if (i < 12)
                        return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                      else return null;
                    })}
                  </Select>
                </FormControl>
                <FormControl style={{ marginRight: 10 }}>
                  <Select
                    style={{
                      paddingTop: 10,
                      paddingBottom: 5
                    }}
                    value={this.state.birthYear}
                    onChange={e => this.setState({ birthYear: e.target.value })}
                    displayEmpty
                    variant="outlined"
                    value={year}
                    onChange={(event) => { completeUserInfo('year', event.target.value) }}
                  >
                    <MenuItem value="" disabled>
                      سال
                    </MenuItem>
                    {this.renderYear()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid container xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    position: "inline-block",
                    fontSize: 14,
                    paddingTop: 20,
                    paddingLeft: 10,
                    color: "green"
                  }}
                >
                  جنسیت
                </Typography>
                <div style={{ marginTop: 20 }}>

                  <input
                    name="gender"
                    type="radio"
                    style={{ marginLeft: 10, marginRight: 10 }}
                    value='female'
                    onChange={(event) => { completeUserInfo('gender', event.target.value) }}
                  ></input>
                  زن
                  <input
                    name="gender"
                    type="radio"
                    style={{ marginLeft: 10, marginRight: 10 }}
                    value='male'
                    onChange={(event) => { completeUserInfo('gender', event.target.value) }}
                  ></input>
                  مرد

                </div>
              </Grid>

              <Grid container xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    position: "inline-block",
                    fontSize: 14,
                    paddingTop: 20,
                    paddingLeft: 10,
                    color: "green"
                  }}
                >
                  وضعیت تاهل
                </Typography>
                <div style={{ marginTop: 20 }}>
                  <input
                    name="gender"
                    type="radio"
                    style={{ marginLeft: 10, marginRight: 10 }}
                    value='married'
                    onChange={(event) => { completeUserInfo('marital_status', event.target.value) }}
                  ></input>
                  متاهل
                  <input
                    name="gender"
                    type="radio"
                    style={{ marginLeft: 10, marginRight: 10 }}
                    value='single'
                    onChange={(event) => { completeUserInfo('marital_status', event.target.value) }}
                  ></input>
                  مجرد
                </div>
              </Grid>
              <Grid container xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    position: "inline-block",
                    fontSize: 14,
                    paddingTop: 20,
                    paddingLeft: 10,
                    color: "green"
                  }}
                >
                  تاریخ ازدواج
                </Typography>
                <FormControl>
                  <Select
                    style={{
                      paddingTop: 10,
                      paddingBottom: 5
                    }}
                    value={mday}
                    onChange={(event) => { completeUserInfo('mday', event.target.value) }}
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      روز
                    </MenuItem>
                    {this.days.map((item, i) => {
                      return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl style={{ marginRight: 10 }}>
                  <Select
                    style={{
                      paddingTop: 10,
                      paddingBottom: 5
                    }}
                    value={mmonth}
                    onChange={(event) => { completeUserInfo('mmonth', event.target.value) }}
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      ماه
                    </MenuItem>
                    {this.days.map((item, i) => {
                      if (i < 12)
                        return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                      else return null;
                    })}
                  </Select>
                </FormControl>
                <FormControl style={{ marginRight: 10 }}>
                  <Select
                    style={{
                      paddingTop: 10,
                      paddingBottom: 5
                    }}
                    value={myear}
                    onChange={(event) => { completeUserInfo('myear', event.target.value) }}
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      سال
                    </MenuItem>
                    {this.renderYear()}
                  </Select>
                </FormControl>
              </Grid>
              <Button
                style={{
                  background: "#7D0B0B",
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: 20
                }}
                onClick={() => this.props.history.push("/newLoginLocation")}
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
    completeClubMembership
  })
)(RegisterInfo);
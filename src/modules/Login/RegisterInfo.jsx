import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";

export default class RegisterInfo extends Component {
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
                    value={this.state.birthMonth}
                    onChange={e =>
                      this.setState({ birthMonth: e.target.value })
                    }
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
                  ></input>
                  زن
                  <input
                    name="gender"
                    type="radio"
                    style={{ marginLeft: 10, marginRight: 10 }}
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
                  ></input>
                  متاهل
                  <input
                    name="gender"
                    type="radio"
                    style={{ marginLeft: 10, marginRight: 10 }}
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
                    value={this.state.ezdDay}
                    onChange={e => this.setState({ ezdDay: e.target.value })}
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
                    value={this.state.ezdMonth}
                    onChange={e => this.setState({ ezdMonth: e.target.value })}
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
                    value={this.state.ezdYear}
                    onChange={e => this.setState({ ezdYear: e.target.value })}
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

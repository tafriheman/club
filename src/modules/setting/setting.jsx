import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  withStyles,
  CardActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tabs,
  Tab,
  Checkbox
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import "./setting.css";
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      description: "",
      website: "",
      point: 0,
      pointReg: 0,
      timeCredit: 0,
      sms: false
    };
  }
  handleInput = e => {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };
  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4">تنظیمات</Typography>
        <Grid item container xs={12} sm={12} md={6}>
          <Card style={{ width: "100%", padding: 30 }}>
            <Grid item container direction="row" xs={12} sm={12} md={6}>
              <Typography variant="h6">آدرس پست الکترونیکی:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                name="email"
                value={this.state.email}
                placeholder="test@yahoo.com"
                style={{ direction: "rtl" }}
                onChange={this.handleInput}
              />
              <Typography variant="h6"> توضیحات :</Typography>
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                name="description"
                value={this.state.description}
                placeholder="توضیح ..."
                multiline
                style={{ direction: "rtl", overflow: "hidden" }}
                onChange={this.handleInput}
              />
              <Typography variant="h6"> آدرس وب سایت :</Typography>
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                name="website"
                value={this.state.website}
                placeholder="www.test.com"
                style={{ direction: "rtl", marginBottom: 10 }}
                onChange={this.handleInput}
              />
              <Grid container spacing={3}>
                <Typography variant="h6" style={{ minWidth: 210 }}>
                  امتیاز دعوت از دوستان: {"  " + this.state.point}
                </Typography>
                <Grid>
                  <IconButton
                    style={{ padding: 0, marginRight: 53 }}
                    aria-owns={"simple-menu"}
                    onClick={() =>
                      this.setState({ point: this.state.point + 1 })
                    }
                  >
                    <Button>
                      <AddCircleIcon
                        style={{ fontSize: 28, color: "#0073c4" }}
                      />
                    </Button>
                  </IconButton>
                  <IconButton
                    style={{ padding: 0 }}
                    aria-owns={"simple-menu"}
                    disabled={this.state.point < 1}
                    onClick={() =>
                      this.setState({
                        point:
                          this.state.point > 0
                            ? this.state.point - 1
                            : this.state.point
                      })
                    }
                  >
                    <Button style={{ fontSize: 16 }}>
                      <RemoveCircleIcon
                        style={{ fontSize: 28, color: "#0073c4" }}
                      />
                    </Button>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Typography variant="h6" style={{ minWidth: 210 }}>
                  امتیاز عضویت: {"  " + this.state.pointReg}
                </Typography>
                <Grid>
                  <IconButton
                    style={{ padding: 0, marginRight: 53 }}
                    aria-owns={"simple-menu"}
                    onClick={() =>
                      this.setState({ pointReg: this.state.pointReg + 1 })
                    }
                  >
                    <Button>
                      <AddCircleIcon
                        style={{ fontSize: 28, color: "#0073c4" }}
                      />
                    </Button>
                  </IconButton>
                  <IconButton
                    style={{ padding: 0 }}
                    aria-owns={"simple-menu"}
                    disabled={this.state.pointReg < 1}
                    onClick={() =>
                      this.setState({
                        pointReg:
                          this.state.pointReg > 0
                            ? this.state.pointReg - 1
                            : this.state.pointReg
                      })
                    }
                  >
                    <Button style={{ fontSize: 16 }}>
                      <RemoveCircleIcon
                        style={{ fontSize: 28, color: "#0073c4" }}
                      />
                    </Button>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Typography variant="h6" style={{ minWidth: 210 }}>
                  مدت زمان اعتبار: {"  " + this.state.timeCredit}
                </Typography>
                <Grid>
                  <IconButton
                    style={{ padding: 0, marginRight: 53 }}
                    aria-owns={"simple-menu"}
                    onClick={() =>
                      this.setState({ timeCredit: this.state.timeCredit + 1 })
                    }
                  >
                    <Button>
                      <AddCircleIcon
                        style={{ fontSize: 28, color: "#0073c4" }}
                      />
                    </Button>
                  </IconButton>
                  <IconButton
                    style={{ padding: 0 }}
                    aria-owns={"simple-menu"}
                    disabled={this.state.timeCredit < 1}
                    onClick={() =>
                      this.setState({
                        timeCredit:
                          this.state.timeCredit > 0
                            ? this.state.timeCredit - 1
                            : this.state.timeCredit
                      })
                    }
                  >
                    <Button style={{ fontSize: 16 }}>
                      <RemoveCircleIcon
                        style={{ fontSize: 28, color: "#0073c4" }}
                      />
                    </Button>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.sms}
                  onChange={() => {
                    this.setState({ sms: !this.state.sms });
                  }}
                  value="checkedA"
                  inputProps={{
                    "aria-label": "secondary  checkbox"
                  }}
                />
              }
              label=" پیامک دریافت سفارش فعال باشد."
              labelPlacement="right"
            />
            <Grid style={{ textAlign: "center", margin: 10 }}>
              <Button
                style={{ width: "80%" }}
                variant="contained"
                color="suceess"
              >
                ثبت نام
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
export default Setting;

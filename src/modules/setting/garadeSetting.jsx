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
import "./gradeSetting.css";
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [
        {
          title: "طلایی",
          point: 0,
          discount: 0
        },
        {
          title: "نقره ای",
          point: 0,
          discount: 0
        },
        {
          title: "طلایی",
          point: 0,
          discount: 0
        }
      ]
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
        <Typography variant="h4">رتبه بندی مشتریان</Typography>
        <Grid item container xs={12} sm={12} md={4} alignItems="center">
          <Card style={{ width: "100%", padding: 30 }}>
            {this.state.customers.map((item, i) => {
              return (
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    border: "1px solid #eaeaea",
                    padding: 15,
                    margin: 10
                  }}
                >
                  <Grid container>
                    <Typography style={{ minWidth: 210 }} variant="h6">
                      عنوان مشتری:
                    </Typography>

                    <div className="typeCustomer">{item.title}</div>
                  </Grid>
                  <Grid container>
                    <Typography variant="h6" style={{ minWidth: 210 }}>
                      حداقل تعداد امتیازات:{" "}
                      {"  " + this.state.customers[i].point}
                    </Typography>
                    <Grid>
                      <IconButton
                        style={{ padding: 0, marginRight: 53 }}
                        aria-owns={"simple-menu"}
                        onClick={() => {
                          const prvCustomer = this.state.customers;
                          prvCustomer[i].point = prvCustomer[i].point + 1;
                          this.setState({ customers: prvCustomer });
                        }}
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
                        disabled={this.state.customers[i].point < 1}
                        onClick={() => {
                          const prvCustomer = this.state.customers;
                          prvCustomer[i].point = prvCustomer[i].point - 1;
                          this.setState({ customers: prvCustomer });
                        }}
                      >
                        <Button style={{ fontSize: 16 }}>
                          <RemoveCircleIcon
                            style={{ fontSize: 28, color: "#0073c4" }}
                          />
                        </Button>
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Typography variant="h6" style={{ minWidth: 210 }}>
                      درصد تخفیف : {"  " + this.state.customers[i].discount}
                    </Typography>
                    <Grid>
                      <IconButton
                        style={{ padding: 0, marginRight: 53 }}
                        aria-owns={"simple-menu"}
                        onClick={() => {
                          const prvCustomer = this.state.customers;
                          prvCustomer[i].discount = prvCustomer[i].discount + 1;
                          this.setState({ customers: prvCustomer });
                        }}
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
                        disabled={this.state.customers[i].discount < 1}
                        onClick={() => {
                          const prvCustomer = this.state.customers;
                          prvCustomer[i].discount = prvCustomer[i].discount - 1;
                          this.setState({ customers: prvCustomer });
                        }}
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
              );
            })}
            <Grid style={{ textAlign: "center" }}>
              <IconButton style={{ padding: 0 }} aria-owns={"simple-menu"}>
                <Button>
                  <AddCircleIcon style={{ fontSize: 28, color: "green" }} />
                </Button>
              </IconButton>
            </Grid>
            <Grid style={{ textAlign: "center", margin: 10 }}>
              <Button
                style={{ width: "80%" }}
                variant="contained"
                color="secondary"
              >
                ثبت تنظیمات
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
export default Setting;

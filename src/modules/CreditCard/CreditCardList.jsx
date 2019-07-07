import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

class CreditCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      cartType: ""
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Grid container direction="column" alignItems="right">
        <Typography variant="h4">لیست کارت های اعتباری</Typography>
        <Grid item container xs={12} sm={12} md={6}>
          <Card style={{ marginBottom: 10, width: "100%" }}>
            <div variant="h6" style={{ margin: 10, display: "inline-block" }}>
              جستجو بر اساس نام کلاب
            </div>
            <input
              style={{
                width: "80%",
                height: 25,
                overflow: "hidden",
                borderRadius: 10,
                padding: 5,
                margin: 10
              }}
            />
            <Button variant="contained" color="primary">
              جست و جو
            </Button>
          </Card>
        </Grid>
        <Grid
          item
          container
          style={{ marginBottom: 10 }}
          xs={12}
          sm={12}
          md={6}
        >
          <Card
            style={{
              width: "100%",
              alignItems: "center",
              overflow: "auto",
              display: "flex"
            }}
          >
            <p
              variant="h6"
              style={{ margin: 8, display: "inline-block", minWidth: 40 }}
            >
              لیست
            </p>
            <p
              variant="h6"
              style={{ margin: 8, display: "inline-block", minWidth: 90 }}
            >
              کارت های آزاد
            </p>
            <p
              variant="h6"
              style={{ margin: 8, display: "inline-block", minWidth: 90 }}
            >
              منقضی شده
            </p>
            <p
              variant="h6"
              style={{ margin: 8, display: "inline-block", minWidth: 90 }}
            >
              خریداری شده
            </p>
            <p
              variant="h6"
              style={{ margin: 8, display: "inline-block", minWidth: 90 }}
            >
              دریافت شده با امتیاز
            </p>
          </Card>
        </Grid>

        <Grid item container style={{ marginTop: "20px" }} direction="row">
          <Grid item container xs={6} sm={6} md={2}>
            <Card style={{ margin: 5, width: "100%" }}>
              <CardContent>
                <p>قیمت: 3000</p>
                <p>اعتبار هدیه: 50000 تومان</p>
                <p>امتیاز: 100 امتیاز</p>
                <Button size="medium" style={{ display: "block" }}>
                  لیست محصولات
                </Button>
                <Button size="medium" style={{ display: "block" }}>
                  دسته بندی
                </Button>
                <p>وضیعت کد: هدیه داده شده</p>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button size="medium">نمایش کد اعتبار</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item container xs={6} sm={6} md={2}>
            <Card style={{ margin: 5, width: "100%" }}>
              <CardContent>
                <p>قیمت: 3000</p>
                <p>اعتبار هدیه: 50000 تومان</p>
                <p>امتیاز: 100 امتیاز</p>
                <Button size="medium" style={{ display: "block" }}>
                  لیست محصولات
                </Button>
                <Button size="medium" style={{ display: "block" }}>
                  دسته بندی
                </Button>
                <p>وضیعت کد: هدیه داده شده</p>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button size="medium">نمایش کد اعتبار</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item container xs={6} sm={6} md={2}>
            <Card style={{ margin: 5, width: "100%" }}>
              <CardContent>
                <p>قیمت: 3000</p>
                <p>اعتبار هدیه: 50000 تومان</p>
                <p>امتیاز: 100 امتیاز</p>
                <Button size="medium" style={{ display: "block" }}>
                  لیست محصولات
                </Button>
                <Button size="medium" style={{ display: "block" }}>
                  دسته بندی
                </Button>
                <p>وضیعت کد: هدیه داده شده</p>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button size="medium">نمایش کد اعتبار</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item container xs={6} sm={6} md={2}>
            <Card style={{ margin: 5, width: "100%" }}>
              <CardContent>
                <p>قیمت: 3000</p>
                <p>اعتبار هدیه: 50000 تومان</p>
                <p>امتیاز: 100 امتیاز</p>
                <Button size="medium" style={{ display: "block" }}>
                  لیست محصولات
                </Button>
                <Button size="medium" style={{ display: "block" }}>
                  دسته بندی
                </Button>
                <p>وضیعت کد: هدیه داده شده</p>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button size="medium">نمایش کد اعتبار</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default CreditCardList;

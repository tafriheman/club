import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Link,
  IconButton
} from "@material-ui/core";
import { GetCustomerMessageList } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Carousel } from "react-responsive-carousel";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import jwtDecode from "jwt-decode";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";

import People from "@material-ui/icons/People";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 200
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});
class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          description:
            "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چ",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "231"
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "231"
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "231"
        }
      ],
      productList: [
        { title: "شف برگر", price: 33000, photo: "" },
        { title: "چیز برگر", price: 33000, photo: "" },
        { title: " پیتزا", price: 33000, photo: "" },
        { title: "هات داگ ", price: 33000, photo: "" }
      ],
      openProduct: false,
      openBuy: false,
      time: Date.now(),
      choosedTedad: 0
    };
  }
  componentWillMount() {
    const { GetCustomerMessageList } = this.props;

    if (localStorage.getItem("user_token")) {
      var decoded = jwtDecode(localStorage.getItem("user_token"));
      GetCustomerMessageList(
        decoded.user._id,
        1,
        8,
        localStorage.getItem("user_token")
      );
    }
  }
  componentDidMount() {
    setInterval(this.setTime, 1000);
  }

  add = async item => {
    await this.setState({
      [item]: this.state[item] + 1
    });
  };

  subtract = async item => {
    await this.setState({
      [item]: this.state[item] - 1
    });
  };
  setTime = () => {
    this.setState({ time: Date.now() });
  };
  showDetails = i => {
    const prveState = [...this.state.eventList];
    prveState[i].show = !prveState[i].show;
    this.setState({ eventList: prveState });
  };

  render() {
    if (!localStorage.getItem("user_token")) {
      return (
        <div className="sectin__container" style={{ display: "flex" }}>
          <TopNavbar isClubProfile isOpenLogin title={"لطفا وارد شوید"} />
          <SideBarLayout isClubProfile />
          <div className="_error_login">
            لطفابرای مشاهده لیست پیام ها <Link to="/">لاگین</Link> کنید
          </div>
        </div>
      );
    }
    return (
      <div className="sectin__container" style={{ display: "flex" }}>
        <TopNavbar isClubProfile />
        <SideBarLayout isClubProfile />
        <Grid
          container
          direction="row"
          alignItems="right"
          style={{ padding: 15, paddingTop: 130 }}
        >
          <Grid>
            <Typography variant="h4">رویدادها</Typography>
          </Grid>
          <Grid item container xs={12} sm={12} md={12}>
            {this.state.eventList.map((item, i) => {
              const timer = new Date(1562803478437 - this.state.time);
              return (
                <Grid xs={12}>
                  <Card
                    style={{
                      textAlign: "center",
                      position: "relative",
                      margin: 5,
                      padding: 0
                    }}
                    onClick={() => this.showDetails(i)}
                  >
                    <CardContent style={{ padding: 0 }}>
                      <Grid container>
                        <Grid
                          item
                          xs={3}
                          style={{ background: "#7D0B0B", color: "white" }}
                        >
                          <h2 style={{ marginBottom: 0, marginTop: 30 }}>06</h2>
                          <h2 style={{ marginTop: 0 }}>شهریور</h2>
                        </Grid>
                        <Grid item xs={3} style={{ background: "blue" }}>
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={item.photo}
                          />
                        </Grid>
                        <Grid item xs={6} style={{ padding: 10 }}>
                          <p
                            style={{
                              fontWeight: "bold",
                              marginTop: 0,
                              fontSize: 17,
                              marginBottom: 0
                            }}
                          >
                            {item.title}
                          </p>
                          <p style={{ textAlign: "right", fontSize: 13 }}>
                            {item.address}
                          </p>
                          <div
                            style={{
                              textAlign: "right",
                              fontSize: 12,
                              width: "50%",
                              display: "inline-block"
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                position: "relative"
                              }}
                            >
                              <People
                                style={{
                                  right: 2,
                                  top: 5,
                                  position: "relative"
                                }}
                              />

                              <div
                                style={{ display: "inline", paddingRight: 7 }}
                              >
                                {item.capacity} نفر
                              </div>
                            </p>
                            <p
                              style={{
                                margin: 0
                              }}
                            >
                              {item.score + "+"} امتیاز
                            </p>
                          </div>
                          <div
                            style={{
                              textAlign: "left",
                              fontSize: 13,
                              width: "49%",
                              display: "inline-block"
                            }}
                          >
                            <p
                              style={{
                                margin: 0
                              }}
                            >
                              {item.price} تومان
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {item.show && (
                    <Grid xs={12} style={{ padding: 5 }}>
                      <p> {item.description}</p>
                      <Grid item xs={12} style={{ position: "relative" }}>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={item.photo}
                        ></img>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 20,
                            right: 20,
                            textAlign: "center"
                          }}
                        >
                          <Button
                            style={{
                              width: 180,
                              textAlign: "left"
                            }}
                            variant="contained"
                            color="primary"
                          >
                            <span
                              style={{
                                right: 10,
                                top: 8,
                                position: "absolute"
                              }}
                            >
                              {this.state.choosedTedad}
                            </span>
                            <People
                              style={{
                                right: 28,
                                top: 6,
                                position: "absolute"
                              }}
                            />
                            رزرو کنید
                          </Button>
                          <div
                            style={{
                              background: "white"
                            }}
                          >
                            <IconButton
                              style={{ padding: 0 }}
                              aria-owns={"simple-menu"}
                              onClick={() => this.add("choosedTedad")}
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
                              disabled={this.state.choosedTedad < 1}
                              onClick={() => this.subtract("choosedTedad")}
                            >
                              <Button style={{ fontSize: 16 }}>
                                <RemoveCircleIcon
                                  style={{ fontSize: 28, color: "#0073c4" }}
                                />
                              </Button>
                            </IconButton>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              );
            })}
          </Grid>
          <Dialog
            open={this.state.openBuy}
            onClose={() => {
              this.setState({
                openBuy: false
              });
            }}
            maxWidth="sm"
          >
            <DialogTitle>
              25.000 تومان اعتبار هدیه با پرداخت 10.000 تومان یا 50 امتیاز
            </DialogTitle>
            <DialogContent>
              <Grid container direction="row" alignItems="center">
                <p style={{ width: "100%", margin: 5 }}>
                  میزان اعتباری کیف پول شما: 50000 تومان{" "}
                </p>
                <p style={{ width: "100%", margin: 5 }}>
                  تعداد امتیازات شما :50 امتیاز
                </p>
                <p style={{ width: "100%", margin: 5, fontWeight: "bold" }}>
                  هر کارت اعتباری فقط در 1 سفارش قابل قبول می باشد.
                </p>
                <p style={{ width: "100%", margin: 5 }}>
                  اعتبار شما برای دریافت این کارت اعتباری کافی نیست
                </p>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {}}
                style={{
                  background: "green",
                  color: "white",
                  margin: "auto",
                  minWidth: 150,
                  fontSize: 16
                }}
              >
                دریافت اعتبار
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.openProduct}
            onClose={() => {
              this.setState({
                openProduct: false
              });
            }}
            maxWidth="md"
          >
            <DialogTitle>
              محصولاتی که با این کارت اعتباری می توانید خرید کنید .
            </DialogTitle>
            <DialogContent>
              <Grid container direction="row" alignItems="center">
                {this.state.productList.map((item, i) => {
                  return (
                    <div style={{ width: "20%", minWidth: 200 }}>
                      <Card style={{ margin: 5 }}>
                        <div>
                          <img src="https://picsum.photos/id/500/200/150" />
                        </div>
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{
                              display: "inline-block",
                              float: "right",
                              marginBottom: 5
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{
                              display: "inline-block",
                              float: "left",
                              background: "#eaeaea",
                              marginBottom: 5
                            }}
                          >
                            {item.price} تومان
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  this.setState({
                    openProduct: false
                  });
                }}
                color="secondary"
              >
                خروج
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, { app }) => {
  const {
    userMessage,
    fetchingUserMessages,
    totalUSerMessages,
    pageSize
  } = state.message;
  return {
    userMessage,
    fetchingUserMessages,
    totalUSerMessages,
    pageSize,
    ...app
  };
};

export default withRouter(
  compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      {
        GetCustomerMessageList
      }
    )
  )(EventList)
);

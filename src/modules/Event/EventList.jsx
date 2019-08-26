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
            "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا  چ",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "231",
          reserve: 0
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "231",
          reserve: 0
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "231",
          reserve: 0
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "231",
          reserve: 0
        }
      ],
      show: -1,
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
    clearInterval(this.timeInterval);
  }
  componentDidMount() {
    this.timeInterval = setInterval(this.setTime, 1000);
  }

  add = async i => {
    const eventList = [...this.state.eventList];
    eventList[i].reserve = eventList[i].reserve + 1;
    await this.setState({ eventList });
  };

  subtract = async i => {
    const eventList = [...this.state.eventList];
    eventList[i].reserve = eventList[i].reserve - 1;
    await this.setState({ eventList });
  };
  setTime = () => {
    this.setState({ time: Date.now() });
  };
  showDetails = i => {
    const { show } = this.state;
    if (show == i) i = -1;
    this.setState({ show: i });
  };

  render() {
    const { show } = this.state;
    const timer = new Date(1562803478437 - this.state.time);
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
          <Grid xs={12} md={12} sm={12}>
            <Typography variant="h4">رویدادها</Typography>
          </Grid>
          <Grid item container xs={12} sm={12} md={6}>
            {this.state.eventList.map((item, i) => {
              return (
                <React.Fragment>
                  <Grid container xs={12}>
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
                            <h2 style={{ marginBottom: 0, marginTop: 30 }}>
                              06
                            </h2>
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
                  </Grid>
                  {show == i && window.innerWidth < 960 && (
                    <Grid xs={12} md={6}>
                      <Grid style={{ padding: 5 }}>
                        <p> {item.description}</p>
                        <Grid item xs={12} style={{ position: "relative" }}>
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={item.photo}
                          ></img>
                        </Grid>
                        <Grid item xs={12} style={{ position: "relative" }}>
                          <div
                            style={{
                              bottom: 20,
                              right: 20,
                              textAlign: "center"
                            }}
                          >
                            <Button
                              style={{
                                width: "100%",
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
                                {item.reserve}
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
                                onClick={() => this.add(i)}
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
                                disabled={item.reserve < 1}
                                onClick={() => this.subtract(i)}
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
                    </Grid>
                  )}
                </React.Fragment>
              );
            })}
          </Grid>

          {window.innerWidth >= 960 && show > -1 && (
            <Grid container item md={6} style={{ padding: 7 }}>
              <Grid container style={{ background: "lightblue" }}>
                <Grid item md={4}>
                  <div style={{ width: "90%", margin: "auto", marginTop: 10 }}>
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop={true}
                    >
                      <div>
                        <img src="https://picsum.photos/id/504/400/1000" />
                      </div>
                      <div>
                        <img src="https://picsum.photos/id/501/400/1000" />
                      </div>
                      <div>
                        <img src="https://picsum.photos/id/500/400/1000" />
                      </div>
                    </Carousel>
                  </div>
                </Grid>
                <Grid item md={8} style={{ paddingTop: 10 }}>
                  <p style={{ margin: 0 }}>
                    {this.state.eventList[show].title}
                  </p>
                  <p style={{ margin: 0 }}>
                    {this.state.eventList[show].description}{" "}
                  </p>
                  <div
                    style={{
                      width: "90%",
                      height: 70,
                      border: "1px solid black",
                      borderRadius: 15,
                      margin: "auto",
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >
                    <p
                      id="seconds"
                      style={{
                        fontWeight: "bold",
                        margin: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        height: "70%",
                        lineHeight: "65px",
                        paddingRight: 10,
                        paddingLeft: 10,
                        fontSize: 24
                      }}
                    >
                      <div
                        style={{
                          minWidth: 35,
                          textAlign: "center"
                        }}
                      >
                        {timer.getSeconds()}
                      </div>
                      <div>:</div>
                      <div style={{ minWidth: 35, textAlign: "center" }}>
                        {timer.getMinutes()}
                      </div>
                      <div>:</div>
                      <div style={{ minWidth: 35, textAlign: "center" }}>
                        {timer.getHours()}
                      </div>
                      <div>:</div>
                      <div style={{ minWidth: 35, textAlign: "center" }}>
                        {timer.getDay()}
                      </div>
                    </p>
                    <p
                      id="seconds2"
                      style={{
                        fontWeight: "bold",
                        margin: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        height: "30%",
                        lineHeight: "21px",
                        paddingRight: 10,
                        paddingLeft: 10,
                        fontSize: 11
                      }}
                    >
                      <div
                        style={{
                          minWidth: 35,
                          textAlign: "center"
                        }}
                      >
                        ثانیه
                      </div>
                      <div></div>
                      <div style={{ minWidth: 35, textAlign: "center" }}>
                        دقیقه
                      </div>
                      <div></div>
                      <div style={{ minWidth: 35, textAlign: "center" }}>
                        ساعت
                      </div>
                      <div></div>
                      <div style={{ minWidth: 35, textAlign: "center" }}>
                        روز
                      </div>
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    position: "relative",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <div
                    style={{
                      bottom: 20,
                      right: 20,
                      textAlign: "center"
                    }}
                  >
                    <Button
                      style={{
                        width: "100%",
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
                        {this.state.eventList[show].reserve}
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
                        onClick={() => this.add(show)}
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
                        disabled={this.state.eventList[show].reserve < 1}
                        onClick={() => this.subtract(show)}
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
            </Grid>
          )}
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

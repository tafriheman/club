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
import Cart from "@material-ui/icons/AddShoppingCart";

import LeftArrow from "@material-ui/icons/ArrowBackIos";
import RightArrow from "@material-ui/icons/ArrowForwardIos";
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
class ClubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          title: "صبحانه"
        },
        {
          title: "نهار"
        },
        {
          title: "کیک"
        },
        {
          title: "صبحانه"
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
      choosedTedad: 0,
      countShop: 0
    };
  }
  componentWillMount() { }

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

  renderProducts = Top => {
    return (
      <React.Fragment>
        <Grid
          container
          item
          xs={12}
          style={{ background: "#8F3B3B", display: "flex" }}
        >
          <Grid item xs={6} style={{ padding: 10, textAlign: "right" }}>
            <div
              style={{
                textAlign: "right",
                position: "relative",
                paddingTop: 10,
                color: "white"
              }}
            >
              <RightArrow
                style={{
                  fontSize: 23,
                  color: "white",
                  height: "100%"
                }}
              ></RightArrow>
              <p
                style={{
                  position: "relative",
                  display: "inline-block",
                  top: -5,
                  margin: 0
                }}
              >
                صبحانه
              </p>
            </div>
          </Grid>

          {/* <Grid item xs={6} style={{ padding: 10, textAlign: "left" }}>
            <div
              style={{
                textAlign: "left",
                position: "relative",
                paddingTop: 10,
                color: "white"
              }}
            >
              2
              <Cart style={{ fontSize: 23, color: "white" }} />
            </div>
          </Grid> */}
        </Grid>
        {Top && (
          <Grid
            item
            xs={12}
            style={{
              background: "#F0F1F6"
            }}
          >
            <img
              style={{
                width: "100%",
                borderRadius: 5
              }}
              src="https://olo-images-live.imgix.net/3e/3efa561f24d544138a192d152172d19c.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=1b596f20f0174a5997fac16e64e673b7"
            />
          </Grid>
        )}
        {this.state.products.map((item, i) => {
          return (
            <Grid
              container
              item
              xs={12}
              style={{
                background: "#F0F1F6",
                height: 100,
                borderBottom: "1px solid #CECFD3",
                paddingTop: 10
              }}
            >
              <Grid container xs={12}>
                <Grid item xs={4} style={{ padding: 5 }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 5
                    }}
                    src="https://picsum.photos/id/504/1000/400"
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: 10 }}>
                  <p
                    style={{
                      marginTop: 0,
                      fontSize: 25,
                      marginBottom: 0,
                      color: "#8F3B3B"
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      marginTop: 0,
                      fontSize: 17,
                      marginBottom: 0,
                      color: "#707070"
                    }}
                  >
                    {item.price} تومان
                  </p>
                </Grid>
                <Grid item xs={2} style={{ padding: 10 }}>
                  <LeftArrow
                    style={{
                      position: "relative",
                      top: 5,
                      height: "100%",
                      fontSize: 40,
                      color: "#707070"
                    }}
                  ></LeftArrow>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  };
  renderCategories = () => {
    return (
      <Grid item container xs={12}>
        {this.state.categories.map((item, i) => {
          return (
            <React.Fragment>
              <Grid container xs={12}>
                <Card
                  style={{
                    textAlign: "right",
                    position: "relative",
                    padding: 0,
                    width: "100%",
                    background: "#F0F1F6",
                    color: "#8F3B3B",
                    boxShadow: "none",
                    borderRadius: 0,
                    borderBottom: "1px solid #CECFD1"
                  }}
                >
                  <CardContent
                    style={{
                      padding: 0,
                      // top: "calc(50% - 30px)",
                      position: "relative"
                    }}
                  >
                    <Grid container xs={12}>
                      <Grid item xs={4} style={{ padding: 5 }}>
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 5
                          }}
                          src="https://picsum.photos/id/504/1000/400"
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
                      </Grid>
                      <Grid item xs={2} style={{ padding: 10 }}>
                        <LeftArrow
                          style={{ position: "relative", top: 5, }}
                        ></LeftArrow>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    );
  };
  renderProducts2 = () => {
    return (
      <React.Fragment>
        <Grid
          container
          item
          xs={12}
          style={{ background: "#8F3B3B", display: "flex" }}
        >
          <Grid item xs={4} style={{ padding: 10, textAlign: "right" }}>
            <div
              style={{
                textAlign: "right",
                position: "relative",
                paddingTop: 10,
                color: "white"
              }}
            >
              <RightArrow
                style={{
                  fontSize: 23,
                  color: "white",
                  height: "100%"
                }}
              ></RightArrow>
              <p
                style={{
                  position: "relative",
                  display: "inline-block",
                  top: -5,
                  margin: 0
                }}
              >
                املت فرانسوی
              </p>
            </div>
          </Grid>

          {/* <Grid item xs={6} style={{ padding: 10, textAlign: "left" }}>
            <div
              style={{
                textAlign: "left",
                position: "relative",
                paddingTop: 10,
                color: "white"
              }}
            >
              2
              <Cart style={{ fontSize: 23, color: "white" }} />
            </div>
          </Grid> */}
        </Grid>
        <Grid container xs={12}>
          <Card
            style={{
              textAlign: "center",
              position: "relative",
              margin: 5,
              padding: 0,
              width: "100%"
            }}
          >
            <CardContent style={{ padding: 0 }}>
              <Grid container xs={12}>
                <Grid item xs={4} style={{ background: "blue" }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src="https://olo-images-live.imgix.net/7e/7e3817e4faeb4f178b7ff0425435f736.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=ba57c8d28456153303b876e68ba38ebd"
                  />
                </Grid>
                <Grid item xs={7} style={{ padding: 10 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginTop: 0,
                      fontSize: 17,
                      marginBottom: 0,
                      textAlign: "right",
                      color: "rgb(143, 59, 59)"
                    }}
                  >
                    املت فرانسوی
                  </p>
                  <p
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      margin: 0
                    }}
                  >
                    29,000
                  </p>
                  <p
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      margin: 0
                    }}
                  >
                    تخم مرغ - کره - مربا
                  </p>
                  <div style={{ width: "100%", textAlign: "left" }}>
                    <div
                      style={{
                        left: 0,
                        display: "inline-block",
                        width: 110,
                        padding: 10
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          backgroundColor: "rgb(143, 59, 59)",
                          color: "white",
                          textAlign: "center",
                          display: "inline-block",
                          borderTop: "1px solid gray",
                          borderBottom: "1px solid gray"
                        }}
                        onClick={() => {
                          this.setState({
                            countShop: this.state.countShop + 1
                          });
                        }}
                      >
                        +
                      </div>
                      <div
                        style={{
                          width: 35,
                          backgroundColor: "white",
                          color: "black",
                          textAlign: "center",
                          display: "inline-block",
                          borderTop: "1px solid gray",
                          borderBottom: "1px solid gray"
                        }}
                      >
                        {this.state.countShop}
                      </div>
                      <div
                        style={{
                          width: 30,
                          backgroundColor: "rgb(143, 59, 59)",
                          color: "white",
                          textAlign: "center",
                          display: "inline-block",
                          borderTop: "1px solid gray",
                          borderBottom: "1px solid gray"
                        }}
                        onClick={() => {
                          if (this.state.countShop > 0)
                            this.setState({
                              countShop: this.state.countShop - 1
                            });
                        }}
                      >
                        -
                      </div>
                    </div>
                  </div>
                  <Button
                    style={{
                      width: "100%",
                      textAlign: "center",
                      background: "",
                      color: "white",
                      backgroundColor: "rgb(143, 59, 59)"
                    }}
                  >
                    خرید
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  };
  render() {
    const { show } = this.state;
    const timer = new Date(1562803478437 - this.state.time);
    let height = "auto";
    if (window.innerWidth > 960) {
      // height = 500;
    }
    return (
      <div className="sectin__container" style={{ display: "flex" }}>
        <TopNavbar isClubProfile />
        <SideBarLayout isClubProfile />
        {window.innerWidth < 960 && (
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="flex-start"
            xs={12}
            md={6}
            lg={6}
            style={{ padding: 15, paddingTop: 130, flexDirection: "column" }}
          >
            {this.renderProducts2()}
          </Grid>
        )}
        {window.innerWidth >= 960 && (
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="flex-start"
            xs={12}
            md={12}
            style={{
              padding: 15,
              paddingTop: 130,
              flexDirection: "row"
            }}
          >
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              xs={12}
              md={4}
              lg={4}
              style={{
                maxHeight: height,
                overflow: "auto",

              }}
            >
              <Grid item container xs={12}>
                {this.renderCategories()}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              xs={12}
              md={6}
              lg={6}
              style={{
                maxHeight: height,
                overflow: "auto",

              }}
            >
              <Grid item container xs={12}>
                {this.renderProducts2()}
              </Grid>
            </Grid>
          </Grid>
        )}
        {window.innerWidth >= 960 && show > -1 && (
          <Grid container item md={5} style={{ padding: 7 }}>
            <Grid container style={{ background: "lightblue", maxHeight: 600 }}>
              <Grid item md={4}>
                <div style={{ width: "90%", margin: "auto", marginTop: 10 }}>
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                  >
                    <div>
                      <img src="https://picsum.photos/id/504/250/400" />
                    </div>
                    <div>
                      <img src="https://picsum.photos/id/501/250/400" />
                    </div>
                    <div>
                      <img src="https://picsum.photos/id/500/250/400" />
                    </div>
                  </Carousel>
                </div>
              </Grid>
              <Grid item md={8} style={{ paddingTop: 10 }}>
                <p style={{ margin: 0 }}>{this.state.products[show].title}</p>
                <p style={{ margin: 0 }}>
                  {this.state.products[show].description}{" "}
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
                      height: "20%",
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
                    <div style={{ minWidth: 35, textAlign: "center" }}>روز</div>
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  position: "relative",
                  marginTop: 10,
                  marginBottom: 10
                }}
              ></Grid>
              <Grid
                item
                xs={8}
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
  )(ClubCategories)
);

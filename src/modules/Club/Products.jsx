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
      products: [
        {
          title: "املت فرانسوی",
          price: 29000,
          photo:
            "https://olo-images-live.imgix.net/00/00d92bcc82524da18b6eb2d00520d0cb.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=b53862bca633d6d6c365d90064ea0931"
        },
        {
          title: "املت فرانسوی",
          price: 22000,
          photo:
            "https://olo-images-live.imgix.net/00/00d92bcc82524da18b6eb2d00520d0cb.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=b53862bca633d6d6c365d90064ea0931"
        },
        {
          title: "املت فرانسوی",
          price: 22000,
          photo:
            "https://olo-images-live.imgix.net/00/00d92bcc82524da18b6eb2d00520d0cb.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=b53862bca633d6d6c365d90064ea0931"
        },
        {
          title: "املت فرانسوی",
          price: 22000,
          photo:
            "https://olo-images-live.imgix.net/00/00d92bcc82524da18b6eb2d00520d0cb.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=b53862bca633d6d6c365d90064ea0931"
        },
        {
          title: "املت فرانسوی",
          price: 22000,
          photo:
            "https://olo-images-live.imgix.net/00/00d92bcc82524da18b6eb2d00520d0cb.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=b53862bca633d6d6c365d90064ea0931"
        },
        {
          title: "املت فرانسوی",
          price: 22000,
          photo:
            "https://olo-images-live.imgix.net/00/00d92bcc82524da18b6eb2d00520d0cb.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=b53862bca633d6d6c365d90064ea0931"
        },
        {
          title: "املت فرانسوی",
          price: 22000,
          photo:
            "https://olo-images-live.imgix.net/00/00d92bcc82524da18b6eb2d00520d0cb.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=b53862bca633d6d6c365d90064ea0931"
        }
      ],
      categories: [
        {
          title: "صبحانه"
        },
        {
          title: "صبحانه"
        },
        {
          title: "صبحانه"
        },
        {
          title: "صبحانه"
        }
      ],
      eventList: [
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          description:
            "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا  چ",
          capacity: 25,
          score: 16,
          price: 25000,
          photo:
            "https://olo-images-live.imgix.net/33/33f2085e84b24935b50eb7fde13a7e90.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=feb7a08c193e8b1ecd2b9cbce75b01c5",
          tarikh: "231",
          reserve: 0
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          description:
            "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا  چ",
          capacity: 25,
          score: 16,
          price: 25000,
          photo:
            "https://olo-images-live.imgix.net/33/33f2085e84b24935b50eb7fde13a7e90.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=feb7a08c193e8b1ecd2b9cbce75b01c5",
          tarikh: "232",
          reserve: 0
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          description:
            "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا  چ",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "234",
          reserve: 0
        },
        {
          title: "عنوان رویداد",
          address: "شیرازِ خیابان جهاد سازندگی",
          capacity: 25,
          score: 16,
          price: 25000,
          photo: "https://picsum.photos/id/504/1000/400",
          tarikh: "235",
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
  componentWillMount() {}

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
              src="https://picsum.photos/id/504/1000/600"
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
                    src={item.photo}
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
                    textAlign: "center",
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
                      top: "calc(50% - 30px)",
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
                            marginBottom: 0,
                            textAlign: "right"
                          }}
                        >
                          {item.title}
                        </p>
                      </Grid>
                      <Grid item xs={2} style={{ padding: 10 }}>
                        <LeftArrow
                          style={{ position: "relative", top: 5 }}
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
        {this.state.eventList.map((item, i) => {
          return (
            <React.Fragment>
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
                    <Grid container>
                      <Grid item xs={4} style={{ background: "blue" }}>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={item.photo}
                        />
                      </Grid>
                      <Grid item xs={7} style={{ padding: 10 }}>
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
                        <p
                          style={{
                            textAlign: "right",
                            fontSize: 13,
                            margin: 0
                          }}
                        >
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

                            <div style={{ display: "inline", paddingRight: 7 }}>
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
            </React.Fragment>
          );
        })}
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
            md={12}
            style={{ padding: 15, paddingTop: 130, flexDirection: "column" }}
          >
            {this.renderProducts(true)}
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
                overflow: "auto"
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
                overflow: "auto"
              }}
            >
              <Grid item container xs={12}>
                {this.renderProducts2()}
              </Grid>
            </Grid>
          </Grid>
        )}
        {window.innerWidth >= 960 && show > -1 && (
          <Grid container item md={8} style={{ padding: 7 }}>
            <Grid container style={{ background: "lightblue", maxHeight: 600 }}>
              <Grid item md={4}>
                <div style={{ width: "90%", margin: "auto", marginTop: 10 }}>
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                  >
                    <div>
                      <img src="https://olo-images-live.imgix.net/33/33f2085e84b24935b50eb7fde13a7e90.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=180&h=120&fit=fill&bg=%23fff&s=feb7a08c193e8b1ecd2b9cbce75b01c5" />
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

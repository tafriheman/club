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
  Link
} from "@material-ui/core";
import { GetCustomerMessageList } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Carousel } from "react-responsive-carousel";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import jwtDecode from "jwt-decode";
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
class CreditCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCards: [
        {
          credit: 25000,
          price: 10000,
          point: 50,
          categories: ["پیتزا پپرونی", "شف برگر", "موهیتو"],
          expireTime: 1562440226720,
          remaining: 120
        },
        {
          credit: 2000,
          price: 12000,
          point: 20,
          categories: ["پیتزا مخصوص", " برگر", "موهیتو"],
          expireTime: 1562440226720,
          remaining: 30
        },
        {
          credit: 25000,
          price: 10000,
          point: 100,
          categories: ["پیتزا پپرونی", "شف برگر"],
          expireTime: 1562440226720,
          remaining: 100
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
      time: Date.now()
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

  setTime = () => {
    this.setState({ time: Date.now() });
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
          style={{ padding: 30, paddingTop: 130 }}
        >
          <div>
            <Typography variant="h4"> کارت های اعتباری</Typography>
          </div>
          <Grid item container xs={12} sm={12} md={12}>
            {this.state.creditCards.map((item, i) => {
              const timer = new Date(1562803478437 - this.state.time);
              return (
                <Grid xs={12} sm={12} md={4}>
                  <Card
                    style={{
                      textAlign: "center",
                      position: "relative",
                      height: "100%",
                      margin: 5
                    }}
                  >
                    <CardContent>
                      <div style={{ width: "100%", height: "50%" }}>
                        <Carousel
                          showThumbs={true}
                          showStatus={false}
                          infiniteLoop={true}
                        >
                          <div>
                            <img src="https://picsum.photos/id/504/1000/400" />
                          </div>
                          <div>
                            <img src="https://picsum.photos/id/501/1000/400" />
                          </div>
                          <div>
                            <img src="https://picsum.photos/id/500/1000/400" />
                          </div>
                          <div>
                            <img src="https://picsum.photos/id/500/1000/400" />
                          </div>
                          <div>
                            <img src="https://picsum.photos/id/500/1000/400" />
                          </div>
                          <div>
                            <img src="https://picsum.photos/id/500/1000/400" />
                          </div>
                        </Carousel>
                      </div>
                      <div style={{ width: "100%", position: "relative" }}>
                        <div style={{ width: "68%" }}>
                          <p>نام کلاب</p>
                          <p style={{ fontWeight: "bold" }}>
                            {item.credit} تومان اعتبار هدیه با پرداخت{" "}
                            {item.price} تومان یا {item.point} امتیاز
                          </p>
                          <p>
                            امکان استفاده از :{" "}
                            {item.categories.map(item => item + " ,")}
                          </p>
                          <div>
                            <Button
                              style={{ margin: 8 }}
                              size="Large"
                              variant="outlined"
                              onClick={() =>
                                this.setState({ openProduct: true })
                              }
                            >
                              مشاهده محصولات
                            </Button>
                            <p
                              id="seconds"
                              style={{ fontWeight: "bold", margin: 0 }}
                            >
                              مهلت خرید:{" "}
                              {timer.getDay() +
                                ":" +
                                timer.getHours() +
                                ":" +
                                timer.getMinutes() +
                                ":" +
                                timer.getSeconds()}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                textAlign: "left",
                                fontWeight: "lighter",
                                fontSize: 12
                              }}
                            >
                              {item.remaining} عدد باقی مانده
                            </p>
                          </div>
                        </div>
                        <Button
                          style={{
                            width: "30%",
                            position: "absolute",
                            height: "100%",
                            bottom: 0,
                            left: 0,
                            background: "#eaeaea"
                          }}
                          onClick={() => this.setState({ openBuy: true })}
                        >
                          دریافت کد
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
  )(CreditCardList)
);

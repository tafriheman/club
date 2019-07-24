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
import { AddOrderClub } from "../../redux/actions";
import { GetCustomerMessageList } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Carousel } from "react-responsive-carousel";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import jwtDecode from "jwt-decode";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import Close from "@material-ui/icons/HighlightOff";
import axios from "axios";
import config from "../../config.json";
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
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: -1,
      credit: 12000,
      discount: 20,
      basketList: {},
      userId: ""
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
      this.state.userId = decoded.user._id;
    }

    var basketList = JSON.parse(localStorage.getItem("basket"))
      ? JSON.parse(localStorage.getItem("basket"))
      : [];
    this.setState({ basketList });
  }
  componentDidMount() {
    this.setState({ price: this.getBasketPrice() });
  }
  getBasketPrice() {
    var price = 0;
    this.state.basketList.map(item => {
      price += item.price * item.amount;
    });

    return price;
  }
  payBasket = () => {
    const obj = { customer: this.state.userId };
    const productList = [];
    this.state.basketList.map((item, i) => {
      productList[i] = { product: item._id, count: item.amount };
    });
    obj["productOrders"] = productList;
    const clubId = this.state.basketList[0]["club"];
    var token = localStorage.getItem("user_token")
      ? localStorage.getItem("user_token")
      : "";
    this.addNewOrder(clubId, token, obj);
  };

  onClickBuy(trackId) {
    window.open(`https://gateway.zibal.ir/start/${trackId}`, "_blank");
  }

  addNewOrder = (clubId, token, order) => {
    console.log("clubId:", clubId);
    console.log("token:", token);
    console.log("order:", order);
    axios
      .post(`${config.domain}/user/${clubId}/order`, order, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        if (response.status === 201 && this.state.price === 0) {
          return axios
            .patch(
              `${config.domain}/user/order/${response.data._id}/pay/1`,
              {},
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("user_token")
                }
              }
            )
            .then(result => {
              if (result.status === 200) {
                return axios
                  .post(
                    `${config.domain}/user/order/${response.data._id}/pay/1`,
                    {
                      amount: response.data.orderPrice,
                      paymentContent: [{}]
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("user_token")
                      }
                    }
                  )
                  .then(result => {
                    if (result.status === 200) {
                      alert("خرید با موفقیت انجام شد");
                      this.setState({
                        open: false,
                        disabledBuy: false
                      });
                    }
                  })
                  .catch(e => {});
              }
              if (response.status === 201) {
                var params = {
                  merchant: window.location.host.includes("javaniran.club")
                    ? config.merchantIdJavan
                    : config.merchantIdTafriheman,
                  amount: response.data.orderPrice,
                  callbackUrl: window.location.host.includes("javaniran.club")
                    ? `${config.callbackUrlJavan}${clubId}`
                    : `${config.callbackUrlTafriheman}${clubId}`,
                  description: response.data.customerName,
                  orderId: response.data._id
                };
                return axios
                  .post("https://gateway.zibal.ir/v1/request", params)
                  .then(result => {
                    if (result.status === 200) {
                      return axios
                        .patch(
                          `${config.domain}/user/order/${
                            response.data._id
                          }/pay/${result.data.trackId}`,
                          {},
                          {
                            headers: {
                              Authorization:
                                "Bearer " + localStorage.getItem("user_token")
                            }
                          }
                        )
                        .then(response => {
                          debugger;
                          if (response.status === 200) {
                            this.setState({
                              popUpBuy: true,
                              trackId: result.data.trackId
                            });
                          }
                        })
                        .catch(e => {});
                    }
                  })
                  .catch(e => {});
              }
            })
            .catch(e => {});
        }
        if (response.status === 201) {
          console.log("priceNot0");
          var params = {
            merchant: window.location.host.includes("javaniran.club")
              ? config.merchantIdJavan
              : config.merchantIdTafriheman,
            amount: response.data.orderPrice,
            callbackUrl: window.location.host.includes("javaniran.club")
              ? `${config.callbackUrlJavan}${clubId}`
              : `${config.callbackUrlTafriheman}${clubId}`,
            description: response.data.customerName,
            orderId: response.data._id
          };
          return axios
            .post("https://gateway.zibal.ir/v1/request", params)
            .then(result => {
              if (result.status === 200) {
                return axios
                  .patch(
                    `${config.domain}/user/order/${response.data._id}/pay/${
                      result.data.trackId
                    }`,
                    {},
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("user_token")
                      }
                    }
                  )
                  .then(response => {
                    debugger;
                    if (response.status === 200) {
                      this.setState({
                        popUpBuy: true,
                        trackId: result.data.trackId
                      });
                      this.onClickBuy(result.data.trackId);
                    }
                  })
                  .catch(e => {});
              }
            })
            .catch(e => {});
        }
      });
  };
  //this.AddOrderClub(order, token, clubId);
  AddOrderClub = (order, token, club_id) => {
    //var decoded = jwtDecode(localStorage.getItem("user_token"));
    // let order = {
    //   customer: decoded.user._id,
    //   productOrders: [
    //     {
    //       product: this.state.product,
    //       count: this.state.count
    //     }
    //   ]
    // };
    // let club_id = null;
    // club_id = this.props.isClubProfile
    //   ? this.props.match.params.clubId
    //   : this.props.club._id;
    // if (
    //   window.location.host.includes("javaniran.club") &&
    //   window.location.pathname === "/"
    // ) {
    //   club_id = "5ca89c77e1d47c25a0374f51";
    // } else if (
    //   window.location.host.includes("localhost:3000") &&
    //   window.location.pathname === "/"
    // ) {
    //   club_id = "5bdd57b4397fec163454204e";
    // } else if (
    //   window.location.host.includes("tafriheman.net") &&
    //   window.location.pathname === "/"
    // ) {
    //   club_id = "5bdd57b4397fec163454204e";
    // }

    // if (
    //   this.props.club &&
    //   this.props.club._id !== "" &&
    //   window.location.pathname === "/dashboard/product/list"
    // ) {
    //   club_id = this.props.club._id;
    // }
    console.log(club_id);
    this.props.AddOrderClub(order, club_id).then(response => {
      if (response.status === 201 && this.state.selectedProduct.price === 0) {
        return axios
          .patch(
            `${config.domain}/user/order/${response.data._id}/pay/1`,
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
              }
            }
          )
          .then(result => {
            if (result.status === 200) {
              return axios
                .post(
                  `${config.domain}/user/order/${response.data._id}/pay/1`,
                  {
                    amount: response.data.orderPrice,
                    paymentContent: [{}]
                  },
                  {
                    headers: {
                      Authorization:
                        "Bearer " + localStorage.getItem("user_token")
                    }
                  }
                )
                .then(result => {
                  if (result.status === 200) {
                    alert("خرید با موفقیت انجام شد");
                    this.setState({
                      open: false,
                      disabledBuy: false
                    });
                  }
                })
                .catch(e => {});
            }
          })
          .catch(e => {});
      }
      if (response.status === 201) {
        debugger;
        var params = {
          merchant: window.location.host.includes("javaniran.club")
            ? config.merchantIdJavan
            : config.merchantIdTafriheman,
          amount: response.data.orderPrice,
          callbackUrl: window.location.host.includes("javaniran.club")
            ? `${config.callbackUrlJavan}${club_id}`
            : `${config.callbackUrlTafriheman}${club_id}`,
          description: response.data.customerName,
          orderId: response.data._id
        };
        return axios
          .post("https://gateway.zibal.ir/v1/request", params)
          .then(result => {
            if (result.status === 200) {
              return axios
                .patch(
                  `${config.domain}/user/order/${response.data._id}/pay/${
                    result.data.trackId
                  }`,
                  {},
                  {
                    headers: {
                      Authorization:
                        "Bearer " + localStorage.getItem("user_token")
                    }
                  }
                )
                .then(response => {
                  debugger;
                  if (response.status === 200) {
                    this.setState({
                      popUpBuy: true,
                      trackId: result.data.trackId
                    });
                  }
                })
                .catch(e => {});
            }
          })
          .catch(e => {});
      }
    });
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
          style={{ padding: 30, paddingTop: 130, flexDirection: "column" }}
        >
          <Typography variant="h4" style={{ flex: 1 }}>
            تکمیل خرید
          </Typography>

          <Grid
            item
            container
            justify="center"
            xs={12}
            sm={12}
            md={12}
            style={{ flex: 10 }}
          >
            <Grid xs={12} sm={12} md={4}>
              <Card
                style={{
                  textAlign: "center",
                  position: "relative",
                  margin: 5
                }}
              >
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    direction="row"
                  >
                    <div
                      style={{
                        display: "block",
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 15,
                        border: "1px solid gray"
                      }}
                    >
                      <div
                        style={{
                          display: "block",
                          borderBottom: "1px solid gray",
                          padding: 8
                        }}
                      >
                        قیمت : {this.getBasketPrice()} تومان
                      </div>
                      <div
                        style={{
                          display: "block",
                          borderBottom: "1px solid gray",
                          padding: 8
                        }}
                      >
                        اعتبار شما : {"-"} تومان
                      </div>
                      <div
                        style={{
                          display: "block",
                          borderBottom: "1px solid gray",
                          padding: 8
                        }}
                      >
                        تخفیف با کسر امتیازات : {"-"} تومان
                      </div>
                      <div style={{ display: "block", padding: 8 }}>
                        مجموع : {this.getBasketPrice()} تومان
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        direction: "rtl",
                        padding: 10,
                        margin: 10
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          background: "green",
                          color: "white",
                          margin: 10
                        }}
                        onClick={this.payBasket}
                      >
                        پرداخت و ثبت سفارش
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ margin: 10 }}
                      >
                        بازگشت به سبد خرید
                      </Button>
                    </div>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
        GetCustomerMessageList,
        AddOrderClub
      }
    )
  )(Checkout)
);

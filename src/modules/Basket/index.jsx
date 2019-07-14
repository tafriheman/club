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
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import Close from "@material-ui/icons/HighlightOff";
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
class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketList: [
        {
          title: "پفک 200 فروش",
          supplier: "مواد غذایی شفیعی",
          price: 100000,
          amount: 0
        },
        {
          title: "پفک 33 فروش",
          supplier: "مواد غذایی شفیعی",
          price: 300000,
          amount: 0
        },
        {
          title: "پفک  ",
          supplier: "2مواد غذایی شفیعی",
          price: 100000,
          amount: 0
        }
      ]
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
  add = (item, i) => {
    if (item === "amount") {
      const prvBasket = this.state.basketList;
      prvBasket[i]["amount"] = prvBasket[i]["amount"] + 1;
      this.setState({ basketList: prvBasket });
    }
  };
  subtract = (item, i) => {
    if (item === "amount") {
      const prvBasket = this.state.basketList;
      prvBasket[i]["amount"] = prvBasket[i]["amount"] - 1;
      this.setState({ basketList: prvBasket });
    }
  };
  deleteItem = i => {
    const prvBasket = this.state.basketList.filter((item, id) => {
      return id !== i ? item : null;
    });
    this.setState({ basketList: prvBasket });
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
            سبد سفارش
          </Typography>

          <Grid item container xs={12} sm={12} md={12} style={{ flex: 10 }}>
            {this.state.basketList.map((item, i) => {
              return (
                <Grid xs={12} sm={12} md={4}>
                  <Card
                    style={{
                      textAlign: "center",
                      position: "relative",
                      margin: 5
                    }}
                  >
                    <div style={{ position: "absolute", top: 3, left: 0 }}>
                      <IconButton
                        style={{ padding: 0 }}
                        onClick={() => {
                          this.deleteItem(i);
                        }}
                      >
                        <Button>
                          <Close style={{ fontSize: 25, color: "black" }} />
                        </Button>
                      </IconButton>
                    </div>
                    <CardContent>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        direction="row"
                      >
                        <Grid xs={5} md={4}>
                          <div style={{ width: "100%" }}>
                            <img
                              style={{ width: "100%" }}
                              src="https://picsum.photos/id/504/1000/750"
                            />
                          </div>
                        </Grid>
                        <Grid xs={7} md={8}>
                          <div style={{ width: "100%", position: "relative" }}>
                            <div style={{ width: "100%" }}>
                              <p>{item.title}</p>
                              <p>تامین کننده: {item.supplier} </p>
                              <p> {item.price} تومان </p>
                            </div>
                          </div>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={12}
                          sm={12}
                          md={12}
                          alignItems="flex-start"
                        >
                          <div style={{ display: "flex", margin: "auto" }}>
                            <div>تعداد:</div>
                            <IconButton
                              style={{ padding: 0 }}
                              aria-owns={"simple-menu"}
                              onClick={() => this.add("amount", i)}
                            >
                              <Button>
                                <AddCircleIcon
                                  style={{ fontSize: 28, color: "#0073c4" }}
                                />
                              </Button>
                            </IconButton>
                            <Typography variant="h6">{item.amount}</Typography>
                            <IconButton
                              style={{ padding: 0 }}
                              aria-owns={"simple-menu"}
                              disabled={item.amount < 1}
                              onClick={() => this.subtract("amount", i)}
                            >
                              <Button style={{ fontSize: 16 }}>
                                <RemoveCircleIcon
                                  style={{ fontSize: 28, color: "#0073c4" }}
                                />
                              </Button>
                            </IconButton>
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
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
        GetCustomerMessageList
      }
    )
  )(Basket)
);

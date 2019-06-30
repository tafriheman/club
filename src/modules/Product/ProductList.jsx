import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductDetails from "./ProductDetails";
import ReactPaginate from "react-paginate";
import queryString from "query-string";
import {
  productProductListFetchProdcuts,
  productProductEditSetForm,
  AddOrderClub,
  clubMembership,
  clubMembershipVerify,
  completeClubMembership,
  removeProduct
} from "../../redux/actions";
import {
  Card,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Radio,
  InputLabel,
  FormControl,
  Input,
  Select,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  CircularProgress,
  List,
  ListItem

} from "@material-ui/core";
import compose from "recompose/compose";
import config from "../../config.json";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Person from "@material-ui/icons/Person";
import Details from "@material-ui/icons/Details";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import Basket from "@material-ui/icons/ShoppingBasket";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import styles from "../Layout/styles/TopNavbar";
import SnackBar from "../../components/SnackBar";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 465 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      anchorEl: null,
      open: false,
      count: 1,
      productName: "",
      openLogin: false,
      mobile: "",
      step: 0,
      code: '',
      full_name: '',
      credit: 100000,
      newCredit: 0,
      gender: 'female',
      marital_status: 'single',
      day: 1,
      month: 1,
      year: 1300,
      message: '',
      userId: '',
      showDiscount: 10,
      discount: 1,
      totalAmount: 0,
      error: '',
      selectedProduct: {},
      loading: true,
      disabledBuy: false,
      disabledRegister: false,
      selectedMenu: 0,
      isOpenDelete: false,
      isOpenDetails: false,
      deletedProduct: {
        clubId: 0,
        productId: 0
      },
      productId: 0,
      popUpBuy: false,
      trackId: 0,
      showSnackBar: false,
      typeSnackBar: "",
      messageSnackBar: "",
      orderDetail: {},
      activeItemIndex: 0
    };

    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

  }

  calculatePrice = async () => {
    this.state.discount = 1 - (this.state.showDiscount * 0.01);
    let pardakhti =
      (this.state.count * this.state.selectedProduct.price * this.state.discount) - this.state.credit;

    if (pardakhti <= 0) {
      await this.setState({
        totalAmount: 0,
        newCredit: Math.abs(pardakhti)
      });
    } else if (pardakhti > 0) {
      await this.setState({
        newCredit: 0,
        totalAmount: pardakhti
      });
    }
  }

  add = async () => {
    await this.setState({
      count: this.state.count + 1
    });

    await this.calculatePrice();
  }

  subtract = async () => {
    await this.setState({
      count: this.state.count - 1
    });

    await this.calculatePrice();
  }

  componentWillMount() {
    const {
      productProductListFetchProdcuts,
      pageSize
    } = this.props;
    let club_id = null;

    if (
      window.location.host.includes("javaniran.club") &&
      window.location.pathname === "/"
    ) {
      club_id = "5ca89c77e1d47c25a0374f51";
      document.title = "باشگاه مشتریان موسسه جوان";
    } else if (
      window.location.host.includes("tafriheman.net") &&
      window.location.pathname === "/"
    ) {
      club_id = "5bdd57b4397fec163454204e";
      document.title = "تفریح من";
    } else if (
      window.location.host.includes("localhost:3000") &&
      window.location.pathname === "/"
    ) {
      club_id = "5bdd57b4397fec163454204e";
      document.title = "تفریح من";
    }
    if (this.props.match.params.clubId) {
      club_id = this.props.match.params.clubId;
    }
    if (
      this.props.club &&
      this.props.club._id &&
      this.props.club._id !== "" &&
      window.location.pathname === "/dashboard/product/list"
    ) {
      club_id = this.props.club._id;
    }

    productProductListFetchProdcuts(club_id, 1, pageSize, () => {
      this.setState({
        products: this.props.products,
        loading: false
      });
    });

    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search);
      return axios
        .post("https://gateway.zibal.ir/v1/verify", {
          merchant: window.location.host.includes("javaniran.club")
            ? config.merchantIdJavan
            : config.merchantIdTafriheman,
          //"merchant": window.location.host.includes('localhost') ? config.merchantIdJavan : config.merchantIdTafriheman,
          trackId: parsed.trackId
        })
        .then(response => {
          return axios
            .post(
              `${config.domain}/user/order/${parsed.orderId}/pay/${
              parsed.trackId
              }`,
              {
                amount: response.data.amount,
                paymentContent: [
                  {
                    cardNumber: response.data.cardNumber,
                    description: response.data.description,
                    message: response.data.message,
                    paidAt: response.data.paidAt,
                    refNumber: response.data.refNumber,
                    status: response.data.status
                  }
                ]
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("user_token")
                }
              }
            )
            .then(result => {
              if (result.status === 200) {
                alert("خرید با موفقیت انجام شد");
                const { router } = this.context;
                router.history.push(`/clubs/${club_id}`);
              }
            })
            .catch(e => { });
        })
        .catch(e => {
          alert(e.response.data.message);
        });
    }
  }

  handleSnackBarClose = () => {
    this.setState({ showSnackBar: false });
  };

  handlePrintClick = (event, index) => {
    this.setState({ anchorEl: event.currentTarget, selectedMenu: index });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null, selectedMenu: 0 });
  };

  handleClickOpen = async (product, productName, selectedProduct) => {
    if (localStorage.getItem('user_token')) {

      await this.setState({
        open: true,
        product: product,
        productName: productName,
        selectedProduct: selectedProduct,
        count: 1,
        newCredit: this.state.credit
      });

      await this.calculatePrice();
    }
    else {
      await this.setState({
        openLogin: true,
        product,
        productName,
        selectedProduct: selectedProduct
      });
    }
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeBirthday = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  AddOrderClub = () => {
    this.setState({
      disabledBuy: true
    });
    var decoded = jwtDecode(localStorage.getItem("user_token"));
    let order = {
      customer: decoded.user._id,
      productOrders: [
        {
          product: this.state.product,
          count: this.state.count
        }
      ]
    };
    let club_id = null;
    club_id = this.props.isClubProfile
      ? this.props.match.params.clubId
      : this.props.club._id;
    if (
      window.location.host.includes("javaniran.club") &&
      window.location.pathname === "/"
    ) {
      club_id = "5ca89c77e1d47c25a0374f51";
    } else if (
      window.location.host.includes("localhost:3000") &&
      window.location.pathname === "/"
    ) {
      club_id = "5bdd57b4397fec163454204e";
    } else if (
      window.location.host.includes("tafriheman.net") &&
      window.location.pathname === "/"
    ) {
      club_id = "5bdd57b4397fec163454204e";
    }

    if (
      this.props.club &&
      this.props.club._id !== "" &&
      window.location.pathname === "/dashboard/product/list"
    ) {
      club_id = this.props.club._id;
    }
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
                .catch(e => { });
            }
          })
          .catch(e => { });
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
                .catch(e => { });
            }
          })
          .catch(e => { });
      }
    });
  };

  handleClose = () => {
    this.setState({
      openLogin: false,
      step: 0,
      error: "",
      code: "",
      mobile: "",
      full_name: "",
      gender: "female",
      marital_status: "single",
      day: 1,
      month: 1,
      year: 1300
    });
  };
  onClickBuy(trackId) {
    this.setState({
      open: false,
      disabledBuy: false
    });
    window.open(`https://gateway.zibal.ir/start/${trackId}`, "_blank");
  }

  onSubmit = () => {
    this.setState(
      {
        disabledRegister: true
      },
      () => {
        if (this.state.step === 0) {
          if (this.state.mobile.length === 0) {
            this.setState({
              error: "لطفا شماره موبایل را وارد نمایید",
              disabledRegister: false
            });
            return;
          }
          this.props.clubMembership(this.state.mobile).then(response => {
            if (response.status === 200) {
              this.setState({
                step: 1,
                error: "",
                disabledRegister: false
              });
            } else {
              this.setState({
                error: "َشماره تلفن شما معتبر نیست",
                disabledRegister: false
              });
            }
          });
        } else if (this.state.step === 1) {
          if (this.state.code.length === 0) {
            this.setState({
              error: "لطفا کد را وارد نمایید",
              disabledRegister: false
            });
            return;
          }
          this.props
            .clubMembershipVerify(this.state.mobile, this.state.code)
            .then(response => {
              if (response.status === 200) {
                if (response.data.user.status_register) {
                  this.setState({
                    openLogin: false,
                    error: "",
                    step: 0,
                    disabledRegister: false,
                    showSnackBar: true,
                    typeSnackBar: "success",
                    messageSnackBar:
                      "شما با موفقیت عضو شدید جهت خرید محصول دکمه خرید را کلیک کنید"
                  });
                } else {
                  this.setState({
                    step: 2,
                    userId: response.data.user._id,
                    error: "",
                    disabledRegister: false
                  });
                }
              } else {
                this.setState({
                  error: "َکد وارد شده معتبر نیست",
                  disabledRegister: false
                });
              }
            });
        } else if (this.state.step === 2) {
          if (this.state.full_name.length === 0) {
            this.setState({
              error: "لطفا نام و نام خانوادگی را وارد نمایید",
              disabledRegister: false
            });
            return;
          }
          let birth_date = "";
          let month =
            this.state.month < 10 ? "0" + this.state.month : this.state.month;
          if (this.state.year !== 1300) {
            birth_date = `${this.state.year}/${month}/${this.state.day}`;
          }

          this.props
            .completeClubMembership(
              this.state.full_name,
              birth_date,
              this.state.gender,
              this.state.marital_status,
              this.state.userId
            )
            .then(response => {
              if (response.status === 200) {
                this.setState({
                  openLogin: false,
                  step: 0,
                  code: "",
                  mobile: "",
                  error: "",
                  full_name: "",
                  gender: "female",
                  marital_status: "single",
                  day: 1,
                  month: 1,
                  year: 1300,
                  open: true,
                  disabledRegister: false
                });
              }
            });
        }
      }
    );
  };

  backToStepZero = () => {
    this.setState({
      step: 0
    });
  };

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  };
  handleChangePosition = event => {
    this.setState({ marital_status: event.target.value });
  };
  handelRemoveProduct = () => {
    const { removeProduct, token } = this.props;
    removeProduct(
      this.state.deletedProduct.clubId,
      this.state.deletedProduct.productId,
      token
    ).then(reponse => {
      if (reponse.status === 200) {
        const { productProductListFetchProdcuts } = this.props;
        productProductListFetchProdcuts(
          this.state.deletedProduct.clubId,
          1,
          200,
          () => {
            this.setState({
              isOpenDelete: false,
              deletedProduct: {
                clubId: 0,
                productId: 0
              },
              products: this.props.products
            });
            alert("با موفقیت حذف شد");
          }
        );
      }
    });
  };
  handlePageClick(data) {
    const {
      isClubProfile,
      productProductListFetchProdcuts,
      pageSize
    } = this.props;
    let club_id = null;
    club_id = isClubProfile
      ? this.props.match.params.clubId
      : this.props.club._id;
    if (
      window.location.hostname.includes("javaniran.club") &&
      window.location.pathname === "/"
    ) {
      club_id = "5ca89c77e1d47c25a0374f51";
    } else if (
      window.location.host.includes("tafriheman.net") &&
      window.location.pathname === "/"
    ) {
      club_id = "5bdd57b4397fec163454204e";
    } else if (
      window.location.host.includes("localhost:3000") &&
      window.location.pathname === "/"
    ) {
      club_id = "5bdd57b4397fec163454204e";
    }

    if (
      this.props.club &&
      this.props.club._id !== "" &&
      window.location.pathname === "/dashboard/product/list"
    ) {
      club_id = this.props.club._id;
    }
    productProductListFetchProdcuts(
      club_id,
      data.selected + 1,
      pageSize,
      () => {
        this.setState({ products: this.props.products, loading: false });
      }
    );
  }

  renderPagination() {
    const { total, pageSize } = this.props;
    if (total !== 0 && total > pageSize)
      return (
        <ReactPaginate
          previousLabel={"قبلی"}
          nextLabel={"بعدی"}
          breakLabel={<a className="page-link">...</a>}
          pageCount={Math.ceil(total / pageSize)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          containerClassName="pagination"
          nextClassName="page-item"
          previousClassName="page-item"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          breakClassName="page-item"
        />
      );
  }

  render() {
    const { anchorEl } = this.state;
    const { isClubProfile, classes } = this.props;
    const month = [
      {
        value: 1,
        text: "فروردین"
      },
      {
        value: 2,
        text: "اردیبهشت"
      },
      {
        value: 3,
        text: "خرداد"
      },
      {
        value: 4,
        text: "تیر"
      },
      {
        value: 5,
        text: "مرداد"
      },
      {
        value: 6,
        text: "شهریور"
      },
      {
        value: 7,
        text: "مهر"
      },
      {
        value: 8,
        text: "آبان"
      },
      {
        value: 9,
        text: "آذر"
      },
      {
        value: 10,
        text: "دی"
      },
      {
        value: 11,
        text: "بهمن"
      },
      {
        value: 12,
        text: "اسفند"
      }
    ];
    let years = [];
    for (let i = 1300; i < 1398; i++) {
      let year = {
        value: i,
        text: i
      };
      years.push(year);
    }
    let days = [];
    for (let i = 1; i < 32; i++) {
      let day = {
        value: i,
        text: i
      };
      days.push(day);
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let paddingTop = 0;
    if (isClubProfile && window.innerWidth < 768) {
      paddingTop = 75;
    } else if (isClubProfile && window.innerWidth > 768) {
      paddingTop = 30;
    }
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingTop: paddingTop
        }}
      >
        <SnackBar
          show={this.state.showSnackBar}
          type={this.state.typeSnackBar}
          message={this.state.messageSnackBar}
          onClose={this.handleSnackBarClose}
          autoHideDuration={5000}
        />
        <Dialog
          open={this.state.popUpBuy}
          onClose={() => {
            this.setState({
              popUpBuy: false
            });
          }}
        >
          <DialogContent>
            سفارش شما با موفقیت ثبت شد، جهت پرداخت بر روی دکمه زیر کلیک کنید
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.onClickBuy(this.state.trackId)}
              variant="contained"
              color="primary">
              پرداخت
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`خرید محصول ${
            this.state.productName
            }`}</DialogTitle>
          <DialogContent>
            {/* <TextField
              id="standard-name"
              label="تعداد"
              value={this.state.count}
              onChange={this.handleChange("count")}
              margin="normal"
              type="number"
            /> */}
        {/* </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary" autoFocus>
              انصراف
            </Button>
            <Button
              onClick={this.AddOrderClub}
              color="primary"
              variant="contained"
              disabled={this.state.disabledBuy}
            >
              {this.state.disabledBuy ? "منتظر بمانید" : "خرید"}
            </Button>
          </DialogActions>
        </Dialog> */}
        <Dialog
          open={this.state.isOpenDetails}
          onClose={() => {
            this.setState({
              isOpenDetails: false,
              productId: 0
            });
          }}
        >
          <DialogContent>
            <ProductDetails productId={this.state.productId} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  isOpenDetails: false,
                  productId: 0
                });
              }}
              color="primary"
            >
              بستن
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={() => {
            this.setState({
              isOpenDelete: false
            });
          }}
          aria-labelledby="simple-dialog-title"
          open={this.state.isOpenDelete}
        >
          <DialogTitle id="simple-dialog-title">
            آیا از حذف محصول اطمینان دارید
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  isOpenDelete: false
                });
              }}
              color="primary"
            >
              خیر
            </Button>
            <Button
              onClick={this.handelRemoveProduct}
              color="primary"
              autoFocus
            >
              بلی
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openLogin}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="simple-dialog-title">
            برای خرید باید لاگین کنید
          </DialogTitle>
          <DialogContent>
            <TextField
              className={classes.inputStyle}
              error={this.state.error.length > 0}
              id="standard-error"
              value={
                this.state.step === 0
                  ? this.state.mobile
                  : this.state.step === 1 && this.state.step !== 0
                    ? this.state.code
                    : this.state.full_name
              }
              label={
                this.state.error.length > 0
                  ? this.state.error
                  : this.state.step === 0
                    ? "شماره موبایل"
                    : this.state.step === 1 && this.state.step !== 0
                      ? "کد فعالسازی"
                      : "نام و نام خانوادگی"
              }
              margin="normal"
              onChange={event => {
                if (this.state.step === 0) {
                  this.setState({
                    mobile: event.target.value
                  });
                } else if (this.state.step === 1) {
                  this.setState({
                    code: event.target.value
                  });
                } else if (this.state.step === 2) {
                  this.setState({
                    full_name: event.target.value
                  });
                }
              }}
            />
            <br />
            {this.state.step === 2 && (
              <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="day-simple">روز</InputLabel>
                  <Select
                    value={this.state.day}
                    onChange={this.handleChangeBirthday}
                    inputProps={{
                      name: "day",
                      id: "day-simple"
                    }}
                  >
                    {days.map((m, index) => {
                      return <MenuItem value={m.value}>{m.text}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="month-helper">ماه</InputLabel>
                  <Select
                    value={this.state.month}
                    onChange={this.handleChangeBirthday}
                    input={<Input name="month" id="month-helper" />}
                  >
                    {month.map((m, index) => {
                      return <MenuItem value={m.value}>{m.text}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="year-helper">سال</InputLabel>
                  <Select
                    value={this.state.year}
                    onChange={this.handleChangeBirthday}
                    displayEmpty
                    name="year"
                    className={classes.selectEmpty}
                  >
                    {years.map((y, i) => {
                      return <MenuItem value={y.value}>{y.text}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </form>
            )}
            {this.state.step === 2 && (
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">جنسیت</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  className={classes.group}
                  value={this.state.gender}
                  onChange={this.handleChangeGender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio color="primary" />}
                    label="زن"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio color="primary" />}
                    label="مرد"
                    labelPlacement="end"
                  />
                </RadioGroup>
                <FormLabel component="legend">وضعیت تاهل</FormLabel>
                <RadioGroup
                  aria-label="marital_status"
                  name="marital_status"
                  className={classes.group}
                  value={this.state.marital_status}
                  onChange={this.handleChangePosition}
                >
                  <FormControlLabel
                    value="single"
                    control={<Radio color="primary" />}
                    label="مجرد"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="married"
                    control={<Radio color="primary" />}
                    label="متاهل"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={
                this.state.step === 0 ? this.handleClose : this.backToStepZero
              }
              color="secondary"
            >
              {this.state.step !== 1 ? "انصراف" : "بازگشت و اصلاح شماره"}
            </Button>
            <Button
              variant="contained"
              onClick={this.onSubmit}
              color="primary"
              autoFocus
              disabled={this.state.disabledRegister}
            >
              {this.state.disabledRegister
                ? "لطفا منتطر بمانید"
                : this.state.step !== 1
                  ? "ثبت نام/ورود"
                  : "تایید/ورود"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`خرید محصول ${
            this.state.productName
            }`}</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>{`قیمت : ${this.state.selectedProduct.price} تومان`}
                <IconButton
                  style={{ padding: 0, marginRight: 53 }}
                  aria-owns={anchorEl ? "simple-menu" : null}
                  onClick={this.add}
                  onChange={this.handleChange('count')}>
                  <Button >
                    <AddCircleIcon style={{ fontSize: 28, color: "#0073c4" }} />
                  </Button>
                </IconButton>
                {`${this.state.count}`}
                <IconButton
                  style={{ padding: 0 }}
                  aria-owns={anchorEl ? "simple-menu" : null}
                  disabled={this.state.count < 1}
                  onClick={this.subtract}
                  onChange={this.handleChange('count')}>
                  <Button style={{ fontSize: 16 }} >
                    <RemoveCircleIcon style={{ fontSize: 28, color: "#0073c4" }} />
                  </Button>
                </IconButton>
              </ListItem>
              <ListItem>{`اعتبار : ${this.state.credit} تومان`}</ListItem>
              <ListItem>{`میزان تخفیف : ${this.state.showDiscount} ٪`}</ListItem>
              <ListItem>{`مجموع  : ${this.state.totalAmount} تومان`}</ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary" autoFocus>
              انصراف
            </Button>
            <Button
              onClick={this.AddOrderClub}
              color="primary"
              variant="contained"
              disabled={this.state.disabledBuy}
            >
              {this.state.disabledBuy ? "منتظر بمانید" : "خرید"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.isOpenDetails}
          onClose={() => {
            this.setState({
              isOpenDetails: false,
              productId: 0
            });
          }}
          maxWidth="xl"
        >
          <DialogContent>
            <ProductDetails productId={this.state.productId} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  isOpenDetails: false,
                  productId: 0
                });
              }}
              color="primary"
            >
              بستن
            </Button>
          </DialogActions>
        </Dialog>
        {/* <div
          style={{
            width: "24%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <IconButton style={{ padding: 0 }}>
            <AddCircleIcon style={{ fontSize: 100 }} />
          </IconButton>
          <Typography>ثبت امتیاز </Typography>
        </div> */}
        {this.state.loading ? (
          <CircularProgress className={classes.progress} />
        ) : (
            <Grid item xs={12} lg={12} xl={12} md={12} sm={12} spacing={16}>
              <Grid item>
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop={true}
                >
                  <div>
                    <img
                      style={{ maxHeight: 200 }}
                      src="https://picsum.photos/id/504/1000/400"
                    />
                  </div>
                  <div>
                    <img
                      style={{ maxHeight: 200 }}
                      src="https://picsum.photos/id/501/1000/400"
                    />
                  </div>
                  <div>
                    <img
                      style={{ maxHeight: 200 }}
                      src="https://picsum.photos/id/500/1000/400"
                    />
                  </div>
                </Carousel>
              </Grid>
              <div
                style={{
                  paddingRight: 40,
                  paddingLeft: 40,
                  position: "relative"
                }}
              >
                <div
                  id="listProduct"
                  style={{
                    width: "100%",
                    overflow: "scroll",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <div
                    onClick={() => {
                      document.getElementById("listProduct").scroll({
                        top: 0,
                        left:
                          document.getElementById("listProduct").scrollLeft + 200,
                        behavior: "smooth"
                      });
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      background: "gray",
                      opacity: 0.7,
                      position: "absolute",
                      zIndex: 100,
                      top: "45%",
                      right: 0,
                      overflow: "hidden",
                      borderRadius: 20,
                      textAlign: "center",
                      color: "white",
                      fontSize: 25,
                      cursor: "pointer"
                    }}
                  >
                    {"<"}
                  </div>
                  <div
                    onClick={() => {
                      document.getElementById("listProduct").scroll({
                        top: 0,
                        left:
                          document.getElementById("listProduct").scrollLeft - 200,
                        behavior: "smooth"
                      });
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      background: "gray",
                      opacity: 0.7,
                      position: "absolute",
                      zIndex: 100,
                      top: "45%",
                      left: 0,
                      overflow: "hidden",
                      borderRadius: 20,
                      textAlign: "center",
                      color: "white",
                      fontSize: 25,
                      cursor: "pointer"
                    }}
                  >
                    {">"}
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      marginTop: 10,
                      padding: 0,
                      display: "flex"
                    }}
                  >
                    {this.state.products.map((item, index) => {
                      return (
                        <li
                          style={{
                            // width: "100%",
                            maxWidth: 330,
                            minWidth: 250,
                            marginLeft: 10,
                            display: "inline-block",
                            float: "right"
                          }}
                        >
                          <div>
                            <Card>
                              <div
                                style={{ height: 150, cursor: "pointer" }}
                                onClick={() => {
                                  if (window.innerWidth > 767) {
                                    this.setState({
                                      productId: item._id,
                                      isOpenDetails: true
                                    });
                                  } else {
                                    const { router } = this.context;
                                    router.history.push(`/product/${item._id}`);
                                  }
                                }}
                              >
                                <img
                                  style={{
                                    height: 150,
                                    objectFit: "cover",
                                    width: "100%"
                                  }}
                                  src={`${config.domain}/${item.images[0]}`}
                                />
                                {/* <Carousel showThumbs={false} showStatus={false}>
                                  {item.images[0].map(img => {
                                    return (
                                      <div style={{ height: 150 }}>
                                        <img
                                          style={{
                                            height: 150,
                                            objectFit: "cover"
                                          }}
                                          src={`${config.domain}/${img}`}
                                        />
                                      </div>
                                    );
                                  })}
                                </Carousel> */}
                              </div>

                              <div
                                style={{
                                  height: 90,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between"
                                }}
                              >
                                {isClubProfile && (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between"
                                    }}
                                  >
                                    <Link
                                      to={`/product/${item._id}`}
                                      style={{
                                        padding: 5
                                      }}
                                      onClick={() => {
                                        if (window.innerWidth > 670) {
                                          this.setState({
                                            productId: item._id,
                                            isOpenDetails: true
                                          });
                                        } else {
                                          const { router } = this.context;
                                          router.history.push(
                                            `/product/${item._id}`
                                          );
                                        }
                                      }}
                                    >
                                      {item.name}
                                    </Link>
                                    <div>
                                      <IconButton
                                        style={{ padding: 0 }}
                                        aria-owns={
                                          anchorEl ? "simple-menu" : null
                                        }
                                        onClick={this.handlePrintClick}
                                      >
                                        <Button
                                          style={{ fontSize: 16, padding: 0 }}
                                          onClick={() =>
                                            this.handleClickOpen(
                                              item._id,
                                              item.name,
                                              item
                                            )
                                          }
                                        >
                                          خرید
                                        <Basket style={{ fontSize: 20 }} />
                                        </Button>
                                      </IconButton>
                                    </div>
                                  </div>
                                )}
                                {!isClubProfile && (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between"
                                    }}
                                  >
                                    <Link
                                      to={`/product/${item._id}`}
                                      style={{
                                        padding: 5,
                                        color: "black",
                                        textDecoration: "none"
                                      }}
                                    >
                                      {item.name}
                                    </Link>
                                    <div>
                                      <IconButton
                                        style={{ padding: 0 }}
                                        aria-owns={
                                          anchorEl ? "simple-menu" : null
                                        }
                                        onClick={event =>
                                          this.handlePrintClick(event, index)
                                        }
                                      >
                                        <MoreIcon />
                                      </IconButton>
                                      {this.state.selectedMenu === index && (
                                        <Menu
                                          id="simple-menu"
                                          anchorEl={anchorEl}
                                          open={Boolean(anchorEl)}
                                          onClose={this.handleCloseMenu}
                                          style={{
                                            marginTop: 50,
                                            marginLeft: 30,
                                            direction: "rtl"
                                          }}
                                        >
                                          <MenuItem
                                            onClick={this.handleCloseMenu}
                                          >
                                            <Button
                                              onClick={() =>
                                                this.props.productProductEditSetForm(
                                                  {
                                                    _id: item._id,
                                                    name: item.name,
                                                    description: item.description,
                                                    images: item.images,
                                                    links: item.links,
                                                    price: item.price,
                                                    point: item.point,
                                                    category: item.category,
                                                    type: item.type
                                                  },
                                                  this.props.history
                                                )
                                              }
                                            >
                                              ویرایش
                                            <EditIcon
                                                style={{ fontSize: 20 }}
                                              />
                                            </Button>
                                          </MenuItem>
                                          <MenuItem
                                            onClick={this.handleCloseMenu}
                                          >
                                            <Button
                                              style={{ fontSize: 16, padding: 0 }}
                                              onClick={() => {
                                                if (window.innerWidth > 670) {
                                                  this.setState({
                                                    productId: item._id,
                                                    isOpenDetails: true
                                                  });
                                                } else {
                                                  const { router } = this.context;
                                                  router.history.push(
                                                    `/product/${item._id}`
                                                  );
                                                }
                                              }}
                                            >
                                              جزییات
                                            <Details style={{ fontSize: 20 }} />
                                            </Button>
                                          </MenuItem>
                                          <MenuItem
                                            onClick={this.handleCloseMenu}
                                          >
                                            <Button
                                              style={{ fontSize: 16, padding: 0 }}
                                              onClick={() => {
                                                const { router } = this.context;
                                                router.history.push(
                                                  `/dashboard/products/${
                                                  item.club
                                                  }/custmers/${item._id}`
                                                );
                                              }}
                                            >
                                              مشتریان
                                            <Person style={{ fontSize: 20 }} />
                                            </Button>
                                          </MenuItem>
                                          <MenuItem
                                            onClick={this.handleCloseMenu}
                                          >
                                            <Button
                                              style={{ fontSize: 16, padding: 0 }}
                                              onClick={() => {
                                                let deletedProduct = {
                                                  clubId: item.club,
                                                  productId: item._id
                                                };
                                                this.setState({
                                                  isOpenDelete: true,
                                                  deletedProduct
                                                });
                                              }}
                                            >
                                              حذف
                                            <DeleteOutlinedIcon
                                                style={{ fontSize: 20 }}
                                              />
                                            </Button>
                                          </MenuItem>
                                        </Menu>
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                  }}
                                >
                                  <div>
                                    <Typography
                                      style={{
                                        padding: 5
                                      }}
                                    >
                                      اعتبار هدیه : {item.point} امتیاز
                                  </Typography>
                                  </div>
                                  <div>
                                    <Typography
                                      style={{
                                        padding: 5
                                      }}
                                    >
                                      {item.price === 0
                                        ? "رایگان"
                                        : `${numberWithCommas(item.price)} تومان`}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {/* {Array.from(new Array(8)).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 200,
                      background: "url(https://placeimg.com/380/200/nature)"
                    }}
                  />
                ))} */}
                  {/* </ItemsCarousel> */}
                </div>
              </div>
            </Grid>
          )}
        {this.renderPagination()}
      </div>
    );
  }
}

ProductList.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = ({ app, productProductList }) => {
  return { ...app, ...productProductList };
};

export default withRouter(
  compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      {
        productProductListFetchProdcuts,
        productProductEditSetForm,
        AddOrderClub,
        clubMembership,
        clubMembershipVerify,
        completeClubMembership,
        removeProduct
      }
    )
  )(ProductList)
);

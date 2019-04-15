import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import { connect } from "react-redux";
import {
  productProductListFetchProdcuts,
  productProductEditSetForm,
  AddOrderClub,
  clubMembership,
  clubMembershipVerify,
  completeClubMembership,
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
  CircularProgress
} from "@material-ui/core";
import compose from "recompose/compose";
import config from "../../config.json";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import Basket from "@material-ui/icons/ShoppingBasket";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import styles from '../Layout/styles/TopNavbar'
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      anchorEl: null,
      open: false,
      count:1,
      productName:'',
      openLogin: false,
      mobile: '',
      step: 0,
      code: '',
      full_name: '',
      gender: 'female',
      marital_status: 'single',
      day: 1,
      month: 1,
      year: 1300,
      message: '',
      userId: '',
      error: '',
      selectedProduct:{},
      loading:true,
      disabledBuy:false,
      disabledRegister:false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {

    const {
      isClubProfile,
      productProductListFetchProdcuts,
      pageSize
    } = this.props;
    let club_id = null
    club_id = isClubProfile ? this.props.match.params.clubId : this.props.club._id
    productProductListFetchProdcuts(club_id, 1, pageSize, () => {
      this.setState({ products: this.props.products, loading:false });
    });
    if(this.props.location.search){
      var x = this.props.location.search.replace('?', '-').replace('&', '-');
      x = x.replace('&', '-');
      var str = x.split('-');
      str.shift()
      str.shift()
      var orderId = str[1].replace('orderId=', '');
      var trackId = str[0].replace('trackId=', '');
    
      return axios.post('https://gateway.zibal.ir/v1/verify', {
        "merchant": "5cac3f6918f93466a100c6ec",
        "trackId": trackId
      })
        .then(response => {
          return axios.post(`${config.domain}/user/order/${orderId}/pay/${trackId}`, {
            "amount": response.data.amount,
            "paymentContent": [{
              "cardNumber": response.data.cardNumber,
              "description": response.data.description,
              "message": response.data.message,
              "paidAt": response.data.paidAt,
              "refNumber": response.data.refNumber,
              "status": response.data.status,
            }]
          })
            .then(result => {
              if (result.status === 200) {
                alert('خرید با موفقیت انجام شد')
                window.open(`https://tafriheman.net/clubs/${this.props.match.params.clubId}`, '_blank')
              }
            })
            .catch(e => {
            });
         
        })
        .catch(e => {
          alert('خطا در خرید')
        });
    }
  }

  handlePrintClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClickOpen = (product, productName, selectedProduct) => {
    if (localStorage.getItem('user_token')) {
      this.setState({ open: true, product: product, productName: productName, selectedProduct: selectedProduct});
    }
    else{
     this.setState({
       openLogin:true,
       product, 
       productName,
       selectedProduct: selectedProduct
     })
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
  }
  AddOrderClub=()=>{
    this.setState({
      disabledBuy:true
    })
    var decoded = jwtDecode(localStorage.getItem('user_token'));
        let order={
          customer: decoded.user._id,
          productOrders:[{
            product:this.state.product,
            count:this.state.count

          }]
        };
      this.props.AddOrderClub(order, this.props.match.params.clubId).then((response)=>{
        if (response.status === 201 && this.state.selectedProduct.price===0){
          return axios.patch(`${config.domain}/user/order/${response.data._id}/pay/1`)
            .then(result => {
              if (result.status === 200) {
                return axios.post(`${config.domain}/user/order/${response.data._id}/pay/1`, {
                  "amount": response.data.orderPrice,
                  "paymentContent": [{
                   
                  }]
                })
                  .then(result => {
                    if (result.status === 200) {
                      alert('خرید با موفقیت انجام شد');
                      this.setState({
                        open: false,
                        disabledBuy: false
                      })
                    }
                  })
                  .catch(e => {
                  });
              }
            })
            .catch(e => {
            });
        }
        if (response.status===201){
          var params = {
            "merchant": "5cac3f6918f93466a100c6ec",
            "amount": response.data.orderPrice,
            "callbackUrl": `https://tafriheman.net/clubs/${this.props.match.params.clubId}`,
            "description": response.data.customerName,
            "orderId": response.data._id
          };
          return axios.post('https://gateway.zibal.ir/v1/request', params)
            .then(result => { 
              if (result.status===200){
                return axios.patch(`${config.domain}/user/order/${response.data._id}/pay/${result.data.trackId}`)
                  .then(response => {
                    if (response.status === 200) {
                    window.open(`https://gateway.zibal.ir/start/${result.data.trackId}`, '_blank')
                    }
                  })
                  .catch(e => {
                  });
              }
          
            
            })
            .catch(e =>{
            });
        }
      })
    }


  handleClose = () => {
    this.setState({
      openLogin: false,
      step: 0,
      error: '',
      code: '',
      mobile: '',
      full_name: '',
      gender: 'female',
      marital_status: 'single',
      day: 1,
      month: 1,
      year: 1300,
    });
  }
  onSubmit = () => {
    this.setState({
      disabledRegister: true
    }, () => {
        if (this.state.step === 0) {
          if (this.state.mobile.length === 0) {
            this.setState({
              error: 'لطفا شماره موبایل را وارد نمایید',
              disabledRegister: false
            })
            return;
          }
          this.props.clubMembership(this.state.mobile).then((response) => {
            if (response.status === 200) {
              this.setState({
                step: 1,
                error: '',
                disabledRegister: false
              })
            }
            else{
              this.setState({
                error: 'َشماره تلفن شما معتبر نیست',
                disabledRegister: false
              })
            }
          });

        }
        else if (this.state.step === 1) {
          if (this.state.code.length === 0) {
            this.setState({
              error: 'لطفا کد را وارد نمایید',
              disabledRegister: false
            })
            return;
          }
          this.props.clubMembershipVerify(this.state.mobile, this.state.code).then((response) => {
            if (response.status === 200) {
              if (response.data.user.status_register) {
                alert('با موفقیت عضو شدید.')
                this.setState({
                  openLogin: false,
                  error: '',
                  step: 0,
                  disabledRegister: false
                })
              }
              else {
                this.setState({
                  step: 2,
                  userId: response.data.user._id,
                  error: '',
                  disabledRegister: false
                })
              }
            }
            else {
              this.setState({
                error: 'َکد وارد شده معتبر نیست',
                disabledRegister: false
              })
            }
          });
        }
        else if (this.state.step === 2) {
          if (this.state.full_name.length === 0) {
            this.setState({
              error: 'لطفا نام و نام خانوادگی را وارد نمایید',
              disabledRegister:false
            })
            return;
          }
          let birth_date = '';
          let month = this.state.month < 10 ? '0' + this.state.month : this.state.month;
          if (this.state.year !== 1300) {
            birth_date = `${this.state.year}/${month}/${this.state.day}`;
          }

          this.props.completeClubMembership(this.state.full_name, birth_date, this.state.gender, this.state.marital_status, this.state.userId).then((response) => {
            if (response.status === 200) {
              this.setState({
                openLogin: false,
                step: 0,
                code: '',
                mobile: '',
                error: '',
                full_name: '',
                gender: 'female',
                marital_status: 'single',
                day: 1,
                month: 1,
                year: 1300,
                open: true,
                disabledRegister: false
              });
            }
          });
        }
    });
  } 
  
  backToStepZero = () => {
    this.setState({
      step: 0
    })
  }

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  }
  handleChangePosition = event => {
    this.setState({ marital_status: event.target.value });
  }
  render() {
    const { anchorEl } = this.state;
    const { isClubProfile, classes,} = this.props;
    const month = [
      {
        value: 1,
        text: 'فروردین'

      },
      {
        value: 2,
        text: 'اردیبهشت'
      },
      {
        value: 3,
        text: 'خرداد'
      },
      {
        value: 4,
        text: 'تیر'
      },
      {
        value: 5,
        text: 'مرداد'
      },
      {
        value: 6,
        text: 'شهریور'
      },
      {
        value: 7,
        text: 'مهر'
      },
      {
        value: 8,
        text: 'آبان'
      },
      {
        value: 9,
        text: 'آذر'
      },
      {
        value: 10,
        text: 'دی'
      },
      {
        value: 11,
        text: 'بهمن'
      },
      {
        value: 12,
        text: 'اسفند'
      },

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
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingTop: isClubProfile ? 30 : 0
        }}
      >
        <Dialog
          open={this.state.openLogin}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"

        >
          <DialogContent>
            <TextField
              className={classes.inputStyle}
              error={this.state.error.length > 0}
              id="standard-error"
              value={this.state.step === 0 ? this.state.mobile : ((this.state.step === 1 && this.state.step !== 0) ? this.state.code : this.state.full_name)}
              label={this.state.error.length > 0 ? this.state.error : (this.state.step === 0 ? "شماره موبایل" : ((this.state.step === 1 && this.state.step !== 0) ? "کد فعالسازی" : 'نام و نام خانوادگی'))}
              margin="normal"
              onChange={(event) => {
                if (this.state.step === 0) {
                  this.setState({
                    mobile: event.target.value
                  })
                }
                else if (this.state.step === 1) {
                  this.setState({
                    code: event.target.value
                  })
                }
                else if (this.state.step === 2) {
                  this.setState({
                    full_name: event.target.value
                  })
                }

              }}
            />
            <br />
            {
              this.state.step === 2 && <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="day-simple">روز</InputLabel>
                  <Select
                    value={this.state.day}
                    onChange={this.handleChangeBirthday}
                    inputProps={{
                      name: 'day',
                      id: 'day-simple',
                    }}
                  >
                    {
                      days.map((m, index) => {
                        return <MenuItem value={m.value}>{m.text}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="month-helper">ماه</InputLabel>
                  <Select
                    value={this.state.month}
                    onChange={this.handleChangeBirthday}
                    input={<Input name="month" id="month-helper" />}
                  >
                    {
                      month.map((m, index) => {
                        return <MenuItem value={m.value}>{m.text}</MenuItem>
                      })
                    }

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
                    {
                      years.map((y, i) => {
                        return <MenuItem value={y.value}>{y.text}</MenuItem>
                      })
                    }

                  </Select>

                </FormControl>

              </form>
            }
            {
              this.state.step === 2 &&
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
            }


          </DialogContent>
          <DialogActions>
            <Button onClick={this.state.step === 0 ? this.handleClose : this.backToStepZero} color="secondary">
              {
                this.state.step !== 1 ? 'انصراف' : 'بازگشت و اصلاح شماره'
              }

            </Button>
            <Button variant="contained" onClick={this.onSubmit} color="primary" autoFocus disabled={this.state.disabledRegister}>
              {this.state.disabledRegister ? 'لطفا منتطر بمانید' : this.state.step !== 1 ? 'ثبت نام/ورود' : 'تایید/ورود'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`خرید محصول ${this.state.productName}`}</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-name"
              label="تعداد"
              value={this.state.count}
              onChange={this.handleChange('count')}
              margin="normal"
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary" autoFocus>
              انصراف
            </Button>
            <Button onClick={this.AddOrderClub} color="primary" variant="contained" disabled={this.state.disabledBuy}>
              {this.state.disabledBuy ? 'منتظر بمانید' : 'خرید'}
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
        {
          this.state.loading ? <CircularProgress className={classes.progress} /> :
        
      <Grid container spacing={16}>
        {this.state.products.map(item => {
          return (
            <Grid item xs={12} lg={3} md={2} spacing={16}>
            <Card>
              <div style={{ height: 150 }}>
                <Carousel showThumbs={false} showStatus={false}>
                  {item.images.map(img => {
                    return (
                      <div style={{ height: 150 }}>
                        <img style={{ height: 150 }} src={`${config.domain}/${img}`} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>

              <div
                style={{
                  height: 70,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
              {
                isClubProfile && 
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      style={{
                        padding: 5
                      }}
                    >
                      {item.name}
                    </Typography>
                    <div>
                      <IconButton
                        style={{ padding: 0 }}
                        aria-owns={anchorEl ? "simple-menu" : null}
                        onClick={this.handlePrintClick}
                      >
                        <Button
                          style={{ fontSize: 16, padding: 0 }}
                          onClick={() => this.handleClickOpen(item._id, item.name,item)}
                        >
                          خرید
                          <Basket style={{ fontSize: 20 }} />
                        </Button>
                      </IconButton>
                    </div>
                  </div>
              }
                { !isClubProfile &&
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    style={{
                      padding: 5
                    }}
                  >
                    {item.name}
                  </Typography>
                  <div>
                    <IconButton
                      style={{ padding: 0 }}
                      aria-owns={anchorEl ? "simple-menu" : null}
                      onClick={this.handlePrintClick}
                    >
                      <MoreIcon />
                    </IconButton>

                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                      style={{
                        marginTop: 50,
                        marginLeft: 30,
                        direction: "rtl"
                      }}
                    >
                      <MenuItem onClick={this.handleClose}>
                        <Button
                          style={{ fontSize: 16, padding: 0 }}
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
                          <EditIcon style={{ fontSize: 20 }} />
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                          <Button
                            style={{ fontSize: 16, padding: 0 }}
                            onClick={() => this.handleClickOpen(item._id, item.name)}
                          >
                            خرید
                          <Basket style={{ fontSize: 20 }} />
                          </Button>
              
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Typography style={{ marginRight: 5 }}>اپشن</Typography>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Typography style={{ marginRight: 5 }}>اپشن</Typography>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                }
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                    {
                          item.price === 0 ? 'رایگان' : `${item.price / 10} تومان`
                    }
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
           </Grid>
          );
        })}
        </Grid>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ app, productProductList }) => {
  return { ...app, ...productProductList };
};

export default withRouter(compose(
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
    }
  )
)(ProductList));

import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import { connect } from "react-redux";
import {
  productProductListFetchProdcuts,
  productProductEditSetForm,
  AddOrderClub
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
  TextField
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
import queryString from 'query-string';
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      anchorEl: null,
      open: false,
      count:1,
      productName:''
    };
  }

  componentWillMount() {
    let params = queryString.parse(this.props.location.search);

    const {
      isClubProfile,
      productProductListFetchProdcuts,
      pageSize
    } = this.props;
    let club_id = null
    club_id = isClubProfile ? this.props.match.params.clubId : this.props.club._id
    // console.log(club_id)

    productProductListFetchProdcuts(club_id, 1, pageSize, () => {
      this.setState({ products: this.props.products });
    });
    if(this.props.location.search){
      return axios.post('https://gateway.zibal.ir/v1/verify', {
        "merchant": "5cac3f6918f93466a100c6ec",
        "trackId": params.trackId
      })
        .then(response => {
          alert('خرید با موفقیت انجام شد')
          window.open(`https://tafriheman.net/clubs/${this.props.match.params.clubId}`, '_blank')
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
  handleClickOpen = (product, productName) => {
    this.setState({ open: true, product: product, productName: productName});
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  AddOrderClub=()=>{
    var decoded = jwtDecode(localStorage.getItem('user_token'));
    let order={
      customer: decoded.user._id,
      productOrders:[{
        product:this.state.product,
        count:this.state.count

      }]
    };
    this.props.AddOrderClub(order, this.props.match.params.clubId).then((response)=>{
      if (response.status===201){
        var params = {
          "merchant": "5cac3f6918f93466a100c6ec",
          "amount": response.data.orderPrice,
          "callbackUrl": `https://tafriheman.net/clubs/${this.props.match.params.clubId}`,
          "description": response.data.customerName,
          "orderId": response.data._id,
          "mobile": "09123456789"
        };
        return axios.post('https://gateway.zibal.ir/v1/request', params)
          .then(response => { 
            window.open(`https://gateway.zibal.ir/start/${response.data.trackId}`, '_blank')
           })
          .catch(e =>{
          });
      }
    })
  }
  render() {
    const { anchorEl } = this.state;
    const {isClubProfile} = this.props
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
            <Button onClick={this.AddOrderClub} color="primary">
              خرید
            </Button>
            <Button onClick={this.handleClickClose} color="primary" autoFocus>
              انصراف
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

        {this.state.products.map(item => {
          return (
            <Card style={{ width: "24%" }}>
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
                          onClick={() => this.handleClickOpen(item._id, item.name)}
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
                        <Typography style={{ marginRight: 5 }}>اپشن</Typography>
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
                      {item.price} تومان
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ app, productProductList }) => {
  return { ...app, ...productProductList };
};

export default withRouter(compose(
  connect(
    mapStateToProps,
    {
      productProductListFetchProdcuts,
      productProductEditSetForm,
      AddOrderClub
    }
  )
)(ProductList));

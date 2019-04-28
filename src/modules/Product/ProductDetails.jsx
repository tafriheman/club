import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
getProductInfo
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
} from "@material-ui/core";
import compose from "recompose/compose";
import config from "../../config.json";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'; 
import Person from "@material-ui/icons/Person";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import Basket from "@material-ui/icons/ShoppingBasket";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import styles from '../Layout/styles/TopNavbar'
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    productDetails:{},
    loading:true  
    };
  
  }

  componentWillMount() {

    const {
      isClubProfile,
      getProductInfo,
      token,
      productId
    } = this.props;
    let club_id = null
    club_id = isClubProfile ? this.props.match.params.clubId : this.props.club._id;
    let productId_id = null
    productId_id = productId ? productId : this.props.match.params.productId;
    if (window.location.hostname.includes('javaniran.club')){
      club_id ="5ca89c77e1d47c25a0374f51"
    } else if (window.location.hostname.includes('tafriheman.net')){
      club_id = "5bdd57b4397fec163454204e"
    }

    if (this.props.club && this.props.club._id !== '' && window.location.pathname ==='/dashboard/product/list'){
      club_id = this.props.club._id
    }
    getProductInfo(club_id, productId_id, token).then((response)=>{
      this.setState({
        productDetails: response.data[0],
        loading:false
      })
    })
  }
  render() {
    const { anchorEl } = this.state;
    const { isClubProfile, classes,} = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingTop: isClubProfile ? 50 : 50
        }}
      >
       {
          this.state.loading ? 
          <CircularProgress/> :
              <Grid container spacing={16}>
              <Grid item xs={12} lg={6} md={6} spacing={16}>
                <Typography>
                  {this.state.productDetails.description}
                </Typography>
              </Grid>
                    <Grid item xs={12} lg={6} md={6} spacing={16}>
                      <Card>
                        <div style={{ height: 150 }} >
                          <Carousel showThumbs={false} showStatus={false}>
                            {this.state.productDetails.images.map((item, index) => {
                              return (
                                <div style={{ height: 150 }} key={index}>
                                  <img style={{ height: 150 }} src={`${config.domain}/${item}`} />
                                </div>
                              );
                            })}
                          </Carousel>
                        </div>
                      </Card>
                  </Grid>
          </Grid>    

       }
      </div>
    );
  }
}
ProductDetails.contextTypes = {
  router: PropTypes.object
};
const mapStateToProps = ({ app, productProductList }) => {
  return { ...app, ...productProductList };
};

export default withRouter(compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
     getProductInfo
    }
  )
)(ProductDetails));

import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {
  getProductInfo
} from "../../redux/actions";
import {
  Card,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Fab
} from "@material-ui/core";
import compose from "recompose/compose";
import config from "../../config.json";
import { Carousel } from "react-responsive-carousel";
import Rate from 'rc-rate';
import "react-responsive-carousel/lib/styles/carousel.css";
import "rc-rate/assets/index.css";
import styles from '../Layout/styles/TopNavbar';
import AddIcon from '@material-ui/icons/ArrowBack';
// import Icon from '@material-ui/core/Icon';
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},
      loading: true
    };

  }

  componentWillMount() {

    const {
      getProductInfo,
      productId
    } = this.props;
    let productId_id = null
    productId_id = productId ? productId : this.props.match.params.productId;

    getProductInfo(productId_id).then((response) => {
      this.setState({
        productDetails: response.data[0],
        loading: false
      })
    })
  }
  render() {
    return (
      <div>
        {
          window.innerWidth< 768 &&
        <Grid container
          direction="row"
          justify="flex-end"
          alignItems="flex-end">
        <Link  to={`/clubs/${this.state.productDetails.club}`}>
          <AddIcon />
        </Link>
        </Grid>
        }
        <div
          style={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            display: 'flex',
            paddingRight: window.innerWidth < 768 ? 20 : 0,
            paddingLeft: window.innerWidth < 768 ? 20 : 0
      }}
    >
          {
            this.state.loading ?
              <CircularProgress /> :
              <Grid container spacing={16}>
                <Grid item xs={12} lg={6} md={6} spacing={16}>
                  <Typography>
                    {this.state.productDetails.name}
                  </Typography>
                  <Typography>
                    {this.state.productDetails.description}
                  </Typography>
                  {
                    window.innerWidth > 670 &&
                    <Grid container>
                      <Grid item xs={6} lg={6} md={6} spacing={20}>
                        {
                          this.state.productDetails.price === 0 ? 'رایگان' : this.state.productDetails.price
                        }
                      </Grid>
                      <Grid item xs={6} lg={6} md={6} spacing={20} style={{ textAlign: 'left' }}>
                        <Rate count={3} disabled={true} value={5} />
                      </Grid>
                      <Grid item xs={6} lg={6} md={6} spacing={20}>
                        {this.state.productDetails.point} امتیاز
                </Grid>
                      <Grid item xs={6} lg={6} md={6} spacing={20} style={{ textAlign: 'left' }}>
                        {/*<Button variant="contained">خرید</Button> */}
                      </Grid>
                    </Grid>
                  }

                </Grid>
                <Grid item xs={12} lg={6} md={6} spacing={16}>
                  <Card>
                    <div style={{ height: 'auto' }} >
                      <Carousel showThumbs={false} showStatus={false}>
                        {this.state.productDetails.images.map((item, index) => {
                          return (
                            <div style={{ height: 'auto' }} key={index}>
                              <img style={{ height: 'auto' }} src={`${config.domain}/${item}`} />
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>

                  </Card>
                </Grid>
                {
                  window.innerWidth < 670 &&
                  <Grid item xs={6} lg={6} md={6} spacing={20}>
                    {
                      this.state.productDetails.price === 0 ? 'رایگان' : this.state.productDetails.price
                    }
                  </Grid>
                }
                {
                  window.innerWidth < 670 && <Grid item xs={6} lg={6} md={6} spacing={20} style={{ textAlign: 'left' }}>
                    <Rate count={3} disabled={true} value={5} />
                  </Grid>
                }
                {
                  window.innerWidth < 670 && <Grid item xs={6} lg={6} md={6} spacing={20}>
                    {this.state.productDetails.point} امتیاز
              </Grid>
                }
                {
                  window.innerWidth < 670 && <Grid item xs={6} lg={6} md={6} spacing={20} style={{ textAlign: 'left' }}>
                    {/*<Button variant="contained">خرید</Button> */}
                  </Grid>
                }
              </Grid>

          }
        </div>

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

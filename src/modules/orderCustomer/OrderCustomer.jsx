import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import {
  getCustomerOrder
} from "../../redux/actions/order/orderAction";
import compose from "recompose/compose";
import moment from "jalali-moment";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@material-ui/core";
import "../../assets/css/global/index.css";
import SideBarLayout from "../Layout/SidebarLayout"
import TopNavbar from "../Layout/TopNavbar";
import jwtDecode from 'jwt-decode';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class OrderCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  const{getCustomerOrder}=this.props;
  
    if (localStorage.getItem('user_token')){
      var decoded = jwtDecode(localStorage.getItem('user_token'));
      getCustomerOrder(decoded.user._id);
    }
    
  }
 georgianToPersianDate = date => {
    let persianDate = moment(date)
      .locale("fa")
      .format("YYYY/M/D");
    return persianDate;
  };
  render() {
    const { classes } = this.props;
    const { customerOrders, loadingCustomerOrder}=this.props;
    console.log('customerOrders', customerOrders)
    return (
      <div className="sectin__container" style={{ display: "flex" }}>
        <TopNavbar  />
        <SideBarLayout isClubProfile />
        <div
          className="sectin__divContainer"
          style={{
            marginTop:70,
            marginRight:30
          }}
        >
        {
           loadingCustomerOrder ?  <CircularProgress className={classes.progress} /> :
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>نام</TableCell>
                      <TableCell align="right">قیمت</TableCell>
                      <TableCell align="right">شناسه پرداخت</TableCell>
                      <TableCell align="right">تاریخ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customerOrders.map((row,index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.customerName}
                        </TableCell>
                        <TableCell align="right">{row.orderPrice===0? 'رایگان' : row.orderPrice}</TableCell>
                        <TableCell align="right">{row.orderPaymentId}</TableCell>
                        <TableCell align="right"> {this.georgianToPersianDate(row.created_at_time)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
        }
          
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customerOrders,loadingCustomerOrder}=state.order;
  return {
    customerOrders,
    loadingCustomerOrder
  };
};

export default withRouter(compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getCustomerOrder
    }
  )
)(OrderCustomer));
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
import ReactPaginate from "react-paginate";
import {Link} from 'react-router-dom';
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
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
  const{getCustomerOrder,pageSize}=this.props;
  
    if (localStorage.getItem('user_token')){
      debugger
      var decoded = jwtDecode(localStorage.getItem('user_token'));
      getCustomerOrder(decoded.user._id, 1, pageSize);
    }
    
  }
 georgianToPersianDate = date => {
    let persianDate = moment(date)
      .locale("fa")
      .format("YYYY/M/D");
    return persianDate;
  };
  handlePageClick(data) {
    const { getCustomerOrder, pageSize } = this.props;
    if (localStorage.getItem('user_token')) {
      var decoded = jwtDecode(localStorage.getItem('user_token'));
      getCustomerOrder(decoded.user._id, data.selected + 1, 8);
    }
  }
  renderPagination() {
    const { orderTotalCustomer } = this.props;
    if (orderTotalCustomer > 8)
      return (
        <ReactPaginate
          previousLabel={"قبلی"}
          nextLabel={"بعدی"}
          breakLabel={<a className="page-link">...</a>}
          pageCount={Math.ceil(orderTotalCustomer / 8)}
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
    const { classes } = this.props;
    const { customerOrders, loadingCustomerOrder}=this.props;
    if (!localStorage.getItem('user_token')) {
      return <div className='_error_login'>لطفابرای مشاهده لیست سفارشات <Link to='/'>لاگین</Link> کنید</div>
      }
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
                          {row.customerName}s
                        </TableCell>
                        <TableCell align="right">{row.orderPrice===0? 'رایگان' : row.orderPrice/10}</TableCell>
                        <TableCell align="right">{row.orderPaymentId}</TableCell>
                        <TableCell align="right"> {this.georgianToPersianDate(row.created_at_time)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {this.renderPagination()}
              </Paper>
        }
          
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customerOrders, loadingCustomerOrder, orderTotalCustomer, pageSize}=state.order;
  return {
    customerOrders,
    loadingCustomerOrder, orderTotalCustomer, pageSize
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
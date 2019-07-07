import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles"
import { getCustomerOrder } from "../../redux/actions/order/orderAction";
import compose from "recompose/compose";
import "../../assets/css/global/index.css";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Avatar } from "@material-ui/core";
import classNames from "classnames";
import People from "@material-ui/icons/People";
import Star from "@material-ui/icons/Star";
import HowToReg from "@material-ui/icons/HowToReg";
import AppBar from '@material-ui/core/AppBar';
import AttachMoney from "@material-ui/icons/AttachMoney";
import Score from "@material-ui/icons/Score";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { Textfit } from "react-textfit";
import ReactPaginate from "react-paginate";
import moment from "jalali-moment";
import styles from './styles/CustomerHistory.js';
import Typography from '@material-ui/core/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#2000b0',
    color: theme.palette.common.white,
    fontSize: 18
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class CustomerHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
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

  georgianToPersianDate = date => {
    let persianDate = moment(date)
      .locale("fa")
      .format("YYYY/M/D");
    return persianDate;
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="section__container" style={{ display: "flex" }}>
        <TopNavbar isClubProfile />
        <SideBarLayout isClubProfile />
        <div
          className="section__divContainer"
          style={{
            alignSelf: 'center',
            width: '70%',
            paddingTop: '120px',
            marginBottom: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Paper square="true" className={styles.paper}>
            <br />
            <Avatar
              src={require("../Layout/ClubProfile/user.png")}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <br />
            <Textfit className={classes.Textfit}>
              <b>مهسا سیادتان</b>
            </Textfit>

            <br /><br />

            <div style={{ flexGrow: 1 }}>
              <Grid container
                direction="row"
                justify="space-between"
                spacing={3}
                className={classes.containerGrid}
              >
                <Grid item xs={4}>
                  <Paper square="true" className={classes.paper}>
                    <HowToReg fontSize="large" className={classes.icons} >
                    </HowToReg>
                    <br />
                    100000
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper square="true" className={classes.paper}>
                    <Star fontSize="large" className={classes.icons} >
                    </Star>
                    <br />
                    10000
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper square="true" className={classes.paper}>
                    <People fontSize="large" className={classes.icons}>
                    </People>
                    <br />
                    10
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Paper>

          <br />
          <div style={{ flexGrow: 1, width: '100%', backgroundColor: 'theme.palette.background.paper' }}>
            <Paper square="true" className={classes.root}>
              <AppBar position="static" color="aqua">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="on"
                >
                  <Tab label="تاریخچه اعتبارات" icon={<AttachMoney />} />
                  <Tab label="تاریخچه امتیازات" icon={<Score />} />
                  <Tab label="تاریخچه سطح کابری" icon={<PersonPinIcon />} />
                </Tabs>
              </AppBar>

              {this.state.value === 0 &&
                <TabContainer>
                  <Table className={classes.table} >
                    <TableHead className={classes.table}>
                      <StyledTableRow>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          مقدار
                      </StyledTableCell>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          شناسه پرداخت
                      </StyledTableCell>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          تاریخ
                      </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {/* {customerOrders.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={classes.tableCell} component="th" scope="row">
                            {row.customerName}
                          </StyledTableCell>
                          <StyledTableCell className={classes.tableCell} >
                            {row.orderPrice === 0 ? 'رایگان' : row.orderPrice / 10}</StyledTableCell>
                          <StyledTableCell className={classes.tableCell} > {row.orderPaymentId} </StyledTableCell>
                          <StyledTableCell className={classes.tableCell} > {this.georgianToPersianDate(row.created_at_time)}</StyledTableCell>
                        </StyledTableRow >
                      ))} */}
                    </TableBody>
                  </Table>
                </TabContainer>}
              {this.state.value === 1 &&
                <TabContainer>
                  <Table className={classes.table} >
                    <TableHead className={classes.table}>
                      <StyledTableRow>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          مقدار
                      </StyledTableCell>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          روش افزایش
                      </StyledTableCell>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          تاریخ
                      </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {/* {customerOrders.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={classes.tableCell} component="th" scope="row">
                            {row.customerName}
                          </StyledTableCell>
                          <StyledTableCell className={classes.tableCell} >
                            {row.orderPrice === 0 ? 'رایگان' : row.orderPrice / 10}</StyledTableCell>
                          <StyledTableCell className={classes.tableCell} > {row.orderPaymentId} </StyledTableCell>
                          <StyledTableCell className={classes.tableCell} > {this.georgianToPersianDate(row.created_at_time)}</StyledTableCell>
                        </StyledTableRow >
                      ))} */}
                    </TableBody>
                  </Table>
                </TabContainer>}
              {this.state.value === 2 &&
                <TabContainer>
                  <Table className={classes.table} >
                    <TableHead className={classes.table}>
                      <StyledTableRow>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          سطح کابر
                      </StyledTableCell>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          قیمت
                      </StyledTableCell>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          شناسه
                      </StyledTableCell>
                        <StyledTableCell className={classes.tableCell}
                          style={{ color: 'white' }}>
                          تاریخ
                      </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {/* {customerOrders.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={classes.tableCell} component="th" scope="row">
                            {row.customerName}
                          </StyledTableCell>
                          <StyledTableCell className={classes.tableCell} >
                            {row.orderPrice === 0 ? 'رایگان' : row.orderPrice / 10}</StyledTableCell>
                          <StyledTableCell className={classes.tableCell} > {row.orderPaymentId} </StyledTableCell>
                          <StyledTableCell className={classes.tableCell} > {this.georgianToPersianDate(row.created_at_time)}</StyledTableCell>
                        </StyledTableRow >
                      ))} */}
                    </TableBody>
                  </Table>
                </TabContainer>}
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { customerOrders, loadingCustomerOrder, orderTotalCustomer, pageSize } = state.order;
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
)(CustomerHistory));
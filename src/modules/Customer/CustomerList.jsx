import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import {
  customerCustomerListFetchCustomers,
  customerCustomerListChangeQuery,
  customerCustomerEditSetCustomer
} from '../../redux/actions';
import {
  Grid,
  Typography,
  withStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
} from '@material-ui/core';
import { Search, Edit } from '@material-ui/icons';
import compose from 'recompose/compose';
import styles from './styles/CustomerList';

class CustomerList extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { token, club, pageSize, customerCustomerListFetchCustomers, query } = this.props;

    customerCustomerListFetchCustomers(club._id, 1, pageSize, query, token);
  }

  handlePageClick(data) {
    const { token, club, pageSize, customerCustomerListFetchCustomers, query } = this.props;

    customerCustomerListFetchCustomers(club._id, data.selected + 1, pageSize, query, token);
  }

  search() {
    const { token, club, pageSize, customerCustomerListFetchCustomers, query } = this.props;

    customerCustomerListFetchCustomers(club._id, 1, pageSize, query, token);
  }

  renderPagination() {
    const { total, pageSize } = this.props;
    if (total != 0 && total > pageSize)
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
    const { 
      classes, 
      customers, 
      query,
      customerCustomerListChangeQuery,
      customerCustomerEditSetCustomer
    } = this.props;

    console.log(customers);

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>لیست مشتریان</Typography>
        {
          customers.length !== 0 ?
          <Grid item container direction="row-reverse" alignItems="center">
            <Button 
              variant="fab" 
              color="primary" 
              mini
              onClick={this.search.bind(this)}
              >
              <Search />
            </Button>
            <TextField 
              placeholder="‌نام مشتری، شماره تماس...را جستوجو کنید"
              variant="outlined"
              margin="dense"
              style={{ marginLeft: '10px', width: '350px' }}
              value={query}
              onChange={e => customerCustomerListChangeQuery(e.target.value)}
            />
          </Grid> : ''
        }
        <Grid item className={classes.paperContainer}>
          {
            customers.length ===  0 ? <Typography variant="body1" align="right" style={{ marginTop: '20px' }}>شما مشتری ندارید</Typography> :
            (<Paper classes={{ root: classes.paperRoot }}>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>نام و نام خانوادگی</TableCell>
                    <TableCell numeric>تاریخ تولد</TableCell>
                    <TableCell numeric>شهر</TableCell>
                    <TableCell numeric>شغل</TableCell>
                    <TableCell numeric>شماره همراه</TableCell>
                    <TableCell numeric>ویرایش</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    customers.map(customer => {
                      return (
                        <TableRow key={customer._id}>
                          <TableCell numeric component="th" scope="row">{customer.full_name}</TableCell>
                          <TableCell numeric component="th" scope="row">{customer.birth_date}</TableCell>
                          <TableCell numeric component="th" scope="row">{customer.city}</TableCell>
                          <TableCell numeric component="th" scope="row">{customer.job}</TableCell>
                          <TableCell numeric component="th" scope="row">{customer.phone}</TableCell>
                          <TableCell numeric component="th" scope="row">
                            <Button
                              variant="fab"
                              mini
                              style={{ background: '#00a152' }}
                              onClick={() => customerCustomerEditSetCustomer(customer, this.props.history)}
                            >
                              <Edit style={{ color: 'white' }}/>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                }
                </TableBody>
            </Table>
            </Paper>)
          }
        </Grid>
        { this.renderPagination() }
      </Grid>
    );
  }
}

const mapStateToProps = ({ app, customerCustomerList }) => {
  return { ...app, ...customerCustomerList };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    customerCustomerListFetchCustomers,
    customerCustomerListChangeQuery,
    customerCustomerEditSetCustomer
  })
)(CustomerList);
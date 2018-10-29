import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import {
  customerCustomerListFetchCustomers
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
  TableRow
} from '@material-ui/core';
import compose from 'recompose/compose';
import styles from './styles/CustomerList';

class CustomerList extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { token, club, pageSize, customerCustomerListFetchCustomers } = this.props;

    customerCustomerListFetchCustomers(club._id, 1, pageSize, token);
  }

  handlePageClick(data) {
    const { token, club, pageSize, customerCustomerListFetchCustomers } = this.props;

    customerCustomerListFetchCustomers(club._id, data.selected + 1, pageSize, token);
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
    const { classes, customers } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="title" className={classes.header}>لیست مشتریان</Typography>
        <Grid item className={classes.paperContainer}>
          {
            customers.length ===  0 ? <Typography variant="body1" align="right" style={{ marginTop: '20px' }}>شما مشتری ندارید</Typography> :
            (<Paper classes={{ root: classes.paperRoot }}>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>نام</TableCell>
                    <TableCell numeric>نام خانوادگی</TableCell>
                    <TableCell numeric>شماره همراه</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    customers.map(customer => {
                      return (
                        <TableRow key={customer._id}>
                          <TableCell numeric component="th" scope="row">{customer.first_name}</TableCell>
                          <TableCell numeric component="th" scope="row">{customer.last_name}</TableCell>
                          <TableCell numeric component="th" scope="row">{customer.phone}</TableCell>
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
    customerCustomerListFetchCustomers
  })
)(CustomerList);
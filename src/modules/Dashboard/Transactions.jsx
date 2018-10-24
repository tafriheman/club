import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  withStyles
} from '@material-ui/core';
import styles from './styles/Transactions';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import {
  dashboardTransactionsFetchTransactions
} from '../../redux/actions';
import moment from 'jalali-moment';

class Transactions extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { token, club, pageSize, dashboardTransactionsFetchTransactions } = this.props;

    dashboardTransactionsFetchTransactions(club._id, 1, pageSize, token);
  }

  handlePageClick(data) {

    // call fetch data
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
    const { classes, transactions } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="title" align="right" className={classes.header}>تراکنش ها</Typography>
        <Grid item className={classes.paperContainer}>
          {
            transactions.length ===  0 ? <Typography variant="body1" align="right" style={{ marginTop: '20px' }}>تراکنشی وجود ندارد</Typography> :
            (<Paper classes={{ root: classes.paperRoot }}>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>شماره سفارش</TableCell>
                    <TableCell numeric>شماره کارت</TableCell>
                    <TableCell numeric>زمان پرداخت</TableCell>
                    <TableCell numeric>مبلغ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    transactions.map(transaction => {
                      return (
                        <TableRow key={1}>
                          <TableCell numeric component="th" scope="row">{transaction.ref_id}</TableCell>
                          <TableCell numeric component="th" scope="row">{transaction.bank_info ? transaction.bank_info.response.cardNumber : ''}</TableCell>
                          <TableCell numeric component="th" scope="row">{transaction.bank_info ? moment(transaction.bank_info.payment_time).format('jYYYY/jMM/jDD HH:MM') : ''}</TableCell>
                          <TableCell numeric component="th" scope="row">{transaction.price}</TableCell>
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

const mapStateToProps = ({ dashboardTransactions, app }) => {
  return { ...dashboardTransactions, ...app };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    dashboardTransactionsFetchTransactions
  })
)(Transactions);
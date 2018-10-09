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

class Transactions extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {

    // fetch data
  }

  handlePageClick(data) {

    // call fetch data
  }

  renderPagination() {
    const { total, pageSize } = this.props;
    if (total != 0)
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
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="title" align="right" className={classes.header}>تراکنش ها</Typography>
        <Grid item className={classes.paperContainer}>
          <Paper classes={{ root: classes.paperRoot }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell numeric>شماره کارت</TableCell>
                  <TableCell numeric>شماره سفارش</TableCell>
                  <TableCell numeric>شماره ارجاع</TableCell>
                  <TableCell numeric>زمان پرداخت</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1}>
                  <TableCell numeric component="th" scope="row">00000000</TableCell>
                  <TableCell numeric component="th" scope="row">0000000000000000000</TableCell>
                  <TableCell numeric component="th" scope="row">000000000000000</TableCell>
                  <TableCell numeric component="th" scope="row">000000000000</TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell numeric component="th" scope="row">00000000</TableCell>
                  <TableCell numeric component="th" scope="row">0000000000000000000</TableCell>
                  <TableCell numeric component="th" scope="row">000000000000000</TableCell>
                  <TableCell numeric component="th" scope="row">000000000000</TableCell>
                </TableRow>
                <TableRow key={3}>
                  <TableCell numeric component="th" scope="row">00000000</TableCell>
                  <TableCell numeric component="th" scope="row">0000000000000000000</TableCell>
                  <TableCell numeric component="th" scope="row">000000000000000</TableCell>
                  <TableCell numeric component="th" scope="row">000000000000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        { this.renderPagination() }
      </Grid>
    );
  }
}

const mapStateToProps = ({ dashboardTransactions }) => {
  return { ...dashboardTransactions };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null)
)(Transactions);
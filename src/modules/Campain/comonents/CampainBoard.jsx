import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import {
  campainCampainListToggleCampainBoard,
  campainCampainListFetchUsers
} from '../../../redux/actions';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography
} from '@material-ui/core';

class CampainBoard extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(data) {
    const { token, club, board, campainCampainListFetchUsers } = this.props;

    campainCampainListFetchUsers(club._id, board.campain , data.selected + 1, board.pageSize, token,);
  }


  renderPagination() {
    const { board } = this.props;
    let total = board.total;
    let pageSize = board.pageSize;

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
      board,
      campainCampainListToggleCampainBoard,
    } = this.props;

    return (
    <Dialog
      open={board.open}
      onClose={() => campainCampainListToggleCampainBoard('')}
      fullWidth
      maxWidth="md"
    >
          <DialogTitle>لیست کاربران</DialogTitle>
          <DialogContent>
            <Grid container direction="row" alignItems="center" spacing={32}>
              <Grid item xs={12} sm={10} md={8}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell numeric>نام و نام خانوادگی</TableCell>
                      <TableCell numeric>امتیاز فعلی</TableCell>
                      <TableCell numeric>امتیاز کلی</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      board.attenders.map(user => {
                        return (
                          <TableRow key={user._id}>
                            <TableCell numeric component="th" scope="row">{user.customer.full_name}</TableCell>
                            <TableCell numeric component="th" scope="row">{user.current_point}</TableCell>
                            <TableCell numeric component="th" scope="row">{user.gained_point}</TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} sm={10} md={4} container direction="column">
                <Grid item container direction="row" alignItems="center">
                  <Typography variant="h6">تعداد کل کاربران</Typography>
                  <Typography variant="body1" style={{ marginRight: '10px' }}>{board.all_attenders}</Typography>
                </Grid>
                <Grid item container direction="row" alignItems="center" style={{ marginTop: '10px' }}>
                  <Typography variant="h6">تعداد کل هدایا</Typography>
                  <Typography variant="body1" style={{ marginRight: '10px' }}>{board.all_issued_gifts}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" alignItems="center">
              {this.renderPagination()}
            </Grid>
          </DialogContent>
        </Dialog>
    );
  }
}

const mapStateToProps = ({ campainCampainList, app }) => {
  return { ...campainCampainList, ...app };
}

export default connect(mapStateToProps, {
  campainCampainListToggleCampainBoard,
  campainCampainListFetchUsers
})(CampainBoard);
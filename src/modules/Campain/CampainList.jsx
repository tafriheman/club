import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import styles from './styles/CampainList';
import ReactPaginate from 'react-paginate';
import CampainListCard from './comonents/CampainListCard';
import {
  campainCampainListFetchCampains,
  campainCampainListChangeProp,
} from '../../redux/actions';
import {
  Grid,
  withStyles,
  Typography,
  Snackbar
} from '@material-ui/core';
import MySnackbarContentWrapper from '../../components/MySnackbarContentWrapper';


class CampainList extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { token, club, campainCampainListFetchCampains, pageSize} = this.props;

    campainCampainListFetchCampains(club._id, token, 1, pageSize);
  }

  handlePageClick(data) {
    const { token, club, pageSize, campainCampainListFetchCampains } = this.props;

    campainCampainListFetchCampains(club._id, token, data.selected + 1, pageSize);
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


  closeError() {
    this.props.campainCampainListChangeProp('error', '')
  }

  render() {
    const { 
      classes,
      campains,
      error,
      history
    } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>لیست کمپین ها</Typography>
        <Grid item className={classes.paperContainer}>
          {
            campains.length ===  0 ? <Typography variant="body1" align="right" style={{ marginTop: '20px' }}>کمپینی وجود ندارد</Typography> :
            <Grid item container direction="row" spacing={16} style={{ marginTop: '20px' }}>
              {
                campains.map(campain => 
                  <CampainListCard  campain={campain} history={history} key={campain._id}/>
                )
              }
            </Grid>
          }
        </Grid>
        {this.renderPagination()}
        <Snackbar
          style={{ marginTop: '20px' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={error.length !== 0}
          autoHideDuration={3000}
          onClose={this.closeError.bind(this)}
        >
          <MySnackbarContentWrapper
            onClose={this.closeError.bind(this)}
            variant="error"
            message={error}
          />
        </Snackbar>
      </Grid>
    );
  }
}

const mapStateToProps = ({ campainCampainList, app }) => {
  return { ...campainCampainList, ...app };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    campainCampainListFetchCampains,
    campainCampainListChangeProp,
  })
)(CampainList);
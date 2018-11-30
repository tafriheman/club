import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import styles from './styles/CampainList';
import ReactPaginate from 'react-paginate';
import config from '../../config.json';
import {
  campainCampainListFetchCampains,
  campainCampainListChangeProp,
  campainCampainListDeleteCampain
} from '../../redux/actions';
import {
  Grid,
  withStyles,
  Typography,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Button,
  Snackbar
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
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

  hasPermission(permission) {
    if (this.props.club.permissions.indexOf(permission) === -1)
      return false;
    return true;
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
      club,
      token,
      total,
      campainCampainListDeleteCampain
    } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>لیست کمپین ها</Typography>
        <Grid item className={classes.paperContainer}>
          {
            campains.length ===  0 ? <Typography variant="body1" align="right" style={{ marginTop: '20px' }}>کمپینی وجود ندارد</Typography> :
            (<Paper classes={{ root: classes.paperRoot }}>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>تصویر</TableCell>
                    <TableCell numeric>نام</TableCell>
                    {
                      (this.hasPermission(config.campain.update) ||
                      this.hasPermission(config.campain.delete)) &&
                      <TableCell numeric>فرآیند ها</TableCell>
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    campains.map(campain => {
                      return (
                        <TableRow key={campain._id}>
                          <TableCell component="th" scope="row" numeric>
                            {
                              campain.images.length === 0 ?
                                <img src={require('../../assets/images/product/no-image.png')} className={classes.campainImage} alt=""/>
                              : <img src={`${config.domain}/${campain.images[0]}`} className={classes.campainImage} alt=""/>
                            }
                          </TableCell>
                          <TableCell numeric component="th" scope="row">{campain.name}</TableCell>
                            {
                              ( 
                                this.hasPermission(config.campain.update) ||
                                this.hasPermission(config.campain.update)
                              )  &&
                              <TableCell numeric component="th" scope="row">
                                <Grid container direction="row">
                                {
                                  this.hasPermission(config.campain.update) &&
                                  <Button
                                    variant="fab"
                                    mini
                                    style={{ background: '#00a152' }}
                                    // onClick={() => productProductEditSetForm({
                                    //   _id: product._id,
                                    //   name: product.name,
                                    //   description: product.description,
                                    //   images: product.images,
                                    //   links: product.links,
                                    //   price: product.price,
                                    //   point: product.point,
                                    //   category: product.category,
                                    //   type: product.type
                                    // }, history)}
                                  >
                                    <Edit style={{ color: 'white' }}/>
                                  </Button>
                                }
                                {
                                  this.hasPermission(config.campain.delete) &&
                                  <Button
                                    variant="fab"
                                    mini
                                    color="secondary"
                                    style={{ marginRight: '5px' }}
                                    onClick={() => campainCampainListDeleteCampain(
                                      club._id, campain._id, token, campains, total
                                    )}
                                  >
                                    <Delete style={{ color: 'white' }}/>
                                  </Button>
                                }
                              </Grid>
                            </TableCell>
                          }
                          
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
            </Table>
            </Paper>)
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
    campainCampainListDeleteCampain
  })
)(CampainList);
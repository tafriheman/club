import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Radio,
  withStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  campainCampainAddToggleProductDialog,
  campainCampainAddFetchProducts,
  campainCampainAddChangeGiftProp
} from '../../../redux/actions';
import config from '../../../config.json';
import styles from '../styles/CampainAdd';
import compose from 'recompose/compose';
import ReactPaginate from 'react-paginate';


class CampainAddProductDialog extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { token, club, pageSize, campainCampainAddFetchProducts } = this.props;

    campainCampainAddFetchProducts(club._id, token, 1, pageSize);
  }

  translateType(type) {
    if(type === 'downloadable') return 'دانلودی';
    if(type === 'physical') return 'غیر دانلودی'
  }

  handlePageClick(data) {
    const { token, club, pageSize, campainCampainAddFetchProducts } = this.props;

    campainCampainAddFetchProducts(club._id, token, data.selected + 1, pageSize);
  }

  renderPagination() {
    const { total, pageSize } = this.props;
    if (total !== 0 && total > pageSize)
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
      productDialogOpen,
      classes,
      products,
      gift,
      campainCampainAddToggleProductDialog,
      campainCampainAddChangeGiftProp
    } = this.props;

    return (
      <Dialog
          open={productDialogOpen}
          onClose={campainCampainAddToggleProductDialog}
          maxWidth="md"
        >
          <DialogTitle>انتخاب محصول</DialogTitle>
          <DialogContent>
            <Grid container direction="column" alignItems="center">
              <Table classes={{ root: classes.tableRoot }}>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>تصویر</TableCell>
                    <TableCell numeric>نام</TableCell>
                    <TableCell numeric>قیمت</TableCell>
                    <TableCell numeric>نوع محصول</TableCell>
                    <TableCell numeric>انتخاب</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    products.map(product => {
                      return (
                        <TableRow key={product._id}>
                          <TableCell component="th" scope="row" numeric>
                            {
                              product.images.length === 0 ?
                                <img src={require('../../../assets/images/product/no-image.png')} className={classes.productImage} alt="product pic"/>
                              : <img src={`${config.domain}/${product.images[0]}`} className={classes.productImage} alt="product pic"/>
                            }
                          </TableCell>
                          <TableCell numeric component="th" scope="row">{product.name}</TableCell>
                          <TableCell numeric component="th" scope="row">{product.price}</TableCell>
                          <TableCell numeric component="th" scope="row">{this.translateType(product.type) }</TableCell>
                          <TableCell numeric component="th" scope="row">
                            <Radio
                              checked={gift.free === product.name}
                              onChange={e => {
                                  campainCampainAddChangeGiftProp('free', e.target.value );
                                  campainCampainAddChangeGiftProp('productName', product.name);
                                }
                              }
                              value={product.name}
                            /> 
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
              {this.renderPagination()}
            </Grid>

          </DialogContent>
        </Dialog>
    );
  }
}

const mapStateToProps = ({ campainCampainAdd, app}) => {
  return { ...campainCampainAdd, ...app };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    campainCampainAddToggleProductDialog,
    campainCampainAddFetchProducts,
    campainCampainAddChangeGiftProp
  })
)(CampainAddProductDialog);
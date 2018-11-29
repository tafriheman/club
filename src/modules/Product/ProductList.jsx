import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  productProductListFetchProdcuts,
  productProductEditSetForm
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
  Button,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import compose from 'recompose/compose';
import styles from './styles/ProductList';
import ReactPaginate from 'react-paginate';
import config from '../../config.json';

class ProductList extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { token, club, productProductListFetchProdcuts, pageSize} = this.props;

    productProductListFetchProdcuts(club._id, token, 1, pageSize);
  }

  handlePageClick(data) {
    const { token, club, pageSize, productProductListFetchProdcuts } = this.props;

    productProductListFetchProdcuts(club._id, token, data.selected + 1, pageSize);
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

  translateType(type) {
    if(type === 'downloadable') return 'دانلودی';
    if(type === 'physical') return 'غیر دانلودی'
  }

  render() {
    const { 
      classes, 
      products,
      history,
      productProductEditSetForm
    } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>لیست محصولات</Typography>
        <Grid item className={classes.paperContainer}>
          {
            products.length ===  0 ? <Typography variant="body1" align="right" style={{ marginTop: '20px' }}>محصولی وجود ندارد</Typography> :
            (<Paper classes={{ root: classes.paperRoot }}>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>تصویر</TableCell>
                    <TableCell numeric>نام</TableCell>
                    <TableCell numeric>قیمت</TableCell>
                    <TableCell numeric>امتیاز</TableCell>
                    <TableCell numeric>نوع محصول</TableCell>
                    <TableCell numeric>ویرایش</TableCell>
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
                                <img src={require('../../assets/images/product/no-image.png')} className={classes.productImage} alt="product pic"/>
                              : <img src={`${config.domain}/${product.images[0]}`} className={classes.productImage} alt="product pic"/>
                            }
                          </TableCell>
                          <TableCell numeric component="th" scope="row">{product.name}</TableCell>
                          <TableCell numeric component="th" scope="row">{product.price}</TableCell>
                          <TableCell numeric component="th" scope="row">{product.point}</TableCell>
                          <TableCell numeric component="th" scope="row">{this.translateType(product.type) }</TableCell>
                          <TableCell numeric component="th" scope="row">
                            <Button
                              variant="fab"
                              mini
                              style={{ background: '#00a152' }}
                              onClick={() => productProductEditSetForm({
                                _id: product._id,
                                name: product.name,
                                description: product.description,
                                images: product.images,
                                links: product.links,
                                price: product.price,
                                point: product.point,
                                category: product.category,
                                type: product.type
                              }, history)}
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
        {this.renderPagination()}
      </Grid>
    );
  }
}

const mapStateToProps = ({ app, productProductList }) => {
  return { ...app, ...productProductList };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    productProductListFetchProdcuts,
    productProductEditSetForm
  })
)(ProductList);
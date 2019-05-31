import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
    Grid,
    CircularProgress ,
    Typography,
    Card,
    CardContent,
    IconButton,
    Badge
} from '@material-ui/core';

import {
    productCustomerListFetchCustomers
} from "../../redux/actions";
import Person from "@material-ui/icons/Person";
import ReactPaginate from "react-paginate";
import SideBarLayout from "../Layout/SidebarLayout"
import TopNavbar from "../Layout/TopNavbar";
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        width: '100%',
        marginTop:80,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});
class ProductCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentWillMount() {

        const {
            productCustomerListFetchCustomers,
            pageSize,
            token
        } = this.props;
        productCustomerListFetchCustomers(token,this.props.match.params.clubId, this.props.match.params.productId, 1, pageSize)

    }
    handlePageClick(data) {
        const {
            pageSize,
            token,
            productCustomerListFetchCustomers,
        } = this.props;

        productCustomerListFetchCustomers(
            token,this.props.match.params.clubId, this.props.match.params.productId, data.selected + 1, pageSize
        );
    }
    renderPagination() {
        const { totalProductCostomers, pageSize } = this.props;
        if (totalProductCostomers != 0 && totalProductCostomers > pageSize)
            return (
                <ReactPaginate
                    previousLabel={"قبلی"}
                    nextLabel={"بعدی"}
                    breakLabel={<a className="page-link">...</a>}
                    pageCount={Math.ceil(totalProductCostomers / pageSize)}
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
        const { classes, productCostomers, frtchingProductCustomers, totalProductCostomers } = this.props;
        console.log('totalProductCostomers', totalProductCostomers, productCostomers)
        return (<div className="sectin__container" style={{ display: "flex" }}>
            <TopNavbar />
            <SideBarLayout  />
            <Grid container direction="column" alignItems="center" style={{ marginTop: 80 }}>
            {
                (parseInt(totalProductCostomers,10) ===0 && !frtchingProductCustomers) ? 
                        <Typography variant="h4" className={classes.header}>هنوز سفارشی برای این محصول ثبت نشده است  </Typography>
                        :
                         <Typography variant="h4" className={classes.header}>
                    لیست مشتریان<IconButton aria-label="Cart">
                                <Badge badgeContent={totalProductCostomers ==='undefined'? 0 :totalProductCostomers} color="primary" max={100000}>
                            <Person />
                        </Badge>
                    </IconButton>
                     </Typography>
            }
                   
                   
                {frtchingProductCustomers ? 
                    <CircularProgress className={classes.progress} />
                    :
                    <Grid container spacing={16}>

                        {productCostomers.map(customer => {
                            return (
                                <Grid item xs={12} lg={3} md={2} spacing={16}>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {customer.full_name !== '' ? customer.full_name : '-'}
                                            </Typography>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {customer.birth_date === '' ? '-' : customer.birth_date}
                                            </Typography>

                                            <Typography className={classes.pos} color="textSecondary">
                                                {customer.city}
                                            </Typography>
                                            <Typography component="p">
                                                {customer.phone}
                                                <br />
                                                {customer.gender === 'male' ? 'مرد' : 'زن'}
                                            </Typography>
                                        </CardContent>
                                  
                                    </Card>
                                </Grid>
                            );
                        })}
                        {this.renderPagination()}
                    </Grid>
                    
                }
                </Grid>
         
            </div>
            );
    }
}
const mapStateToProps = ({ app, productProductList }) => {
    return { ...app, ...productProductList };
};

export default withRouter(compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        {
            productCustomerListFetchCustomers
        }
    )
)(ProductCustomers));

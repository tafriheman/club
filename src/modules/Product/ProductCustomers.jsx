import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
    Grid,
    CircularProgress ,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    LinearProgress
} from '@material-ui/core';

import {
    productCustomerListFetchCustomers
} from "../../redux/actions";
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
            isClubProfile,
            productCustomerListFetchCustomers,
            pageSize
        } = this.props;
        let club_id = null
        club_id = isClubProfile ? this.props.match.params.clubId : this.props.club._id
        productCustomerListFetchCustomers(club_id, this.props.match.params.productId, 1, pageSize)

    }
    handlePageClick(data) {
        const {
            pageSize,
            productCustomerListFetchCustomers,
            isClubProfile
        } = this.props;
        let club_id = null
        club_id = isClubProfile ? this.props.match.params.clubId : this.props.club._id
        productCustomerListFetchCustomers(
            club_id, this.props.match.params.productId, data.selected + 1, pageSize
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
        const { classes, productCostomers, frtchingProductCustomers } = this.props;
        return (<div className="sectin__container" style={{ display: "flex" }}>
            <TopNavbar />
            <SideBarLayout isClubProfile />
            <Grid container direction="column" alignItems="center" style={{ marginTop: 80 }}>
                    <Typography variant="h4" className={classes.header}>
                        لیست مشتریان
                    </Typography>
                {frtchingProductCustomers ? 
                    <CircularProgress className={classes.progress} />
                    :
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">نام</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody align="right">
                                {productCostomers.map(row => (
                                    <TableRow key={row._id} align="right">
                                        <TableCell component="th" scope="row" align="right">
                                            {row.customerName}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {this.renderPagination()}
                    </Paper>
                }
                </Grid>
         
            </div>
            );
    }
}
const mapStateToProps = ({ app, productProductList }) => {
    console.log('productProductList', productProductList)
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

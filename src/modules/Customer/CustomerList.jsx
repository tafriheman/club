import React, { Component } from "react";
import ReactPaginate from "react-paginate";

import { connect } from "react-redux";
import {
  customerCustomerListFetchCustomers,
  customerCustomerListChangeQuery,
  customerCustomerEditSetCustomer
} from "../../redux/actions";
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  withStyles,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent
} from "@material-ui/core";
import { Search, Edit, Speaker } from "@material-ui/icons";
import compose from "recompose/compose";
import styles from "./styles/CustomerList";
import Wastapp from '../../assets/images/global/whatsapp-icon.png'

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const {
      token,
      club,
      pageSize,
      customerCustomerListFetchCustomers,
      customerCustomerListChangeQuery
    } = this.props;

    customerCustomerListChangeQuery("");
    customerCustomerListFetchCustomers(club._id, 1, pageSize, "", token);
  }

  handlePageClick(data) {
    const {
      token,
      club,
      pageSize,
      customerCustomerListFetchCustomers,
      query
    } = this.props;

    customerCustomerListFetchCustomers(
      club._id,
      data.selected + 1,
      pageSize,
      query,
      token
    );
    const { router } = this.context;
    router.history.push(`/dashboard/customers/${data.selected + 1}`)
  }

  search() {
    const {
      token,
      club,
      pageSize,
      customerCustomerListFetchCustomers,
      query
    } = this.props;

    customerCustomerListFetchCustomers(club._id, 1, pageSize, query, token)


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
    const {
      classes,
      customers,
      query,
      customerCustomerListChangeQuery,
      customerCustomerEditSetCustomer,
      total
    } = this.props;

    return (
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4" className={classes.header}>
            لیست مشتریان
        </Typography>


          {customers.length !== 0 ? (
            <Grid item container direction="row-reverse" alignItems="center">
              <Button
                variant="fab"
                color="primary"
                mini
                onClick={this.search.bind(this)}
              >
                <Search />
              </Button>
              <TextField
                placeholder="‌نام مشتری، شماره تماس...را جستوجو کنید"
                variant="outlined"
                margin="dense"
                style={{ marginLeft: "10px", width: "350px" }}
                value={query}
                onChange={e => customerCustomerListChangeQuery(e.target.value)}
              />
            </Grid>
          ) : (
              ""
            )}
        </Grid>

        {customers.length === 0 ? (
          <Typography
            variant="body1"
            align="right"
            style={{ marginTop: "20px" }}
          >
            شما مشتری ندارید
            </Typography>
        ) : (
            <Grid container spacing={16}>

              {customers.map(customer => {
                return (
                  <Grid item xs={12} lg={3} md={2} spacing={16}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                         
                          {customer.full_name!=='' ?customer.full_name : '-'}
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
                          {customer.gender ==='male' ? 'مرد':'زن'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="fab"
                          mini
                          style={{ background: "#00a152" }}
                          onClick={() =>
                            customerCustomerEditSetCustomer(
                              customer,
                              this.props.history
                            )
                          }
                        >
                          <Edit style={{ color: "white" }} />
                        </Button>
                        <img src={Wastapp} style={{ width: 40, height: 40,cursor:'pointer' }} onClick={() =>{
                            let link = `https://api.whatsapp.com/send?phone=+98${ customer.phone }`;
                            window.open(link,'_blank')
                          }} />
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}

            </Grid>
          )}

        {this.renderPagination()}

      </div>
    );
  }
}
CustomerList.contextTypes = {
  router: PropTypes.object
};
const mapStateToProps = ({ app, customerCustomerList }) => {
  return { ...app, ...customerCustomerList };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      customerCustomerListFetchCustomers,
      customerCustomerListChangeQuery,
      customerCustomerEditSetCustomer
    }
  )
)(CustomerList);

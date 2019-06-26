import React, { Component } from "react";
import ReactPaginate from "react-paginate";

import { connect } from "react-redux";
import {
  customerCustomerListFetchCustomers,
  customerCustomerListChangeQuery,
  customerCustomerEditSetCustomer,
  getLabel,
  AddLabelCustomer,
  getCustomerLabels,
  DeleteLabelCutomer
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
  CardContent,
  Tooltip,
  Dialog,
  IconButton,
  Chip
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Description from "@material-ui/icons/Description";
import DoneIcon from "@material-ui/icons/Done";
import compose from "recompose/compose";
import styles from "./styles/CustomerList";
import Wastapp from '../../assets/images/global/whatsapp-icon.png'
import Modal from "../../components/modal";
class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalLabel: false,
      labels: [],
      selectedCustomerId: 0,
      selectedCustomer: {},
      isDelete: false
    }

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCloseLabelButton = this.handleCloseLabelButton.bind(this);
  }

  componentWillMount() {
    const {
      token,
      club,
      pageSize,
      customerCustomerListFetchCustomers,
      customerCustomerListChangeQuery,
      getLabel
    } = this.props;

    customerCustomerListChangeQuery("");
    customerCustomerListFetchCustomers(club._id, 1, pageSize, "", token);
    getLabel(club._id, token, () => {

    });
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
  handleCloseLabelButton() {
    this.setState({
      showModalLabel: false
    })
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
    console.log('labels', this.state.labels);
    console.log('this.props.list.data', this.props.list.data)
    return (
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}>
        <Modal
          onOpen={this.state.showModalLabel}
          onClose={this.handleCloseLabelButton}
          onSubmit={this.handleSubmitLabelModalAction}
          activityType={this.state.activityType}
          title="انتخاب برچسب"
          action={true}
          disableConfirmButton={true}
          size="lg"
        >
          <Grid container spacing={16}>
            <Grid item xs={12} lg={6} md={6} spacing={16}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10
                }}
              >

                <div style={{ flex: 1, paddingRight: 20 }}>
                  <Typography variant="h6" style={{ paddingTop: 15 }}>
                    {`لیست برچسب های ${this.state.selectedCustomer.full_name}`}
                  </Typography>
                </div>
              </div>
              {this.state.labels.map(element => {
                return (
                  <div>
                    <Chip
                      label={element.label_content.title}
                      onDelete={() => {
                        const { DeleteLabelCutomer, club, token, getCustomerLabels } = this.props;

                        DeleteLabelCutomer(club._id, this.state.selectedCustomerId, element.label_content._id, token).then((response) => {
                          getCustomerLabels(club._id, this.state.selectedCustomerId, token).then((response) => {
                            this.setState({
                              labels: response.data
                            })
                          })
                        });

                      }}
                      style={{
                        margin: 5,
                        height: "auto",
                        flexWrap: "wrap",
                        backgroundColor:
                          element.label_content.color,

                        display: "flex",
                        color: element.label_content.color
                          ? "#000"
                          : "#fff",
                        justifyContent:
                          "space-between"
                      }}
                      classes={{
                        deleteIcon: "chipIcon",
                        label: "chipLabel"
                      }}
                    />
                  </div>

                )
              })}
            </Grid>
            <Grid item xs={12} lg={6} md={6} spacing={16}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10
                }}
              >

                <div style={{ flex: 1, paddingRight: 20 }}>
                  <Typography variant="h6" style={{ paddingTop: 15 }}>
                    عنوان
              </Typography>
                </div>

                <div>
                  <Typography variant="h6" style={{ paddingTop: 15 }}>
                    انتخاب
              </Typography>
                </div>
              </div>
              {this.props.list.data.length > 0 &&
                this.props.list.data.map((item, index) => {

                  return (
                    <div
                      id={item._id}
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}
                    >

                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                          margin: 5
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "flex-start"
                        }}
                      >
                        <Typography style={{ paddingTop: 10 }}>
                          {item.title}
                        </Typography>
                      </div>

                      <div>
                        <IconButton
                          component="span"
                          onClick={() => {
                            const { AddLabelCustomer, club, token, getCustomerLabels } = this.props;
                            AddLabelCustomer(club._id, this.state.selectedCustomerId, item._id, token).then((response) => {
                              getCustomerLabels(club._id, this.state.selectedCustomerId, token).then((response) => {
                                this.setState({
                                  labels: response.data
                                })
                              })
                            })
                          }}
                        >

                          <DoneIcon
                            style={{
                              marginTop: 0,
                              color: "#000"
                            }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  )
                })}
            </Grid>
          </Grid>
        </Modal>
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
                        <Button
                          variant="fab"
                          mini
                          style={{ background: "#00a152" }}
                          onClick={() => {
                            this.setState({
                              showModalLabel: true,
                              selectedCustomerId: customer._id,
                              selectedCustomer: customer
                            })
                            const { getCustomerLabels, club, token } = this.props;
                            getCustomerLabels(club._id, customer._id, token).then((response) => {
                              this.setState({
                                labels: response.data
                              })
                            })
                          }}
                        >
                          <Description style={{ color: "white" }} />
                        </Button>
                        <img src={Wastapp} style={{ width: 40, height: 40, cursor: 'pointer' }} onClick={() => {
                          let link = `https://api.whatsapp.com/send?phone=98${customer.phone}`;
                          window.open(link, '_blank')
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
const mapStateToProps = ({ app, customerCustomerList, label }) => {
  return { ...app, ...customerCustomerList, ...label };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      customerCustomerListFetchCustomers,
      customerCustomerListChangeQuery,
      customerCustomerEditSetCustomer,
      getLabel,
      AddLabelCustomer,
      getCustomerLabels,
      DeleteLabelCutomer
    }
  )
)(CustomerList);

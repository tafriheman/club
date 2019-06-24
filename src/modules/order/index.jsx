import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import PropTypes from 'prop-types';
import {
  getOrder,
  orderDelete,
  orderAdd,
  orderEdit
} from "../../redux/actions/order/orderAction";
import { customerCustomerListFetchCustomers } from "../../redux/actions/customer/CustomerListActions";
import { productProductListFetchProdcuts } from "../../redux/actions/product/ProductListActions";
import {
  getParentCheckList,
  checkListEdit
} from "../../redux/actions/checkList/checkListAction";
import { getOrderStatus } from "../../redux/actions/orderStatus/orderStatusAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import moment from "jalali-moment";
import RemoveIcon from "@material-ui/icons/Remove";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DoneIcon from "@material-ui/icons/Done";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { getLabel } from "../../redux/actions/label/labelAction";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import Select from "../../components/orderStatuseDropDown";
import {
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import SnackBar from "../../components/SnackBar";
import AutoComplete from "../../components/autoComplete";
import Modal from "../../components/modal";
import "../../assets/css/global/index.css";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: [],
      customers: [],
      orderProducts: [],
      selectedLabels: [],
      selectedCheckList: [],
      orderStatus: [],
      productActivityType: "add",
      selecteIdtem: {},
      selectedCustomer: {},
      selectedProduct: {},
      selectedOrderStatus: "",
      labels: [],
      checkLists: [],
      productLabel: [],
      preCheckLists: [],
      name: "",
      count: 1,
      changeCount: false,
      activityType: "add",
      totalProductPrice: 0,
      totalOrderCount: 0,
      totalOrderPrice: 0,
      customer: "",
      addCheckListProduct: "",
      customerName: "",
      orderSelectedItem: {},
      ExpandDetailPanel: false,
      showDialog: false,
      showModal: false,
      showSnackBar: false,
      showModalLabel: false,
      showModalCheckList: false,
      showParentCheckList: true,
      typeSnackBar: "",
      messageSnackBar: "",
      current:1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  georgianToPersianDate = date => {
    let persianDate = moment(date)
      .locale("fa")
      .format("YYYY/M/D");
    return persianDate;
  };
  hexToDec = hex => {
    var result = 0,
      digitValue;
    hex = hex.toLowerCase();
    for (var i = 0; i < hex.length; i++) {
      digitValue = "0123456789abcdefgh".indexOf(hex[i]);
      result = result * 16 + digitValue;
    }
    result = result + 1;
    if (result > -3000000) {
      return true;
    }
    return false;
  };
  // handlechangeCheckbox = (event, item) => {
  //   let newOrder = {
  //     title: item.title,
  //     isChecked: event.target.checked
  //   };
  //   let index = this.state.orders.indexOf(item);
  //   let newOrderArray = [...this.state.orders]; // create the copy of state array
  //   newOrderArray[index] = newOrder; //new value
  //   this.setState({ orders: newOrderArray });
  // };
  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };
  handleSubmitDialog = () => {
    if (this.state.activityType === "add") {
      this.setState({ showModal: false });
    } else if (this.state.activityType === "delete") {
      this.setState({ showModal: false });
    }
  };
  showSnackBar = (type, message) => {
    this.setState({
      showSnackBar: true,
      typeSnackBar: type,
      messageSnackBar: message
    });
  };
  handleSnackBarClose = () => {
    this.setState({ showSnackBar: false });
  };
  getLabelPerProduct = productId => {
    let labelArray = [];
    this.state.labels.map(item => {
      if (item.product === productId)
        labelArray.push({ labelId: item.data[0].labelId });
    });
    return labelArray;
  };
  getCheckListPerProduct = productId => {
    let checkListArray = [];
    this.state.checkLists.map(item => {
      if (item.product === productId)
        checkListArray.push({ checkListId: item.data._id });
    });
    return checkListArray;
  };
  addPropToProductOrder = () => {
    this.state.orderProducts.map(
      item => (
        (item.product = item.productContent._id),
        (item.label = this.getLabelPerProduct(item.productContent._id)),
        (item.checkList = this.getCheckListPerProduct(item.productContent._id))
      )
    );
  };
  handleSubmitClick = () => {
    const { club, token,pageSize } = this.props;
    this.addPropToProductOrder();

    let body = {
      title: this.state.name,
      customer: this.state.selectedCustomer._id
        ? this.state.selectedCustomer._id
        : this.state.customer,
      orderStatusList: this.state.selectedOrderStatus
        ? this.state.selectedOrderStatus
        : this.state.orderSelectedItem.orderStatusList,
      productOrders: this.state.orderProducts
    };
    if (this.state.activityType === "add") {
     
      this.props.orderAdd(body, club._id, token, () => {
        this.props.getOrder(club._id,token,this.state.current,pageSize,  () => {
          this.setState({ orders: this.props.list.data });
        });
      });
      this.setState({
        productActivityType: "add",
        productName: "",
        name: "",
        orders: [],
        labels: [],
        checkLists: [],
        ExpandDetailPanel: false
      });
    } else {
      this.props.orderEdit(
        body,
        club._id,
        token,
        this.state.orderSelectedItem._id,
        () => {
          this.props.getOrder(club._id, token, this.state.current, this.props.pageSize, () => {
            let orderSelectedItem = this.props.list.data.find((item) => item._id === this.state.orderSelectedItem._id);
            this.setState({ orders: this.props.list.data, orderSelectedItem: orderSelectedItem });
          });
        }
      );
    }
    this.setState(
      {
        productActivityType: "add",
        productName: ""
      },
      () => {
        this.showSnackBar("success", "اطلاعات با موفقیت ثبت شد");
      }
    );
  };
  handleKeyPress = event => {
    if (event.charCode === 13) {
      if (this.state.productActivityType === "add") {
        let newOrder = {
          title: event.target.value,
          isChecked: false
        };
        this.setState({
          orders: [...this.state.orders, newOrder],
          productName: ""
        });
      } else {
        let newOrder = {
          title: event.target.value
        };
        let index = this.state.orders.indexOf(this.state.selectedItem);
        let newOrderArray = [...this.state.orders]; // create the copy of state array
        newOrderArray[index] = newOrder; //new value
        this.setState({ orders: newOrderArray });
      }
    }
  };
  handleAutoCompleteSelect = value => {
    this.setState({ selectedCustomer: value });
  };
  handleCloseButton = () => {
    this.setState({
      //     showModalLabel: false,
      showModal: false,
      showModalCheckList: false
    });
  };
  handleCloseLabelButton = () => {
    let newLabelArray = [this.state.labels, ...this.state.selectedLabels];
    this.setState({
      labels: newLabelArray,
      showModalLabel: false
    });
    this.setState({
      showModalLabel: false
    });
  };

  handleChangeCount = (name, item, type) => {
    this.setState(
      {
        count:
          type === "plus"
            ? this.state.count + 1
            : this.state.count < 1
            ? 1
            : this.state.count - 1
      },
      () => {
        let newProduct = { ...item };
        newProduct.count = this.state.count;
        newProduct.totalProductPrice =
          item.productContent.price * this.state.count;
        this.state.orderProducts.splice(
          this.state.orderProducts.indexOf(item),
          1,
          newProduct
        );

        this.setState(
          {
            orderProducts: [...this.state.orderProducts]
          },
          () => {
            let countSum = this.state.orderProducts.reduce((total, p) => {
              return Number(p.count) + total;
            }, 0);

            let priceSum = this.state.orderProducts.reduce((total, p) => {
              return p.totalProductPrice
                ? Number(p.totalProductPrice) + total
                : p.count * p.productContent.price + total;
            }, 0);

            this.setState({
              totalOrderCount: countSum,
              totalOrderPrice: priceSum
            });
          }
        );
      }
    );
  };
  handleSubmitLabelModalAction = () => {
    // let newLabelArray = [this.state.labels, ...this.state.selectedLabels];
    // this.setState({
    //   labels: newLabelArray,
    //   showModalLabel: false
    // });
  };
  handleSubmitCheckListAction = () => {
    let newCheckListArray = [
      ...this.state.checkLists,
      {
        product: this.state.addCheckListProduct,
        data: this.state.selectedCheckList
      }
    ];
    this.setState({
      checkLists: newCheckListArray,
      showModalCheckList: false
    });

    this.props.checkListEdit(
      {
        title: this.state.selectedCheckList.title,
        checkLists: this.state.preCheckLists
      },
      this.props.club._id,
      this.props.token,
      this.state.selectedCheckList._id
    );
  };
  handlechangeCheckbox = (event, item) => {
    let newCheckList = this.state.preCheckLists.find(obj => {
      return obj._id === item._id;
    });

    newCheckList.title = item.title;
    newCheckList.isChecked = event.target.checked;

    let index = this.state.preCheckLists.indexOf(item);
    let newCheckListArray = [...this.state.preCheckLists]; // create the copy of state array
    newCheckListArray[index] = newCheckList; //new value
    this.setState({ preCheckLists: newCheckListArray });
  };
  changeCheckList = () => {
    this.setState({ showParentCheckList: true });
  };
  handleChangeOrederStatusSelect = value => {
    this.setState({ selectedOrderStatus: value._id });
  };
  getorderStatusTitle = id => {
    let orderStatusEdit = this.state.orderStatus.find(item => item._id === id)
  
    return orderStatusEdit ? orderStatusEdit.title : '';
  };
  componentWillMount() {
    const {
      token,
      club,
      getOrder,
      customerCustomerListFetchCustomers,
      productProductListFetchProdcuts,
      getLabel,
      getParentCheckList,
      getOrderStatus,
      pageSize
    } = this.props;
    getOrder(club._id, token,1,pageSize, () => {
      this.setState({ orders: this.props.list.data });
    });
    customerCustomerListFetchCustomers(club._id, 1, 1000, "", token, () => {
      this.setState({ customers: this.props.customers });
    });
    productProductListFetchProdcuts(club._id, 1, 1000, () => {
      this.setState({ products: this.props.products });
    });
    getLabel(club._id, token);
    getParentCheckList(club._id, token);
    getOrderStatus(token, () => {
      this.setState({ orderStatus: this.props.orderStatus.list.data });
    });
  }

  handlePageClick(data) {
    const {
      token,
      club,
      pageSize,
      getOrder,
    } = this.props;
    getOrder(club._id, token, data.selected + 1, pageSize, () => {
      this.setState({ orders: this.props.list.data, current: data.selected + 1 });
    });
  }
  renderPagination() {
    const { orderTotal, pageSize } = this.props;
    if (orderTotal !== 0 && orderTotal > pageSize)
      return (
        <ReactPaginate
          previousLabel={"قبلی"}
          nextLabel={"بعدی"}
          breakLabel={<a className="page-link">...</a>}
          pageCount={Math.ceil(orderTotal / pageSize)}
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
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
      <div className="sectin__container" style={{ display: "flex" }}>
        <div
          style={{
            maxHeight: 800,
            overflowY: "auto",
            width: "50%"
          }}
          className="sectin__divContainer"
        >
          <ExpansionPanel expanded>
            <ExpansionPanelSummary>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Typography variant="h6">لیست سفارشات</Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({
                      activityType: "add",
                      ExpandDetailPanel: true,
                      name: "",
                      orderProducts: [],
                      labels: [],
                      checkLists: [],
                      customer: "",
                      customerName: "",
                      totalOrderCount: 0,
                      totalOrderPrice: 0
                    });
                  }}
                >
                  افزودن
                  <AddIcon />
                </Button>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <div style={{ flex: 3, textAlign: "center" }}>
                      <Typography style={{ margin: 15 }}>مشتری</Typography>
                    </div>
                    <div style={{ flex: 2, textAlign: "center" }}>
                      <Typography style={{ margin: 15 }}>مبلغ سفارش</Typography>
                    </div>
                    <div style={{ flex: 2, textAlign: "center" }}>
                      <Typography style={{ margin: 15 }}>تاریخ</Typography>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <Typography style={{ margin: 15 }}>عملیات</Typography>
                    </div>
                  </div>
                </div>
                <Divider />
                {this.props.loading ? (
                  <LinearProgress style={{ margin: "10px AUTO" }} />
                ) : (
                  this.state.orders.map(item => (
                    <div>
                      <div
                        id={item._id}
                        key={item._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 10
                        }}
                      >
                        <div style={{ flex: 3, textAlign: "center" }}>
                          <Typography style={{ margin: 15 }}>
                            {item.customerName}
                          </Typography>
                        </div>
                        <div style={{ flex: 2, textAlign: "center" }}>
                          <Typography style={{ margin: 15 }}>
                            {item.orderPrice === 0 ? 'رایگان' : numberWithCommas(item.orderPrice)}
                          </Typography>
                        </div>
                        <div style={{ flex: 2, textAlign: "center" }}>
                          <Typography style={{ margin: 15 }}>
                            {this.georgianToPersianDate(item.created_at_time)}
                          </Typography>
                        </div>
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <IconButton
                            component="span"
                            onClick={() => {
                              let totalCount = item.productOrders.reduce(
                                (total, p) => {
                                  return Number(p.count) + total;
                                },
                                0
                              );

                              this.setState(
                                {
                                  ExpandDetailPanel: true,
                                  activityType: "edit",
                                  orderSelectedItem: item,
                                  customer: item.customer,
                                  customerName: item.customerName,
                                  name: item.title,
                                  orderProducts: item.productOrders,
                                  totalOrderCount: totalCount,
                                  totalOrderPrice: item.orderPrice
                                },
                                () => {
                                  let labelArray = [];
                                  let checkListArray = [];
                                  this.state.orderProducts.map(item => {
                                    item.label.map(x => {
                                      labelArray.push({
                                        data: [x],
                                        product: item.product
                                      });
                                    });
                                    item.checkList.map(x => {
                                      checkListArray.push({
                                        data: x.content,
                                        product: item.product
                                      });
                                    });
                                  });

                                  this.setState({
                                    labels: labelArray,
                                    checkLists: checkListArray
                                  });
                                }
                              );
                            }}
                          >
                            <RemoveRedEyeIcon
                              style={{
                                marginTop: 0,
                                color: "#000"
                              }}
                            />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {this.renderPagination()}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        {this.state.ExpandDetailPanel && (
          <div
            style={{
              maxHeight: 800,
              overflowY: "auto",
              width: "50%"
            }}
            className="sectin__divContainer"
          >
            <ExpansionPanel expanded={this.state.ExpandDetailPanel}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  {this.state.activityType === "add"
                    ? "افزودن سفارش"
                    : "ویرایش سفارش"}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ width: "100%", position: "relative" }}>
                  <div style={{ marginTop: 25 }}>
                    <AutoComplete
                      data={this.state.customers}
                      target="full_name"
                      defaultValue={this.state.customerName}
                      handleSelect={this.handleAutoCompleteSelect}
                    />
                    <Select
                      label="وضعیت سفارش"
                      //  values={this.state.orderSelectedItem.orderStatusList}
                      values={
                        this.state.activityType === "edit"
                          ? this.getorderStatusTitle(
                              this.state.orderSelectedItem.orderStatusList
                            )
                          : ""
                      }
                      value={this.getorderStatusTitle(
                        this.state.orderSelectedItem.orderStatusList
                      ) + "&" + this.state.orderSelectedItem.orderStatusList}
                      data={this.state.orderStatus}
                      onChangeValue={value =>
                        this.handleChangeOrederStatusSelect(value)
                      }
                    />
                  </div>
                  <Card style={{ marginTop: 10 }}>
                    <CardContent>
                      {this.props.loading ? (
                        <LinearProgress style={{ margin: "100px AUTO" }} />
                      ) : (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              alignItems: "baseline"
                            }}
                          >
                            {this.state.orderProducts.map((item, index) => {
                              return (
                                <Card
                                  key={index}
                                  className="sectin__Card"
                                  style={{ margin: 5, width: "48%" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column"
                                    }}
                                  >
                                    <div style={{ display: "flex" }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center"
                                        }}
                                      >
                                        <IconButton
                                          onClick={() =>
                                            this.handleChangeCount(
                                              "count",
                                              item,
                                              "plus"
                                            )
                                          }
                                        >
                                          <AddIcon style={{ fontSize: 16 }} />
                                        </IconButton>
                                        <Typography>
                                          {item.count
                                            ? item.count
                                            : this.state.count}
                                        </Typography>
                                        <IconButton
                                          onClick={() =>
                                            this.handleChangeCount(
                                              "count",
                                              item,
                                              "mines"
                                            )
                                          }
                                        >
                                          <RemoveIcon
                                            style={{ fontSize: 16 }}
                                          />
                                        </IconButton>
                                      </div>
                                      <div
                                        style={{
                                          flex: 2
                                        }}
                                      >
                                        <img
                                          style={{
                                            width: "100%",
                                            height: "90%"
                                          }}
                                          src={require("../../assets/images/product/no-image.png")}
                                        />
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          flex: 2,
                                          justifyContent: "flex-start",
                                          marginRight: 10
                                        }}
                                      >
                                        <Typography>
                                          {item.productContent.name}
                                        </Typography>
                                        <Typography>
                                          {item.productContent.price}
                                        </Typography>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "flex-start"
                                        }}
                                      >
                                        <IconButton
                                          onClick={() => {
                                            let newList = this.state.orderProducts.filter(
                                              x =>
                                                x.productContent._id !==
                                                item.productContent._id
                                            );

                                            this.setState(
                                              { orderProducts: newList },
                                              () => {
                                                let countSum = this.state.orderProducts.reduce(
                                                  (total, p) => {
                                                    return (
                                                      Number(p.count) + total
                                                    );
                                                  },
                                                  0
                                                );

                                                let priceSum = this.state.orderProducts.reduce(
                                                  (total, p) => {
                                                    return p.totalProductPrice
                                                      ? Number(
                                                          p.totalProductPrice
                                                        ) + total
                                                      : p.count *
                                                          p.productContent
                                                            .price +
                                                          total;
                                                  },
                                                  0
                                                );

                                                this.setState({
                                                  totalOrderCount: countSum,
                                                  totalOrderPrice: priceSum
                                                });
                                              }
                                            );
                                          }}
                                        >
                                          <CloseIcon style={{ fontSize: 16 }} />
                                        </IconButton>
                                      </div>
                                    </div>
                                    <div>
                                      <Typography
                                        style={{
                                          float: "left",
                                          paddingLeft: 20
                                        }}
                                      >
                                        {isNaN(item.totalProductPrice)
                                          ? item.productContent.price
                                          : item.productContent.price *
                                            item.count}
                                      </Typography>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                      }}
                                    >
                                      <Button
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        style={{ marginRight: 5 }}
                                        onClick={() => {
                                          if (
                                            this.state.checkLists.length > 0
                                          ) {
                                            let hasChekList = this.state.checkLists.some(
                                              element => {
                                                return (
                                                  element.product ===
                                                  item.productContent._id
                                                );
                                              }
                                            );

                                            if (hasChekList) {
                                              this.state.checkLists.map(
                                                element => {
                                                  if (
                                                    element.product ===
                                                    item.productContent._id
                                                  ) {
                                                    this.setState({
                                                      showModalCheckList: true,
                                                      addCheckListProduct:
                                                        item.productContent._id,
                                                      showParentCheckList: false,
                                                      selectedCheckList: {
                                                        checkLists:
                                                          element.data
                                                            .checkLists
                                                      }
                                                    });
                                                  }
                                                }
                                              );
                                            } else {
                                              this.setState({
                                                showModalCheckList: true,
                                                addCheckListProduct:
                                                  item.productContent._id,
                                                showParentCheckList: true
                                              });
                                            }
                                          } else {
                                            this.setState({
                                              showModalCheckList: true,
                                              addCheckListProduct:
                                                item.productContent._id,
                                              showParentCheckList: true
                                            });
                                          }
                                        }}
                                      >
                                        چک لیست ها
                                        <PlaylistAddCheckIcon
                                          style={{ fontSize: 16 }}
                                        />
                                      </Button>

                                      <Button
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        style={{ marginLeft: 5 }}
                                      >
                                        وضعیت
                                        <EditIcon style={{ fontSize: 16 }} />
                                      </Button>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column"
                                      }}
                                    >
                                      <IconButton
                                        style={{ width: 40 }}
                                        onClick={() => {
                                          this.setState({
                                            showModalLabel: true,
                                            addLabelProduct: item.product
                                              ? item.product
                                              : item.productContent._id
                                          });
                                        }}
                                      >
                                        <AddIcon style={{ fontSize: 16 }} />
                                      </IconButton>
                                      {this.state.labels.map(element => {
                                        let productItem = item.product
                                          ? item.product
                                          : item.productContent._id;
                                        if (productItem === element.product) {
                                          return element.data.map(x => {
                                            return (
                                              <div>
                                                <Chip
                                                  label={x.content.title}
                                                  onDelete={() => {
                                                    let newArray = [];

                                                    newArray = this.state.labels.filter(
                                                      ss => {
                                                        return ss !== element;
                                                      }
                                                    );

                                                    this.setState({
                                                      labels: newArray
                                                    });
                                                  }}
                                                  style={{
                                                    margin: 5,
                                                    height: "auto",
                                                    flexWrap: "wrap",
                                                    backgroundColor:
                                                      x.content.color,

                                                    display: "flex",
                                                    color: this.hexToDec(
                                                      x.content.color
                                                    )
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
                                            );
                                          });
                                        }
                                      })}
                                    </div>
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <Divider />
                    <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <Typography
                            variant="Subheading"
                            style={{ paddingTop: 15 }}
                          >
                            تعداد
                          </Typography>
                        </div>
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <Typography
                            variant="Subheading"
                            style={{ paddingTop: 15 }}
                          >
                            {this.state.totalOrderCount}
                          </Typography>
                        </div>
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <Typography
                            variant="Subheading"
                            style={{ paddingTop: 15 }}
                          >
                            مجموع
                          </Typography>
                        </div>
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <Typography
                            variant="Subheading"
                            style={{ paddingTop: 15 }}
                          >
                            {this.state.totalOrderPrice}
                          </Typography>
                        </div>
                        <div>
                          <IconButton>
                            <MonetizationOnIcon
                              style={{
                                marginTop: 0,
                                color: "#000"
                              }}
                            />
                          </IconButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div style={{ marginTop: 10, display: "flex" }}>
                    <div style={{ width: "30%" }}>
                      <Button
                        color="primary"
                        onClick={() => {
                          this.setState({ showModal: true, count: 1 });
                        }}
                      >
                        <AddCircleIcon
                          style={{
                            marginLeft: 10,
                            count: 0
                          }}
                        />
                        افزودن به کالا ها
                      </Button>
                    </div>
                    <div style={{ width: "70%" }} />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ float: "left", margin: "20px 0" }}
                      onClick={this.handleSubmitClick}
                    >
                      ثبت
                      <SaveIcon />
                    </Button>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )}
        <Modal
          onOpen={this.state.showModalLabel}
          onClose={this.handleCloseLabelButton}
          onSubmit={this.handleSubmitLabelModalAction}
          activityType={this.state.activityType}
          title="انتخاب برچسب"
          action={true}
          disableConfirmButton={true}
          size="xs"
        >
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
          {this.props.label.list.data.length > 0 &&
            this.props.label.list.data.map((item, index) => (
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
                      item.content = item;
                      item.labelId = item._id;
                      let hasLabel = [];
                      this.state.labels.map(element => {
                        if (element.product === this.state.addLabelProduct) {
                          element.data.map(x => {
                            if (x.labelId === item.labelId) {
                              hasLabel.push(x.labelId);
                            }
                          });
                        }
                      });
                      if (hasLabel.length > 0) {
                        this.showSnackBar(
                          "warning",
                          "قبلا این برچسب را وارد کرده اید"
                        );
                        return;
                      }

                      this.setState({
                        selectedLabels: [
                          ...this.state.selectedLabels,
                          {
                            product: this.state.addLabelProduct,
                            data: [item]
                          }
                        ]
                      });
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
            ))}
        </Modal>

        <Modal
          onOpen={this.state.showModal}
          onClose={this.handleCloseButton}
          onSubmit={this.handleSubmitAction}
          activityType={this.state.activityType}
          title="انتخاب کالا"
          size="sm"
          action={false}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography variant="h6" style={{ paddingTop: 15 }}>
                نام کالا
              </Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="h6" style={{ paddingTop: 15 }}>
                قیمت
              </Typography>
            </div>
            <div>
              <Typography variant="h6" style={{ paddingTop: 15 }}>
                انتخاب
              </Typography>
            </div>
          </div>
          {this.state.products.map((item, index) => (
            <div
              id={item._id}
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10
              }}
            >
              <div style={{ flex: 1 }}>
                <Typography style={{ paddingTop: 15 }}>{item.name}</Typography>
              </div>
              <div style={{ flex: 1 }}>
                <Typography style={{ paddingTop: 15 }}>{item.price}</Typography>
              </div>
              <div>
                <IconButton
                  component="span"
                  onClick={() => {
                    var hasProduct = this.state.orderProducts.some(element => {
                      return element.productContent._id === item._id;
                    });
                    if (hasProduct) {
                      this.showSnackBar(
                        "warning",
                        "قبلا این کالا را وارد کرده اید"
                      );
                      return;
                    }

                    this.setState(
                      {
                        selectedProduct: item,
                        orderProducts: [
                          ...this.state.orderProducts,
                          {
                            productContent: item,
                            count: 1,
                            totalPrice: item.price
                          }
                        ],
                        showModal: false
                      },
                      () => {
                        let countSum = this.state.orderProducts.reduce(
                          (total, p) => {
                            return Number(p.count ? p.count : 1) + total;
                          },
                          0
                        );

                        let priceSum = this.state.orderProducts.reduce(
                          (total, p) => {
                            return p.totalProductPrice
                              ? Number(p.totalProductPrice) + total
                              : Number(p.count ? p.count : 1) *
                                  p.productContent.price +
                                  total;
                          },
                          0
                        );

                        this.setState({
                          totalOrderCount: countSum,
                          totalOrderPrice: priceSum
                        });
                      }
                    );
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
          ))}
        </Modal>
        <Modal
          onOpen={this.state.showModalCheckList}
          onClose={this.handleCloseButton}
          onSubmit={this.handleSubmitCheckListAction}
          activityType={this.state.activityType}
          title="انتخاب چک لیست"
          size="xs"
          action={true}
          changeCheckList={this.changeCheckList}
        >
          <div>
            {this.state.showParentCheckList ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10
                  }}
                >
                  <div style={{ flex: 1 }}>
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
                {this.props.checkList.parentList.data.length > 0 &&
                  this.props.checkList.parentList.data.map((item, index) => (
                    <div
                      id={item._id}
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Typography style={{ paddingTop: 15 }}>
                          {item.title}
                        </Typography>
                      </div>

                      <div>
                        <IconButton
                          component="span"
                          onClick={() => {
                            this.setState(
                              {
                                showParentCheckList: false,
                                selectedCheckList: item
                              },
                              () => {
                                let PreChecklist = [];
                                this.state.selectedCheckList.checkLists.map(
                                  element => {
                                    PreChecklist.push(element);
                                  }
                                );

                                this.setState(state => {
                                  state.preCheckLists = PreChecklist;
                                });
                              }
                            );
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
                  ))}
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10
                  }}
                />
                {/* {this.state.selectedCheckList.map((item, index) => ( */}
                {this.state.selectedCheckList.checkLists.map((item, index) => (
                  <div
                    id={item._id}
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={item.isChecked}
                            onChange={e => this.handlechangeCheckbox(e, item)}
                            value={item._id}
                          />
                        }
                        label={item.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>

        <Dialog open={this.state.showDialog} onClose={this.handleCloseDialog}>
          <DialogTitle id="draggable-dialog-title">حذف سفارش</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ایا مایل به حذف این سفارش هستید؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              خیر
            </Button>
            <Button onClick={this.handleSubmitDialog} color="primary">
              بلی
            </Button>
          </DialogActions>
        </Dialog>
        <SnackBar
          show={this.state.showSnackBar}
          type={this.state.typeSnackBar}
          message={this.state.messageSnackBar}
          onClose={this.handleSnackBarClose}
        />
      </div>
    );
  }
}
Order.contextTypes = {
  router: PropTypes.object
};
const mapStateToProps = ({
  app,
  order,
  customerCustomerList,
  productProductList,
  label,
  checkList,
  orderStatus
}) => {
console.log('order',order)
  return {
    ...app,
    ...order,
    ...customerCustomerList,
    ...productProductList,
    label,
    checkList,
    orderStatus,
    orderTotal:order.orderTotal,
    pageSize: order.pageSize
  };
};

export default connect(
  mapStateToProps,
  {
    orderAdd,
    getOrder,
    orderDelete,
    orderEdit,
    customerCustomerListFetchCustomers,
    productProductListFetchProdcuts,
    getLabel,
    getParentCheckList,
    checkListEdit,
    getOrderStatus
  }
)(Order);

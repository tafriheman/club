import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getOrder,
  orderDelete,
  orderAdd,
  orderEdit
} from "../../redux/actions/order/orderAction";
import { customerCustomerListFetchCustomers } from "../../redux/actions/customer/CustomerListActions";
import { productProductListFetchProdcuts } from "../../redux/actions/product/ProductListActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  TextField,
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
  Divider
} from "@material-ui/core";
import SnackBar from "../../components/SnackBar";
import Style from "./style";
import AutoComplete from "../../components/autoComplete";
import Modal from "../../components/modal";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: [],
      customers: [],
      orderProducts: [],
      productActivityType: "add",
      selecteIdtem: {},
      selectedCustomer: {},
      activityType: "add",
      orderSelectedItem: {},
      ExpandDetailPanel: false,
      showDialog: false,
      showModal: false,
      showSnackBar: false,
      typeSnackBar: "",
      messageSnackBar: ""
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handlechangeCheckbox = (event, item) => {
    let newOrder = {
      title: item.title,
      isChecked: event.target.checked
    };
    let index = this.state.orders.indexOf(item);
    let newOrderArray = [...this.state.orders]; // create the copy of state array
    newOrderArray[index] = newOrder; //new value
    this.setState({ orders: newOrderArray });
  };
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
  // handleSubmitDialog = () => {
  //   const { club, token } = this.props;
  //   this.props.orderDelete(
  //     this.state.orderSelectedItem._id,
  //     this.props.club._id,
  //     this.props.token,
  //     () => {
  //       this.props.getParentOrder(club._id, token, () => {
  //         this.setState({
  //           orderList: this.props.list.data,
  //           ExpandDetailPanel: false
  //         });
  //       });
  //     }
  //   );

  //   this.setState({ showDialog: false });
  // };
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
  handleSubmitClick = () => {
    const { club, token } = this.props;
    let title = this.state.name;
    if (this.state.activityType === "add") {
      this.props.orderAdd(
        { title: title, orders: this.state.orders },
        club._id,
        token,
        () => {
          this.props.getParentOrder(club._id, token, () => {
            this.setState({ orderList: this.props.list.data });
          });
        }
      );
      this.setState({
        productActivityType: "add",
        productName: "",
        name: "",
        orders: [],
        ExpandDetailPanel: false
      });
    } else {
      this.props.orderEdit(
        { title: title, orders: this.state.orders },
        club._id,
        token,
        this.state.orderSelectedItem._id,
        () => {
          this.props.getParentOrder(club._id, token, () => {
            this.setState({ orderList: this.props.list.data });
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
    if (event.charCode == 13) {
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
    this.setState({ showModal: false });
  };
  componentWillMount() {
    const {
      token,
      club,
      getOrder,
      customerCustomerListFetchCustomers,
      productProductListFetchProdcuts
    } = this.props;
    getOrder(club._id, token, () => {
      this.setState({ orders: this.props.list.data });
    });
    customerCustomerListFetchCustomers(club._id, 1, 1000, "", token, () => {
      this.setState({ customers: this.props.customers });
    });
    productProductListFetchProdcuts(club._id, token, 1, 1000, () => {
      this.setState({ products: this.props.products });
    });
  }

  render() {
    return (
      <div className="Sectin__container" style={{ display: "flex" }}>
        <div
          style={{
            maxHeight: 800,
            overflowY: "auto",
            width: "33%"
          }}
          className="sectin__divContainer"
        >
          <ExpansionPanel expanded>
            <ExpansionPanelSummary>
              <Typography variant="h6">لیست سفارشات</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                {this.props.loading ? (
                  <LinearProgress style={{ margin: "10px AUTO" }} />
                ) : (
                  // this.state.orders.length > 0 &&
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
                        <div>
                          <Typography style={{ margin: 15 }}>
                            {item.title}
                          </Typography>
                        </div>
                        <div>
                          <IconButton
                            component="span"
                            onClick={() => {
                              this.setState(
                                {
                                  ExpandDetailPanel: true,
                                  activityType: "edit",
                                  orderSelectedItem: item
                                },
                                () => {
                                  this.setState({
                                    orders: this.state.orderSelectedItem.orders,
                                    name: this.state.orderSelectedItem.title
                                  });
                                }
                              );
                            }}
                          >
                            <EditIcon
                              style={{
                                marginTop: 0,
                                color: "#000"
                              }}
                            />
                          </IconButton>
                          <IconButton
                            component="span"
                            onClick={() => {
                              this.setState({
                                showDialog: true,
                                orderSelectedItem: item
                              });
                            }}
                          >
                            <DeleteIcon
                              style={{
                                marginTop: 0,
                                color: "#000"
                              }}
                            />
                          </IconButton>
                        </div>
                      </div>
                      {/* <Divider /> */}
                    </div>
                  ))
                )}
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "left", margin: "20px 0" }}
                    onClick={() => {
                      this.setState({
                        ExpandDetailPanel: true,
                        orders: [],
                        name: ""
                      });
                    }}
                  >
                    افزودن
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div
          style={{
            maxHeight: 800,
            overflowY: "auto",
            width: "67%"
          }}
          className="orderSectin__divContainer"
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
              <div style={{ width: "100%" }}>
                <div>
                  <TextField
                    label="عنوان"
                    onChange={this.handleChange("name")}
                    value={this.state.name}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      style: {
                        left: "auto",
                        right: "0"
                      }
                    }}
                  />
                </div>
                <div style={{ marginTop: 25 }}>
                  <AutoComplete
                    data={this.state.customers}
                    target="full_name"
                    // defaultValue="ali"
                    handleSelect={this.handleAutoCompleteSelect}
                  />
                </div>
                {this.props.loading ? (
                  <LinearProgress style={{ margin: "100px AUTO" }} />
                ) : (
                  this.state.orderProducts.map((item, index) => (
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
                        <Typography>{item.product}</Typography>
                      </div>
                      <div>
                        <Typography>{item.count}</Typography>
                      </div>
                      <div>
                        <IconButton
                          component="span"
                          onClick={() => {
                            this.setState({
                              productName: item.product,
                              productActivityType: "edit",
                              selectedItem: item
                            });
                          }}
                        >
                          <EditIcon
                            style={{
                              marginTop: 0,
                              color: "#000"
                            }}
                          />
                        </IconButton>
                        <IconButton
                          component="span"
                          onClick={() => {
                            var newList = this.state.orderProducts.filter(
                              x => x._id !== item._id
                            );
                            this.setState({ orderProducts: newList });
                          }}
                        >
                          <DeleteIcon
                            style={{
                              marginTop: 0,
                              color: "#000"
                            }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  ))
                )}

                <div style={{ marginTop: 10, display: "flex" }}>
                  <div style={{ width: "30%" }}>
                    <Button
                      color="primary"
                      onClick={() => {
                        this.setState({ showModal: true });
                      }}
                    >
                      <AddCircleIcon
                        style={{
                          marginLeft: 10
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
                <Modal
                  onOpen={this.state.showModal}
                  onClose={this.handleCloseButton}
                  onSubmit={this.handleSubmitAction}
                  activityType={this.state.activityType}
                  title="انتخاب کالا"
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
                        <Typography style={{ paddingTop: 15 }}>
                          {item.name}
                        </Typography>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography style={{ paddingTop: 15 }}>
                          {item.price}
                        </Typography>
                      </div>
                      <div>
                        <IconButton
                          component="span"
                          onClick={() => {
                            this.setState({
                              productName: item.product,
                              productActivityType: "edit",
                              selectedItem: item
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
                <Dialog
                  open={this.state.showDialog}
                  onClose={this.handleCloseDialog}
                >
                  <DialogTitle id="draggable-dialog-title">
                    حذف سفارش
                  </DialogTitle>
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  app,
  order,
  customerCustomerList,
  productProductList
}) => {
  return { ...app, ...order, ...customerCustomerList, ...productProductList };
};

export default connect(
  mapStateToProps,
  {
    orderAdd,
    getOrder,
    orderDelete,
    orderEdit,
    customerCustomerListFetchCustomers,
    productProductListFetchProdcuts
  }
)(Order);

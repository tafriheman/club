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
import CloseIcon from "@material-ui/icons/Close";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

import RemoveIcon from "@material-ui/icons/Remove";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DoneIcon from "@material-ui/icons/Done";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
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
  Divider,
  Card,
  CardContent,
  Chip
} from "@material-ui/core";
import SnackBar from "../../components/SnackBar";
import Style from "./style";
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
      productActivityType: "add",
      selecteIdtem: {},
      selectedCustomer: {},
      selectedProduct: {},
      name: "",
      count: 1,
      changeCount: false,
      activityType: "add",
      totalProductPrice: 0,
      totalOrderCount: 0,
      totalOrderPrice: 0,
      customer: "",

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
  addPropToProductOrder = () => {
    this.state.orderProducts.map(
      item => (
        (item.product = item.productContent._id),
        (item.label = [{ labelId: "5c51a217189203050cc7f435" }]),
        (item.checkList = [{ checkListId: "5c55a345b4812f1994500d2b" }])
      )
    );
  };
  handleSubmitClick = () => {
    const { club, token } = this.props;
    this.addPropToProductOrder();

    let body = {
      title: this.state.name,
      customer: this.state.selectedCustomer._id
        ? this.state.selectedCustomer._id
        : this.state.customer,
      orderStatusList: "5c56facdb4812f1994500d4f",
      productOrders: this.state.orderProducts
    };

    if (this.state.activityType === "add") {
      this.props.orderAdd(body, club._id, token, () => {
        this.props.getOrder(club._id, token, () => {
          this.setState({ orders: this.props.list.data });
        });
      });
      this.setState({
        productActivityType: "add",
        productName: "",
        name: "",
        orders: [],
        ExpandDetailPanel: false
      });
    } else {
      this.props.orderEdit(
        body,
        club._id,
        token,
        this.state.orderSelectedItem._id,
        () => {
          this.props.getOrder(club._id, token, () => {
            this.setState({ orders: this.props.list.data });
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
                      ExpandDetailPanel: true,
                      name: "",
                      orderProducts: [],
                      customer: "",
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
                        <div>
                          <Typography style={{ margin: 15 }}>
                            {item.title}
                          </Typography>
                        </div>
                        <div>
                          <IconButton
                            component="span"
                            onClick={() => {
                              let totalCount = item.productOrders.reduce(
                                (total, p) => {
                                  return Number(p.count) + total;
                                },
                                0
                              );

                              this.setState({
                                ExpandDetailPanel: true,
                                activityType: "edit",
                                orderSelectedItem: item,
                                customer: item.customer,
                                name: item.title,
                                orderProducts: item.productOrders,
                                totalOrderCount: totalCount,
                                totalOrderPrice: item.orderPrice
                              });
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
                  <div>
                    <TextField
                      label={this.state.activityType === "add" ? "عنوان" : ""}
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
                      defaultValue={this.state.customer}
                      handleSelect={this.handleAutoCompleteSelect}
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
                              flexWrap: "wrap"
                            }}
                          >
                            {this.state.orderProducts.map((item, index) => (
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
                                        <RemoveIcon style={{ fontSize: 16 }} />
                                      </IconButton>
                                    </div>
                                    <div
                                      style={{
                                        flex: 2
                                      }}
                                    >
                                      <img
                                        style={{ width: "100%", height: "90%" }}
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
                                          var newList = this.state.orderProducts.filter(
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
                                      flexWrap: "wrap"
                                    }}
                                  >
                                    <Chip
                                      label="دوست داشتنی"
                                      onDelete={() => {}}
                                      style={{
                                        margin: 5,
                                        height: 25,
                                        backgroundColor: "red"
                                      }}
                                      classes={{ deleteIcon: "chipIcon" }}
                                    />
                                    <Chip
                                      label="مغرور"
                                      onDelete={() => {}}
                                      style={{ margin: 5, height: 25 }}
                                      classes={{ deleteIcon: "chipIcon" }}
                                    />
                                    <Chip
                                      label="بدون عقیده درست"
                                      onDelete={() => {}}
                                      style={{ margin: 5, height: 25 }}
                                      classes={{ deleteIcon: "chipIcon" }}
                                    />
                                  </div>
                                </div>
                              </Card>
                            ))}
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
          onOpen={this.state.showModal}
          onClose={this.handleCloseButton}
          onSubmit={this.handleSubmitAction}
          activityType={this.state.activityType}
          title="انتخاب کالا"
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
                      return element.productContent == item;
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

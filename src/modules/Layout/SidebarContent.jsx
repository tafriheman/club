import React, { Component } from "react";
import { withStyles, Divider, List, ListItem, Badge ,
  IconButton  } from "@material-ui/core";
import {  ShoppingCart, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styles from "./styles/SidebarContent";
import compose from "recompose/compose";
import { connect } from "react-redux";
import config from "../../config.json";
import {
  getOrder
} from "../../redux/actions/order/orderAction";
import {
  customerCustomerListFetchCustomers
} from "../../redux/actions";
class SideBarContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plugins: false,
      orders: false,
      customers: false,
      products: false,
      categories: false,
      campains: false
    };
  }
  componentWillMount() {
    const {
      token,
      club,
      getOrder,
      customerCustomerListFetchCustomers,
      query
    } = this.props;
    getOrder(club._id, token, 1, 12, () => {
    });
    customerCustomerListFetchCustomers(club._id, 1, 12, "", token);

  }
  renderPlugins() {
    const { classes } = this.props;
    if (this.state.plugins)
      return (
        <div>
          <ListItem>
            <List disablePadding component="ul">
              <ListItem classes={{ root: classes.listItem }}>
                <Link to="/dashboard/plugins" className={classes.link}>
                  فروشگاه افزونه ها
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/dashboard/my/plugins" className={classes.link}>
                  افزونه های من
                </Link>
              </ListItem>
            </List>
          </ListItem>
          <Divider />
        </div>
      );
  }

  renderOrders() {
    const { classes } = this.props;
    if (this.state.orders)
      return (
        <div>
          <ListItem>
            <List disablePadding component="ul">
              <ListItem classes={{ root: classes.listItem }}>
                <Link to="/dashboard/labels" className={classes.link}>
                  برچسب گذاری
                </Link>
              </ListItem>
              <ListItem classes={{ root: classes.listItem }}>
                <Link to="/dashboard/checkLists" className={classes.link}>
                  چک لیست
                </Link>
              </ListItem>
              <ListItem classes={{ root: classes.listItem }}>
                <Link to="/dashboard/order" className={classes.link}>
                  سفارشات
                </Link>
              </ListItem>
            </List>
          </ListItem>
          <Divider />
        </div>
      );
  }

  hasPermission(permission) {
    const {club} = this.props
    if (club && club.permissions.indexOf(permission) === -1) return false;
    return true;
  }

  renderCustomer() {
    let flag = true;
    let permissions = Object.values(config.customer);

    for (let i = 0; i < permissions.length; i++) {
      if (this.hasPermission(permissions[i])) {
        flag = false;
        break;
      }
    }

    // no one of customer modules bought
    if (flag) return;

    const { classes, customerCustomerList  } = this.props;
    return (
      <div>
        <ListItem
          button
          classes={{ root: classes.listItem }}
          onClick={() => this.setState({ customers: !this.state.customers })}
        >
          مشتریان<IconButton aria-label="Cart">
            <Badge badgeContent={customerCustomerList.total} color="primary"  max={100000}>
              <Person />
            </Badge>
          </IconButton>
        </ListItem>
        <Divider />
        {this.state.customers ? (
          <div>
            <ListItem>
              <List disablePadding component="ul">
                {this.hasPermission(config.customer.list) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link
                      to="/dashboard/customers/1"
                      className={classes.link}
                    >
                      لیست مشتریان
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}
                {this.hasPermission(config.customer.add) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link to="/dashboard/customer/add" className={classes.link}>
                      افزودن مشتری
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}
              </List>
            </ListItem>
            <Divider />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  renderProduct() {
    let flag = true;
    let permissions = Object.values(config.product);

    for (let i = 0; i < permissions.length; i++) {
      if (this.hasPermission(permissions[i])) {
        flag = false;
        break;
      }
    }

    // no one of product modules bought
    if (flag) return;

    const { classes } = this.props;
    return (
      <div>
        <ListItem
          button
          classes={{ root: classes.listItem }}
          onClick={() => this.setState({ products: !this.state.products })}
        >
          محصولات
        </ListItem>
        <Divider />
        {this.state.products ? (
          <div>
            <ListItem>
              <List disablePadding component="ul">
                {this.hasPermission(config.product.list) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link to="/dashboard/product/list" className={classes.link}>
                      لیست محصولات
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}
                {this.hasPermission(config.product.add) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link to="/dashboard/product/add" className={classes.link}>
                      افزودن محصول
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}

                {this.renderCategory()}
              </List>
            </ListItem>
            <Divider />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  renderCategory() {
    let flag = true;
    let permissions = Object.values(config.category);

    for (let i = 0; i < permissions.length; i++) {
      if (this.hasPermission(permissions[i])) {
        flag = false;
        break;
      }
    }

    // no one of product modules bought
    if (flag) return;

    const { classes } = this.props;
    return (
      <div>
        <ListItem
          button
          classes={{ root: classes.listItem }}
          onClick={() => this.setState({ categories: !this.state.categories })}
        >
          دسته بندی
        </ListItem>
        {/* <Divider /> */}
        {this.state.categories ? (
          <div>
            <ListItem style={{ paddingLeft: 0 }}>
              <List disablePadding component="ul">
                {this.hasPermission(config.category.add) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link to="/dashboard/category/add" className={classes.link}>
                      افزودن دسته بندی
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}
                {this.hasPermission(config.category.list) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link
                      to="/dashboard/category/list"
                      className={classes.link}
                    >
                      لیست دسته بندی
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}
              </List>
            </ListItem>
            {/* <Divider /> */}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  renderCampain() {
    let flag = true;
    let permissions = Object.values(config.campain);

    for (let i = 0; i < permissions.length; i++) {
      if (this.hasPermission(permissions[i])) {
        flag = false;
        break;
      }
    }

    // no one of product modules bought
    if (flag) return;

    const { classes } = this.props;
    return (
      <div>
        <ListItem
          button
          classes={{ root: classes.listItem }}
          onClick={() => this.setState({ campains: !this.state.campains })}
        >
          کمپین
        </ListItem>
        <Divider />
        {this.state.campains ? (
          <div>
            <ListItem>
              <List disablePadding component="ul">
                {this.hasPermission(config.campain.list) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link to="/dashboard/campain/list" className={classes.link}>
                      لیست کمپین ها
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}
                {this.hasPermission(config.campain.add) ? (
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link to="/dashboard/campain/add" className={classes.link}>
                      افزودن کمپین
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )}
              </List>
            </ListItem>
            <Divider />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <List component="ul" disablePadding>
          <Divider />
          <ListItem>
            <Link to="/dashboard/transactions" className={classes.link}>
              تراکنش ها
            </Link>
          </ListItem>

          <Divider />
          <ListItem
            button
            classes={{ root: classes.listItem }}
            onClick={() => this.setState({ plugins: !this.state.plugins })}
          >
            افزونه ها
          </ListItem>
          <Divider />

          {this.renderPlugins()}

          {this.renderCustomer()}
          {this.renderProduct()}
          {this.renderCampain()}
          {/* <ListItem>
            <Link to='/dashboard/support' className={classes.link}>پشتیبانی</Link>
          </ListItem>
          <Divider /> */}
          <ListItem
            button
            classes={{ root: classes.listItem }}
            onClick={() => this.setState({ orders: !this.state.orders })}
          >
            سفارشات  <IconButton aria-label="Cart">
              <Badge badgeContent={this.props.orderTotal} color="primary"  max={100000}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </ListItem>
          <Divider />
          {this.renderOrders()}
          <ListItem
            component="a"
           
            style={{ textAlign: "right", color: "black" }}
          >
            <Link to="/dashboard/messages" className={classes.link}>
            پیام ها
            </Link>
        
          </ListItem>
          <Divider />
          <ListItem
            component="a"
            href="https://tafriheman.net/help"
            style={{ textAlign: "right", color: "black" }}
          >
            درباره ما
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
}



const mapStateToProps = ({
  app,
  order,
  customerCustomerList
}) => {
  return {
    ...app,
    orderTotal: order.orderTotal,
    customerCustomerList
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps,
    {
      getOrder,
      customerCustomerListFetchCustomers
    })
)(SideBarContent);
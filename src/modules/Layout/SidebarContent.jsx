import React, { Component } from 'react';
import {
  withStyles,
  Divider,
  List,
  ListItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './styles/SidebarContent';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import config from '../../config.json';
import moment from 'jalali-moment';

class SideBarContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      plugins: false,
      customers: false,
      products: false
    }
  }

  renderPlugins() {
    const { classes } = this.props;
    if (this.state.plugins)
      return (
        <div>
          <ListItem>
            <List disablePadding component="ul">
              <ListItem classes={{ root: classes.listItem }}>
                <Link to='/dashboard/plugins' className={classes.link}>فروشگاه افزونه ها</Link>
              </ListItem>
              <ListItem>
                <Link to='/dashboard/my/plugins' className={classes.link}>افزونه های من</Link>
              </ListItem>
            </List>
          </ListItem>
          <Divider />
        </div>
     );
  }

  hasPermission(permission) {

    let permissions = [];
    let pluginsInfo = this.props.club.plugins;
    let date = moment().format('jYYYY/jMM/jDD');

    if(pluginsInfo.length === 0 || !pluginsInfo[0].plugin.permissions)
      return false;

    for (let i = 0; i < pluginsInfo.length; i++) {
      if(pluginsInfo[i].expire_date >= date) {
        permissions.push(...pluginsInfo[i].plugin.permissions);
      }
    }

    if (permissions.indexOf(permission) === -1)
      return false;
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
    if (flag)
      return;

    const { classes } = this.props;
    return (
      <div>
        <ListItem
          button
          classes={{ root: classes.listItem }}
          onClick={() => this.setState({ customers: !this.state.customers })}
        >
          مشتریان
        </ListItem>
        <Divider />
        {
          this.state.customers ?
            <div>
              <ListItem>
                <List disablePadding component="ul">
                  {
                    this.hasPermission(config.customer.list) ?
                      <ListItem classes={{ root: classes.listItem }}>
                        <Link to='/dashboard/customer/list' className={classes.link}>لیست مشتریان</Link>
                      </ListItem>
                      : ''
                  }
                </List>
              </ListItem>
              <Divider />
            </div>
          : ''
        }
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
    if (flag)
      return;

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
        {
          this.state.products ?
            <div>
              <ListItem>
                <List disablePadding component="ul">
                  {
                    this.hasPermission(config.product.add) ?
                      <ListItem classes={{ root: classes.listItem }}>
                        <Link to='/dashboard/product/add' className={classes.link}>افزودن محصول</Link>
                      </ListItem>
                      : ''
                  }
                </List>
              </ListItem>
              <Divider />
            </div>
          : ''
        }
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <List component="ul" disablePadding>
          <ListItem>
            <Link to='/dashboard' className={classes.link}>داشبورد</Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link to='/dashboard/transactions' className={classes.link}>تراکنش ها</Link>
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
          <ListItem>
            <Link to='/dashboard/support' className={classes.link}>پشتیبانی</Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link to='/dashboard/about' className={classes.link}>درباره ما</Link>
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return { ...app };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(SideBarContent);
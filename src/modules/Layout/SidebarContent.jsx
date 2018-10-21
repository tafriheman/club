import React, { Component } from 'react';
import {
  withStyles,
  Divider,
  List,
  ListItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './styles/SidebarContent';

class SideBarContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      plugins: false
    }
  }

  renderPluginsLinks() {
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem>
          <Link to='/dashboard' className={classes.link}>داشبورد</Link>
        </ListItem>
        <Divider />
        <List component="ul" disablePadding>
          <ListItem
            button
            classes={{ root: classes.listItem }}
            onClick={() => this.setState({ plugins: !this.state.plugins })}
          >
            افزونه ها
          </ListItem>
          <Divider />
          {this.renderPluginsLinks()}
          <ListItem>
            <Link to='/dashboard/transactions' className={classes.link}>تراکنش ها</Link>
          </ListItem>
          <Divider />
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

export default withStyles(styles)(SideBarContent);
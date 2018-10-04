import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, withStyles, Divider } from '@material-ui/core';
import { Power } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styles from './styles/SidebarContent';

class SideBarContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <Power />
            </ListItemIcon>
            <ListItemText>
              <Link to='/plugins' className={classes.link}>فروشگاه افزونه</Link>
            </ListItemText>
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(SideBarContent);
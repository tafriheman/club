import React, { Component } from 'react';
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Paper
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styles from './styles/SidebarContent';

class SideBarContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.expantionPanelSummaryRoot, expandIcon: classes.expandIcon, expanded: classes.expanded }}>
            افزونه ها
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expantionDetail}>
            <Link to='/plugins' className={classes.link}>فروشگاه افزونه</Link>
            <Link to='/my/plugins' className={classes.link}>افزونه های من</Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Paper classes={{ root: classes.paperRoot }}>
          <Link to="/transactions" className={classes.singleLink}>
            تراکنش ها
          </Link>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SideBarContent);
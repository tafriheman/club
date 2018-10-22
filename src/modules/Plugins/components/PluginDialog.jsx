import React, { Component } from 'react';
import _ from 'lodash';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  withStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  TableCell
} from '@material-ui/core';
import { Check as CheckIcon, Clear as RemoveIcon } from '@material-ui/icons';
import compose from 'recompose/compose';
import styles from '../styles/PluginDialog';
import { connect } from 'react-redux';
import { pluginsMyPluginsTogglePluginDialog, pluginsPluginsShopTogglePluginDialog } from '../../../redux/actions';
import config from '../../../config.json';

class PluginDialog extends Component {
  state = { isOpen: true };

  getPluginProp(prop) {
    const { type, pluginsPlugin, myPluginsPlugin } = this.props; 
    if(type === 'plugins-shop')
      return pluginsPlugin[prop] 
    return myPluginsPlugin[prop] 
  }

  getSum() {
    let dependencies = this.getPluginProp('dependencies');
    let sum = 0;
    _.forEach(dependencies, (dep) =>  {
      if(!dep.expire_date) {
        sum += dep.price;
      }
    });
    return sum;
  }

  render() {
    const { 
      classes, 
      type, 
      isPluginsDialogOpen, 
      isMyPluginsDialogOpen, 
      pluginsPluginsShopTogglePluginDialog, 
      pluginsMyPluginsTogglePluginDialog } = this.props;
    return (
      <Dialog
        open={
          type === 'plugins-shop' ?
            isPluginsDialogOpen : isMyPluginsDialogOpen
        }
        scroll="body"
        onClose={
          type === 'plugins-shop' ?
            pluginsPluginsShopTogglePluginDialog : pluginsMyPluginsTogglePluginDialog
        }
        classes={{
          paper: classes.paper
        }}
      >
        <DialogTitle>
          { this.getPluginProp('name') ? this.getPluginProp('name') : '' }
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <img src={`${config.domain}/${this.getPluginProp('image')}`} className={classes.pluginImage} alt="plugin logo" />
          <Grid container direction="column" classes={{ container: classes.infoContainer }}>
            {
              this.getPluginProp('description') ?
                <Typography variant="headline" gutterBottom>
                  توضیحات:‌
                </Typography>
              : ''
            }
            {
              this.getPluginProp('description') ? 
                <Typography variant="body1" gutterBottom>
                  { this.getPluginProp('description') }
                </Typography>
              : ''
            }
            <Grid item container alignItems="baseline" style={{ marginTop: '10px' }}>
              <Typography variant="title">قیمت</Typography>
              <Typography variant="body1" style={{ marginRight: '10px' }}>{ this.getPluginProp('price') }</Typography>
            </Grid>
            {
              this.getPluginProp('dependencies') && this.getPluginProp('dependencies').length !== 0 ?
                <Typography variant="headline" style={{ marginTop: '30px' }} gutterBottom>
                  افزونه های مورد نیاز:
                </Typography>
              : ''
            }
            {
              this.getPluginProp('dependencies') && this.getPluginProp('dependencies').length !== 0 ?
                <Table padding="dense">
                  <TableHead>
                    <TableRow>
                      <TableCell numeric>نام افزونه </TableCell>
                      <TableCell numeric>قیمت</TableCell>
                      <TableCell numeric>وضعیت</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      this.getPluginProp('dependencies').map(plugin => {
                        return (
                          <TableRow key={plugin._id}>
                            <TableCell numeric component="th" scope="row">{plugin.name}</TableCell>
                            <TableCell numeric>{ plugin.price }</TableCell>
                            <TableCell numeric>{ plugin.expire_date ? <CheckIcon style={{ color: 'green' }}/> : <RemoveIcon color="error"/> }</TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>
              : ''
            }
            {
              this.getPluginProp('dependencies') && this.getPluginProp('dependencies').length !== 0 ?
                <Grid container direction="row" alignItems="baseline" justify="space-between" style={{ padding: '30px' }}>
                  <Grid item>
                    <Typography variant="headline">مجموع</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{ this.getSum() }</Typography>
                  </Grid>
                </Grid>
              : ''
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          {
            type === 'plugins-shop' ?
              <Button variant="contained" color="primary">
                خرید
              </Button> :
              <Button variant="contained" color="primary">
                تمدید
              </Button>
          }

        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ pluginsMyPlugins, pluginsPluginsShop }) => {

  return {
    isPluginsDialogOpen: pluginsPluginsShop.isPluginDialogOpen,
    isMyPluginsDialogOpen: pluginsMyPlugins.isPluginDialogOpen,
    pluginsPlugin: pluginsPluginsShop.plugin,
    myPluginsPlugin: pluginsMyPlugins.plugin
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    pluginsMyPluginsTogglePluginDialog,
    pluginsPluginsShopTogglePluginDialog
  })
)(PluginDialog);
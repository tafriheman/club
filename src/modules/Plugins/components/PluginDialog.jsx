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
  TableCell,
  Checkbox
} from '@material-ui/core';
import { Check as CheckIcon, Clear as RemoveIcon } from '@material-ui/icons';
import compose from 'recompose/compose';
import styles from '../styles/PluginDialog';
import { connect } from 'react-redux';
import { 
  pluginsMyPluginsTogglePluginDialog, 
  pluginsPluginsShopTogglePluginDialog,
  pluginsPluginsShopBuyPlugin,
  pluginsMyPluginsExtendPlugin
} from '../../../redux/actions';
import config from '../../../config.json';

class PluginDialog extends Component {

  constructor(props) {
    super(props);
    
    this.state = { plugins: [], sum: -1 }
    this.removePlugin = this.removePlugin.bind(this);    
  }

  componentWillReceiveProps() {
    const { myPluginsPlugin } = this.props;
    if(myPluginsPlugin) {
      let plugins = [];
      let sum = 0;

      plugins.push(myPluginsPlugin._id);
      _.forEach(myPluginsPlugin.dependencies, dep => {
        plugins.push(dep.plugin._id)
        sum += dep.plugin.price
      });

      sum += myPluginsPlugin.price;

      this.setState({ sum, plugins });
    }
  }

  removePlugin(e, plugin) {
    let index = this.state.plugins.indexOf(plugin._id);
    let plugins = this.state.plugins;
    let sum = this.state.sum;
    if(index === -1) {
      plugins.push(plugin._id);
      sum += plugin.price;
    } else {
      plugins.splice(index, 1);
      sum -= plugin.price;
    }
    this.setState({ sum, plugins })
  }

  getPluginProp(prop) {
    const { type, pluginsPlugin, myPluginsPlugin } = this.props; 
    if(type === 'plugins-shop')
      return pluginsPlugin[prop] 
    return myPluginsPlugin[prop] 
  }

  getSum() {
    let dependencies = this.getPluginProp('dependencies');
    let sum = this.props.pluginsPlugin.price;
    _.forEach(dependencies, (dep) =>  {
      if(!dep.expire_date) {
        sum += dep.price;
      }
    });
    return sum;
  }
  
  extendPlugin() {
    const { pluginsMyPluginsExtendPlugin, token, club } = this.props;
    pluginsMyPluginsExtendPlugin(club._id, this.state.plugins, token);
  }

  buyPlugin() {
    const { pluginsPluginsShopBuyPlugin, pluginsPlugin, token, club } = this.props;
    pluginsPluginsShopBuyPlugin(club._id, [ pluginsPlugin._id ], token);
  }

  render() {
    const { 
      classes, 
      type, 
      isPluginsDialogOpen, 
      isMyPluginsDialogOpen, 
      pluginsPluginsShopTogglePluginDialog, 
      pluginsMyPluginsTogglePluginDialog } = this.props;
    let THIS = this;
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
                      {
                        type === "plugins-shop" ?
                          <TableCell numeric>وضعیت</TableCell>
                        : <TableCell>انتخاب</TableCell>
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      type === 'plugins-shop' ?
                      this.getPluginProp('dependencies').map(plugin => {
                        return (
                          <TableRow key={plugin._id}>
                            <TableCell numeric component="th" scope="row">{plugin.expire_date ? plugin.plugin.name : plugin.name}</TableCell>
                            <TableCell numeric>{ plugin.expire_date ? plugin.plugin.price : plugin.price }</TableCell>
                            <TableCell numeric>{ plugin.expire_date ? <CheckIcon style={{ color: 'green' }}/> : <RemoveIcon color="error"/> }</TableCell>
                          </TableRow>
                        );
                      })
                      : this.getPluginProp('dependencies').map(pluginInfo => {
                        return (
                          <TableRow key={pluginInfo._id}>
                            <TableCell numeric component="th" scope="row">{ pluginInfo.plugin.name }</TableCell>
                            <TableCell numeric>{ pluginInfo.plugin.price }</TableCell>
                            <TableCell>
                              <Checkbox 
                                checked={ THIS.state.plugins.indexOf(pluginInfo.plugin._id) !== -1 }
                                onChange={e => this.removePlugin(e, pluginInfo.plugin)}
                              />
                            </TableCell>
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
                    <Typography variant="body1">{ type === 'plugins-shop' ? this.getSum() : this.state.sum }</Typography>
                  </Grid>
                </Grid>
              : ''
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          {
            type === 'plugins-shop' ?
              (
                this.getPluginProp('ready_to_buy') ?
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.buyPlugin.bind(this)}>
                    خرید
                </Button> :
                <Typography variant="title">منتظر انتشار این افزونه باشید</Typography>
              )
               :
              <Button 
                variant="contained" 
                color="primary"
                onClick={this.extendPlugin.bind(this)}
              >
                تمدید
              </Button>
          }

        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ pluginsMyPlugins, pluginsPluginsShop, app }) => {

  return {
    isPluginsDialogOpen: pluginsPluginsShop.isPluginDialogOpen,
    isMyPluginsDialogOpen: pluginsMyPlugins.isPluginDialogOpen,
    pluginsPlugin: pluginsPluginsShop.plugin,
    myPluginsPlugin: pluginsMyPlugins.plugin,
    ...app
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    pluginsMyPluginsTogglePluginDialog,
    pluginsPluginsShopTogglePluginDialog,
    pluginsPluginsShopBuyPlugin,
    pluginsMyPluginsExtendPlugin
  })
)(PluginDialog);
import React, { Component } from 'react';
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


class PluginDialog extends Component {
  state = { isOpen: true };

  render() {
    const { classes, type, isPluginsDialogOpen, isMyPluginsDialogOpen, pluginsPluginsShopTogglePluginDialog, pluginsMyPluginsTogglePluginDialog } = this.props;
    return (
      <Dialog
        open= {
          type === 'plugins-shop' ?
          isPluginsDialogOpen : isMyPluginsDialogOpen
        }
        scroll="body"
        onClose={() => 
          type === 'plugins-shop' ?
          pluginsPluginsShopTogglePluginDialog : pluginsMyPluginsTogglePluginDialog
        }
        classes={{
          paper: classes.paper
        }}
      >
        <DialogTitle>
          نام افزونه
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <img src={require('../../../assets/images/global/logo.jpg')} className={classes.pluginImage} alt="plugin logo" />
          <Grid container direction="column" classes={{ container: classes.infoContainer }}>
            <Typography variant="headline" gutterBottom>
              توضیحات:‌
            </Typography>
            <Typography variant="body1" gutterBottom>
              ماژول اس ام اس به مشتریان
            </Typography>
            <Typography variant="headline" style={{ marginTop: '30px' }} gutterBottom>
              افزونه های مورد نیاز:
            </Typography>
            <Table padding="dense">
              <TableHead>
                <TableRow>
                  <TableCell numeric>نام افزونه </TableCell>
                  <TableCell numeric>قیمت</TableCell>
                  <TableCell numeric>وضعیت</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1}>
                  <TableCell numeric component="th" scope="row">افزونه ارسال پیامک</TableCell>
                  <TableCell numeric>20000</TableCell>
                  <TableCell numeric><CheckIcon /></TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell numeric component="th" scope="row">افزونه ارسال پیامک</TableCell>
                  <TableCell numeric>20000</TableCell>
                  <TableCell numeric><RemoveIcon /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Grid container direction="row" alignItems="baseline" justify="space-between" style={{ padding: '30px' }}>
              <Grid item>
                <Typography variant="headline">مجموع</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">200000</Typography>
              </Grid>
            </Grid>
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
    isMyPluginsDialogOpen: pluginsMyPlugins.isPluginDialogOpen
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { 
    pluginsMyPluginsTogglePluginDialog,
    pluginsPluginsShopTogglePluginDialog
  })
)(PluginDialog);
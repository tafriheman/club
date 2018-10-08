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
Divider,
Button,
TableCell} from '@material-ui/core';
import { Check as CheckIcon, Clear as RemoveIcon } from '@material-ui/icons';
import compose from 'recompose/compose';
import styles from '../styles/PluginDialog';


class PluginDialog extends Component {
  state = { isOpen: true };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.state.isOpen}
        scroll="body"
        onClose={() => console.log('close')}
        classes={{
          paper: classes.paper
        }}
      >
        <DialogTitle>
          نام افزونه
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <img src={require('../../../assets/images/global/logo.jpg')} className={classes.pluginImage} alt="plugin logo"/>
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
            <Grid container direction="row" alignItems="baseline" justify="space-between" style={{ padding: '30px'}}>
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
          <Button variant="contained" color="primary">
              خرید
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default compose(
  withStyles(styles)
)(PluginDialog);
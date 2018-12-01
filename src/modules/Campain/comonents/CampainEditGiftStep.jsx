import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { AddShoppingCart } from '@material-ui/icons';
import {
  Grid, 
  Typography,
  Button,
  FormLabel,
  Radio,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  withStyles
} from '@material-ui/core';
import { Remove as RemoveIcon } from '@material-ui/icons';
import {
  campainCampainEditChangeGiftProp,
  campainCampainEditToggleProductDialog,
  campainCampainEditSetGift,
  campainCampainEditSubmitForm
} from '../../../redux/actions';
import styles from '../styles/CampainEdit';
import config from '../../../config.json';
import CampainAddProductDialog from './CampainEditProductDialog';

class CampainEditGiftStep extends Component {

  constructor(props) {
    super(props);

    this.removeGift = this.removeGift.bind(this);
  }

  removeGift(gift) {
    const { gifts, campainCampainEditSetGift } = this.props; 

    let nGifts = gifts.filter(g => g.free !== gift.free );
    campainCampainEditSetGift(nGifts);
  }

  submitForm() {
    const { 
      name, start_date, expire_date, 
      point_of_add_member, 
      point_of_register,
      gifts, images, history,
      club, token, description,
      campainCampainEditSubmitForm,
      _id
    } = this.props;

    campainCampainEditSubmitForm(club._id, _id, {
      name, start_date, expire_date, point_of_add_member, point_of_register, gifts, images, description
    }, token, history)
  }

  hasPermission(permission) {
    if (this.props.club.permissions.indexOf(permission) === -1)
      return false;
    return true;
  }

  render() {
    const { 
      previous, 
      history, 
      gift,
      campainCampainEditChangeGiftProp,
      campainCampainEditToggleProductDialog,
      campainCampainEditSetGift,
      classes,
      gifts,
      error,
      products
    } = this.props;

    return (
      <Grid container direction="row" justify="center" spacing={32}>
        <Grid item container direction="column" md={6} sm={10} xs={12}>
          <Typography variant="title">امتیاز مورد نیاز</Typography>
          <TextField 
            fullWidth
            variant="outlined"
            margin="dense"
            value={gift.min_point_to_achive}
            onChange={e => campainCampainEditChangeGiftProp('min_point_to_achive', e.target.value )}
          />
          <Grid item container direction="row" alignItems="center" style={{ marginBottom: '10px', marginTop: '10px' }}>
            <Typography variant="title">نوع هدیه</Typography> 
            <FormLabel component="legend" style={{ marginRight: '20px' }}>محصول</FormLabel>
            <Radio
              checked={gift.fType === 'product'}
              onChange={ () => {
                campainCampainEditChangeGiftProp('fType', 'product')
                campainCampainEditChangeGiftProp('free', '');
              }}
              value="product"
            />
            <FormLabel component="legend">تخفیف</FormLabel>
            <Radio
              value="coupon"
              checked={ gift.fType === 'coupon' }
              onChange={ () => {
                campainCampainEditChangeGiftProp('fType', 'coupon')
                campainCampainEditChangeGiftProp('free', '');
              }}
            />
          </Grid>
          {
            gift.fType === 'coupon' ?
            <React.Fragment>
              <Typography variant="title">تخفیف</Typography>
              <TextField 
                fullWidth
                variant="outlined"
                margin="dense"
                value={gift.free}
                onChange={e => campainCampainEditChangeGiftProp('free', e.target.value )}
              />
            </React.Fragment>: ''
          }
          {
            gift.fType === 'product' && !this.hasPermission(config.product.list) ?
            <React.Fragment>
              <Typography variant="title">نام محصول</Typography>
              <TextField 
                fullWidth
                variant="outlined"
                margin="dense"
                value={gift.free}
                onChange={e => campainCampainEditChangeGiftProp('free', e.target.value )}
              />
            </React.Fragment> : ''
          }
          {
            gift.fType === 'product' && this.hasPermission(config.product.list) ?
            <Grid item container direction="row" alignItems="center">
              <Typography variant="title">انتخاب محصول</Typography>
              <Button 
                variant="fab" 
                color="primary" 
                mini 
                style={{ marginRight: '10px' }}
                onClick={campainCampainEditToggleProductDialog}
              >
                <AddShoppingCart fontSize="small"/>
              </Button>
            </Grid> : ''
          }
          <Grid item container direction="row-reverse" style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => campainCampainEditSetGift([...gifts, gift])}
            >
              افزودن هدیه
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="column" md={6} sm={10} xs={12}>
          <Typography variant="h6">هدیه های انتخاب شده</Typography>
          {
            gifts.length !== 0 &&
            <Table>
              <TableHead>
                  <TableRow>
                    <TableCell numeric>نام</TableCell>
                    {/* <TableCell numeric>نوع</TableCell> */}
                    <TableCell numeric>امتیاز</TableCell>
                    <TableCell numeric>حذف</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {
                  gifts.map((gift, i) => {
                    let product = products.find(p => p._id === gift.free );
                    return (
                      <TableRow key={i}>
                        <TableCell numeric>{ product ? product.name : gift.free }</TableCell>
                        {/* <TableCell numeric>{ gift.fType === 'coupon' ? 'تخفیف' : 'محصول' }</TableCell> */}
                        <TableCell numeric>{ gift.min_point_to_achive }</TableCell>
                        <TableCell numeric>
                          <IconButton onClick={() => this.removeGift(gift)}>
                            <RemoveIcon fontSize="small" color="secondary" />
                          </IconButton> 
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          }
        </Grid>
        <Grid item container xs={12} sm={12} md={12} direction="row">
          <Typography variant="body1" style={{ width: '100%', color: 'red' }}>{error}</Typography>
        </Grid>
        <Grid item container direction="row-reverse" className={classes.action}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitForm.bind(this)}
            >
              ویرایش
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.goBack()}
              style={{ marginLeft: '10px' }}
            >
              انصراف
            </Button>
            <Button
              variant="contained"
              onClick={previous}
              style={{ marginLeft: 'auto' }}
            >
              قبلی
            </Button>
        </Grid>
        <CampainAddProductDialog />
      </Grid>
    );
  }
}

const mapStateToProps = ({ campainCampainEdit, app }) => {
  return { ...campainCampainEdit, ...app };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    campainCampainEditChangeGiftProp,
    campainCampainEditToggleProductDialog,
    campainCampainEditSetGift,
    campainCampainEditSubmitForm
  })
)(CampainEditGiftStep);
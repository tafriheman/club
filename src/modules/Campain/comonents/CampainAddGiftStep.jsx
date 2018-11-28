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
  withStyles
} from '@material-ui/core';
import {
  campainCampainAddChangeGiftProp
} from '../../../redux/actions';
import styles from '../styles/CampainAdd';
import config from '../../../config.json';

class CampainAddGiftStep extends Component {

  constructor(props) {
    super(props);

    this.state = { giftType: '' };
  }

  submitForm() {
    const { 
      name, start_date, expire_date, 
      point_of_add_member, 
      point_of_register,
      gift, images, history,
      club, token, description,
      campainCampainListSubmitForm
    } = this.props;

    let gifts = [];
    gifts.push(gift);

    campainCampainListSubmitForm(club._id, {
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
      campainCampainAddChangeGiftProp,
      classes
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
            onChange={e => campainCampainAddChangeGiftProp('min_point_to_achive', e.target.value )}
          />
          <Grid item container direction="row" alignItems="center" style={{ marginBottom: '10px', marginTop: '10px' }}>
            <Typography variant="title">نوع هدیه</Typography> 
            <FormLabel component="legend" style={{ marginRight: '20px' }}>محصول</FormLabel>
            <Radio
              checked={this.state.giftType === 'product'}
              onChange={ () => this.setState({ giftType: 'product' })}
              value="product"
            />
            <FormLabel component="legend">تخفیف</FormLabel>
            <Radio
              value="coupon"
              checked={ this.state.giftType === 'coupon' }
              onChange={ () => this.setState({ giftType: 'coupon'}) }
            />
          </Grid>
          {
            this.state.giftType === 'coupon' ?
            <React.Fragment>
              <Typography variant="title">تخفیف</Typography>
              <TextField 
                fullWidth
                variant="outlined"
                margin="dense"
                value={gift.free}
                onChange={e => campainCampainAddChangeGiftProp('free', e.target.value )}
              />
            </React.Fragment>: ''
          }
          {
            this.state.giftType === 'product' && !this.hasPermission(config.product.list) ?
            <React.Fragment>
              <Typography variant="title">نام محصول</Typography>
              <TextField 
                fullWidth
                variant="outlined"
                margin="dense"
                value={gift.free}
                onChange={e => campainCampainAddChangeGiftProp('free', e.target.value )}
              />
            </React.Fragment> : ''
          }
          {
            this.state.giftType === 'product' && this.hasPermission(config.product.list) ?
            <Grid item container direction="row" alignItems="center">
              <Typography variant="title">انتخاب محصول</Typography>
              <Button 
                variant="fab" 
                color="primary" 
                mini 
                style={{ marginRight: '10px' }}
              >
                <AddShoppingCart fontSize="small"/>
              </Button>
            </Grid> : ''
          }
        </Grid>
        <Grid item container direction="column" md={6} sm={10} xs={12}>
          <Typography variant="h6">هدیه های انتخاب شده</Typography>

        </Grid>
        <Grid item container direction="row-reverse" className={classes.action}>
            <Button
              variant="contained"
              color="primary"
            >
              افزودن
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
      </Grid>
    );
  }
}

const mapStateToProps = ({ campainCampainAdd, app }) => {
  return { ...campainCampainAdd, ...app };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    campainCampainAddChangeGiftProp
  })
)(CampainAddGiftStep);
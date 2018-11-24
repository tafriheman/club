import React, { Component } from 'react';
import { 
  Grid,
  Typography,
  Card,
  CardContent,
  withStyles,
  TextField,
  Radio,
  FormLabel,
  Button,
  CardActions
} from '@material-ui/core';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import styles from './styles/CampainAdd';
import { DatePicker } from 'react-advance-jalaali-datepicker';
import DropZone from 'react-dropzone';
import config from '../../config.json';
import moment from 'jalali-moment';
import {
  campainCampainListChangeProp,
  campainCampainListChangeGiftProp,
  campainCampainListSubmitForm
} from '../../redux/actions';

class CampainAdd extends Component {

  constructor(props) {
    super(props);

    this.state = { giftType: 'coupon' };
    this.changeTime = this.changeTime.bind(this);
    this.DatePickerInput  = this.DatePickerInput.bind(this);
  }

  hasPermission(permission) {
    if (this.props.club.permissions.indexOf(permission) === -1)
      return false;
    return true;
  }

  DatePickerInput(props, prop) {
    return <input className={this.props.classes.datePicker} {...props} value={this.props[prop]}></input>;
  }

  changeTime(prop, unix, format) {
    let now = moment().format('jYYYY/jMM/jDD');
    if(format < now) {
      console.log(now);
      this.props.campainCampainListChangeProp(prop, now);
      return;
    }
    this.props.campainCampainListChangeProp(prop, format);
  }

  onImagesDrop(acceptedFiles, rejectedFiles) {
		if (acceptedFiles) {
      this.props.campainCampainListChangeProp('images', [])
			acceptedFiles.forEach(file => {
				const reader = new FileReader();
				reader.onload = () => {
					const image = reader.result;
          this.props.campainCampainListChangeProp('images', [...this.props.images, image])
				}
				reader.readAsDataURL(file);
			});
		}
  }


  renderImages() {
    const { images, classes } = this.props;

    if(images.length !== 0) {
      return (
        <Grid item container direction="row">
        <Typography variant="title" style={{ width: '100%' }}>عکس های ارسال شده</Typography>
        {
          images.map((image, i) => {
            return <img src={image} key={i} alt="" className={classes.image}/>
          })
        }
       </Grid>
      )
    }
  }

  submitForm() {
    const { 
      name, 
      start_date, 
      expire_date, 
      point_of_add_member, 
      point_of_register,
      gift,
      images,
      history,
      club,
      token,
      description,
      campainCampainListSubmitForm
    } = this.props;

    let gifts = [];
    gifts.push(gift);

    campainCampainListSubmitForm(club._id, {
      name, start_date, expire_date, point_of_add_member, point_of_register, gifts, images, description
    }, token, history)
  }

  render() {
    const { 
      classes,
      history,
      name,
      point_of_register,
      point_of_add_member,
      gift,
      error,
      description,
      campainCampainListChangeProp,
      campainCampainListChangeGiftProp
    } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>افزودن کمپین</Typography>
        <Grid item container style={{ marginTop: '20px' }} direction="column">
          <Card>
            <CardContent>
              <Grid item container direction="row" alignItems="baseline" spacing={32} justify="center">
                <Grid item container xs={12} sm={10} md={6} direction="row">
                  <Typography variant="title">نام</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={name}
                    onChange={e => campainCampainListChangeProp('name', e.target.value)}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6}>
                  <Typography variant="title">امتیاز مورد نیاز</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={gift.min_point_to_achive}
                    onChange={e => campainCampainListChangeGiftProp('min_point_to_achive', e.target.value )}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6} direction="row" alignItems="baseline">
                  <Typography variant="title" style={{ marginBottom: '20px', width: '25%' }}>تاریخ شروع</Typography>
                  <DatePicker 
                    placeholder="انتخاب تاریخ"
                    format="jYYYY/jMM/jDD"
                    inputComponent={(props) => this.DatePickerInput(props, 'start_date')}
                    onChange={(unix, format) =>  this.changeTime('start_date', unix, format)}
                  />
               </Grid>
                <Grid item container xs={12} sm={10} md={6} direction="row" alignItems="baseline">
                  <Typography variant="title" style={{ marginBottom: '20px', width: '25%' }}>تاریخ پایان</Typography>
                  <DatePicker 
                    placeholder="انتخاب تاریخ"
                    format="jYYYY/jMM/jDD"
                    inputComponent={(props) => this.DatePickerInput(props, 'expire_date')}
                    onChange={(unix, format) => this.changeTime('expire_date', unix, format)}
                  />
               </Grid>
              <Grid item container xs={12} sm={10} md={6} direction="row">
                  <Typography variant="title">چه تعداد امتیاز به مشتری دعوت کننده می دهید</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={point_of_add_member}
                    onChange={e => campainCampainListChangeProp('point_of_add_member', e.target.value)}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6}>
                  <Typography variant="title">چه تعداد امتیاز به کاربری که ثبت نام می کند می دهید</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={point_of_register}
                    onChange={e => campainCampainListChangeProp('point_of_register', e.target.value )}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6} direction="row" alignItems="center">
                  <Typography variant="title">یک هدیه انتخاب کنید تا مشتریان به ثبت نام در فروشگاه شما ترغیب شوند</Typography> 
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
                <Grid item container xs={12} sm={10} md={6}>
                  <Typography variant="title">توضیحات</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={description}
                    multiline
                    rows={3}
                    onChange={e => campainCampainListChangeProp('description', e.target.value )}
                  />
                </Grid>
                {
                  this.state.giftType === 'coupon' ?
                  <Grid item container xs={12} sm={10} md={6}>
                    <Typography variant="title">تخفیف</Typography>
                    <TextField 
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      value={gift.free}
                      onChange={e => campainCampainListChangeGiftProp('free', e.target.value )}
                    />
                  </Grid> : ''
                }
                {
                  this.state.giftType === 'product' && !this.hasPermission(config.product.list) ?
                  <Grid item container xs={12} sm={10} md={6}>
                    <Typography variant="title">نام محصول</Typography>
                    <TextField 
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      value={gift.free}
                      onChange={e => campainCampainListChangeGiftProp('free', e.target.value )}
                    />
                  </Grid> : ''
                }
                {
                  this.state.giftType === 'product' && this.hasPermission(config.product.list) ?
                  <Grid item container xs={12} sm={10} md={6} direction="row" alignItems="center">
                    <Typography variant="title">انتخاب محصول</Typography>
                    <Button 
                      variant="contained"
                      style={{ marginRight: '10px' }}
                    >
                      انتخاب
                    </Button>
                  </Grid> : ''
                }
                <Grid item container xs={12} sm={10} md={6} direction="row" justify="center">
                  <Typography variant="title" style={{ width: '100%' }}>عکس ها</Typography>
                  <DropZone
                    multiple
                    onDrop={this.onImagesDrop.bind(this)}
                    accept="image/jpeg, image/png, image/gif"
                  >
                    <div className={classes.uploadMessageContainer}>
                      <p>عکس ها را اینجا بکشید</p>
                      <p>یا کلیک کنید</p>
                    </div>
                  </DropZone>
                </Grid>
                { this.renderImages() }
                <Grid item container xs={12} sm={12} md={12} direction="row">
                  <Typography variant="body1" style={{ width: '100%', color: 'red' }}>{error}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container direction="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.submitForm.bind(this)}
                >
                  افزودن
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  variant="contained"
                  color="secondary"
                  onClick={() => history.goBack()}
                >
                  انصراف
                </Button>
              </Grid>
           </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ campainCampainList, app }) => {
  return { ...campainCampainList, ...app };
}

export default compose(
  connect(mapStateToProps, {
    campainCampainListChangeProp,
    campainCampainListChangeGiftProp,
    campainCampainListSubmitForm
  }),
  withStyles(styles)
)(CampainAdd);
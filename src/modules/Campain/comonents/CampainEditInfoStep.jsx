import React, { Component } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
  campainCampainEditChangeProp,
} from '../../../redux/actions';
import { DatePicker } from 'react-advance-jalaali-datepicker';
import moment from 'jalali-moment';
import styles from '../styles/CampainEdit';


class CampainEditInfoStep extends Component {

  constructor(props) {
    super(props);

    this.DatePickerInput = this.DatePickerInput.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }

  DatePickerInput(props, prop) {
    return <input className={this.props.classes.datePicker} {...props} value={this.props[prop]}></input>;
  }

  changeTime(prop, unix, format) {
    let now = moment().format('jYYYY/jMM/jDD');
    if(format < now) {
      this.props.campainCampainEditChangeProp(prop, now);
      return;
    }
    this.props.campainCampainEditChangeProp(prop, format);
  }


  render() {
    const { 
      name, 
      description, 
      next,
      campainCampainEditChangeProp,
      classes
    } = this.props;

    return (
      <Grid container direction="row" justify="center" spacing={16}>
        <Grid item container md={6} sm={10} xs={12}  direction="column">
          <Grid item container>
            <Typography variant="h6">نام</Typography>
            <TextField 
              fullWidth
              variant="outlined"
              margin="dense"
              value={name}
              style={{ width: '100%' }}
              onChange={e => campainCampainEditChangeProp('name', e.target.value)}
            />
          </Grid>
          <Grid item container direction="row" alignItems="center" style={{ marginTop: '20px' }}>
            <Typography variant="title" style={{ width: '50%' }}>تاریخ شروع</Typography>
            <DatePicker 
              placeholder="انتخاب تاریخ"
              format="jYYYY/jMM/jDD"
              inputComponent={(props) => this.DatePickerInput(props, 'start_date')}
              onChange={(unix, format) =>  this.changeTime('start_date', unix, format)}
            />
          </Grid>
          <Grid item container direction="row" alignItems="center" style={{ marginBottom: '20px' }}>
            <Typography variant="title" style={{ width: '50%' }}>تاریخ پایان</Typography>
            <DatePicker 
              placeholder="انتخاب تاریخ"
              format="jYYYY/jMM/jDD"
              inputComponent={(props) => this.DatePickerInput(props, 'expire_date')}
              onChange={(unix, format) => this.changeTime('expire_date', unix, format)}
            />
          </Grid>
        </Grid>
        <Grid item container md={6} sm={10} xs={12} direction="column">
          <Grid item container>
            <Typography variant="h6">توضیحات</Typography>
            <TextField 
              fullWidth
              variant="outlined"
              margin="dense"
              value={description}
              multiline
              rows={6}
              onChange={e => campainCampainEditChangeProp('description', e.target.value )}
            />
          </Grid>
        </Grid>
        <Grid item container direction="row-reverse" className={classes.action}>
          <Button
            variant="contained"
            onClick={next}
          >
            بعدی
          </Button>
        </Grid>
    </Grid>
    );
  }
}

const mapStateToProps = ({ campainCampainEdit }) => {
  return { ...campainCampainEdit };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    campainCampainEditChangeProp,
  })
)(CampainEditInfoStep);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActions,
  TextField,
  withStyles,
  Button
} from '@material-ui/core';
import styles from './styles/CustomerAdd';
import {
  customerCustomerAddChangeProp,
  customerCustomerSubmitForm
} from '../../redux/actions';

class CustomerAdd extends Component {
  render() {
    const { 
      classes, 
      customerCustomerAddChangeProp, 
      full_name, 
      phone, 
      error, 
      address, 
      job, 
      city, 
      birth_date,
      customerCustomerSubmitForm,
      club,
      token
    } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>افزودن مشتری</Typography>
        <Grid item container style={{ marginTop: '20px' }} direction="column" justify="center" alignItems="center">
          <Card className={classes.card}>
            <CardContent>
              <Grid container direction="column" style={{ padding: '30px' }}>
                <Typography variant="title">نام و نام خانوادگی</Typography>
                <TextField 
                  fullWidth
                  value={full_name}
                  onChange={e => customerCustomerAddChangeProp('full_name', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title"className={classes.phoneLabel}>شماره همراه</Typography>
                <TextField 
                  fullWidth
                  value={phone}
                  onChange={e => customerCustomerAddChangeProp('phone', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>آدرس</Typography>
                <TextField 
                  fullWidth
                  value={address}
                  onChange={e => customerCustomerAddChangeProp('address', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>شغل</Typography>
                <TextField 
                  fullWidth
                  value={job}
                  onChange={e => customerCustomerAddChangeProp('job', e.target.value)}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>شهر</Typography>
                <TextField 
                  fullWidth
                  value={city}
                  onChange={e => customerCustomerAddChangeProp('city', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>تاریخ تولد</Typography>
                <TextField 
                  placeholder="1397/01/01"
                  fullWidth
                  value={birth_date}
                  onChange={e => customerCustomerAddChangeProp('birth_date', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="caption" style={{ color: 'red', marginTop: '20px' }}>{error}</Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container direction="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => customerCustomerSubmitForm(
                    {full_name, job, city, birth_date, phone, address},
                    this.props.history,
                    club._id,
                    token
                  )}
                >
                  افزودن
                </Button>
              </Grid>
            </CardActions>
          </Card> 
       </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ customerCustomerAdd, app }) => {
  return { ...customerCustomerAdd, ...app };
}

export default compose(
  connect(mapStateToProps, {
    customerCustomerAddChangeProp,
    customerCustomerSubmitForm
  }),
  withStyles(styles)
)(CustomerAdd);
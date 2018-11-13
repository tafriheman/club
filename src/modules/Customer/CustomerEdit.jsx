import React, { Component } from 'react'
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  withStyles,
  TextField
} from '@material-ui/core';
import styles from './styles/CustomerEdit';
import {
  customerCustomerEditChangeProp,
  customerCustomerEditSubmitForm
} from '../../redux/actions';

class EditCustomer extends Component{

  render() {
    const { 
      classes, 
      full_name, 
      phone, 
      error, 
      address, 
      job, 
      city, 
      birth_date,
      club,
      history,
      _id,
      token,
      customerCustomerEditChangeProp,
      customerCustomerEditSubmitForm
    } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>ویرایش مشتری</Typography>
        <Grid item container style={{ marginTop: '20px' }} direction="column" justify="center" alignItems="center">
          <Card className={classes.card}>
            <CardContent>
              <Grid container direction="column" style={{ padding: '30px' }}>
                <Typography variant="title">نام و نام خانوادگی</Typography>
                <TextField 
                  fullWidth
                  value={full_name}
                  onChange={e => customerCustomerEditChangeProp('full_name', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title"className={classes.phoneLabel}>شماره همراه</Typography>
                <TextField 
                  fullWidth
                  value={phone}
                  onChange={e => customerCustomerEditChangeProp('phone', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>آدرس</Typography>
                <TextField 
                  fullWidth
                  value={address}
                  onChange={e => customerCustomerEditChangeProp('address', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>شغل</Typography>
                <TextField 
                  fullWidth
                  value={job}
                  onChange={e => customerCustomerEditChangeProp('job', e.target.value)}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>شهر</Typography>
                <TextField 
                  fullWidth
                  value={city}
                  onChange={e => customerCustomerEditChangeProp('city', e.target.value )}
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>تاریخ تولد</Typography>
                <TextField 
                  placeholder="1397/01/01"
                  fullWidth
                  value={birth_date}
                  onChange={e => customerCustomerEditChangeProp('birth_date', e.target.value )}
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
                  onClick={() => customerCustomerEditSubmitForm(club._id, _id, {
                    full_name,
                    phone,
                    address,
                    job,
                    birth_date,
                    city
                  }, token, history)}
                >
                  ویرایش
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => history.goBack() }
                  style={{ marginLeft: '10px' }}
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

const mapStateToProps = ({ customerCustomerEdit, app }) => {
  return { ...customerCustomerEdit, ...app}
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    customerCustomerEditChangeProp,
    customerCustomerEditSubmitForm
  }),
  // withRouter()
)(EditCustomer);
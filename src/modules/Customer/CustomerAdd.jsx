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

class CustomerAdd extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>افزودن مشتری</Typography>
        <Grid item container style={{ marginTop: '20px' }} direction="column" justify="center" alignItems="center">
          <Card style={{ width: '70%' }}>
            <CardContent>
              <Grid container direction="column" style={{ padding: '30px' }}>
                <Typography variant="title">نام و نام خانوادگی</Typography>
                <TextField 
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title"className={classes.phoneLabel}>شماره همراه</Typography>
                <TextField 
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>آدرس</Typography>
                <TextField 
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>شغل</Typography>
                <TextField 
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>شهر</Typography>
                <TextField 
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
                <Typography variant="title" style={{ marginTop: '10px' }}>تاریخ تولد</Typography>
                <TextField 
                  placeholder="1397/01/01"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container direction="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
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


export default compose(
  withStyles(styles)
)(CustomerAdd);
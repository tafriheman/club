import React, { Component } from 'react';
import { 
  Grid,
  Typography,
  Card,
  CardContent,
  withStyles,
  CardActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import compose from 'recompose/compose';
import styles from './styles/ProductAdd';

class ProductAdd extends Component {

  state = { type: '', links: [] }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>افزودن محصول</Typography>
        <Grid item container style={{ marginTop: '30px' }} direction="column">
          <Card>
            <CardContent>
              <Grid container direction="row" alignItems="baseline" justify="center" spacing={40}>
                <Grid item xs={10} sm={8} md={4}>
                  <TextField
                    fullWidth
                    placeholder='نام'
                  />
                </Grid> 
                <Grid item xs={10} sm={8} md={4}>
                  <TextField
                    fullWidth
                    placeholder='قیمت'
                  />
                </Grid> 
                <Grid item xs={10} sm={8} md={4}>
                  <TextField
                    fullWidth
                    placeholder='امتیاز'
                  />
                </Grid> 
              </Grid>
              <Grid container direction="row" alignItems="baseline" justify="center" spacing={40} style={{ marginTop: '10px' }}>
                <Grid item xs={10} sm={8} md={4}>
                  <FormControl
                    fullWidth
                  >
                    <Select
                      displayEmpty
                      classes={{ icon: classes.selectIcon }}
                      value={this.state.type}
                    >
                      <MenuItem value="" disabled>
                        نوع محصول را انتخاب کنید
                      </MenuItem>
                      <MenuItem value="downloadable">داری لینک دانلود</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> 
                <Grid item xs={10} sm={8} md={8}>
                  
                </Grid> 
              </Grid>
            </CardContent>
            <CardActions>

            </CardActions>
          </Card> 
       </Grid>
      </Grid>
    );
  }
}

export default compose(
  withStyles(styles)
)(ProductAdd);
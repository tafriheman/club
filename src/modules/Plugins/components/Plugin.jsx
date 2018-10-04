import React, { Component } from 'react';
import { withStyles, Card, CardMedia, CardContent, Grid, CardActions } from '@material-ui/core'
import styles from '../styles/Plugin';
import { Link } from 'react-router-dom';

class Plugin extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid md={3} sm={6} xs={12} item>
        <Card className={classes.card}>
          <CardMedia
            image={require('../../../assets/images/global/logo.jpg')}
            className={classes.pluginImage}
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <Grid container direction="row" alignItems="baseline" spacing={16}>
              <h4 className={classes.pluginLabel}>نام افزونه</h4>
              <span>:</span>
              <span className={classes.pluginName}>ارسال  پیامک به مشتریان</span>
            </Grid>
            <Grid container direction="row" alignItems="baseline" spacing={16}>
              <h4 className={classes.pluginLabel}>قیمت</h4>
              <span>:</span>
              <span className={classes.pluginPrice}>2000</span>
            </Grid>
          </CardContent>
          <CardActions classes={{ root: classes.cardActions }}>
            <Link to="#" className={classes.link}>خرید</Link>
          </CardActions>
        </Card>

      </Grid>
    );
  }
}

export default withStyles(styles)(Plugin);
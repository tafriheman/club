import React, { Component } from 'react';
import { withStyles, Card, CardMedia, CardContent, Grid, CardActionArea } from '@material-ui/core'
import styles from '../styles/PluginCard';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { 
  pluginsMyPluginsTogglePluginDialog, 
  pluginsPluginsShopTogglePluginDialog,
  pluginsPluginsShopFetchPlugin
} from '../../../redux/actions';
import config from '../../../config.json';

class PluginCard extends Component {

  pluginClicked() {
    const { type, 
      pluginsMyPluginsTogglePluginDialog, 
      pluginsPluginsShopFetchPlugin,
      plugin,
      club,
      token
    } = this.props; 

    if(type === 'plugins-shop') {
        pluginsPluginsShopFetchPlugin(club._id, plugin._id, token);
    } else {
        pluginsMyPluginsTogglePluginDialog()
    }
  }

  render() {
    const {
      classes,
      type,
      plugin
    } = this.props;
    return (
      <Grid md={3} sm={6} xs={12} item>
        <Card className={classes.card}>
          <CardActionArea
            className={classes.cardActionArea}
            onClick={this.pluginClicked.bind(this)}
          >
            <CardMedia
              image={`${config.domain}/${plugin.image}`}
              className={classes.pluginImage}
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <Grid container direction="column" spacing={16}>
                <h4 className={classes.pluginLabel}>{plugin.name}</h4>
              </Grid>
              {
                type === 'plugins-shop' ?
                  <Grid container direction="row" alignItems="baseline" spacing={16}>
                    <h4 className={classes.pluginLabel}>قیمت</h4>
                    <span>:</span>
                    <span className={classes.pluginPrice}>{plugin.price}</span>
                  </Grid>
                  :
                  <Grid container direction="row" alignItems="baseline" spacing={16}>
                    <h4 className={classes.pluginLabel}>تاریخ انقضا</h4>
                    <span>:</span>
                    <span className={classes.pluginExpireDate}>{plugin.expire_date}</span>
                  </Grid>
              }
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return { ...app };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    pluginsMyPluginsTogglePluginDialog,
    pluginsPluginsShopTogglePluginDialog,
    pluginsPluginsShopFetchPlugin
  })
)(PluginCard);
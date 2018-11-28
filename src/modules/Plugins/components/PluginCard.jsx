import React, { Component } from 'react';
import { withStyles, Card, CardMedia, CardContent, Grid, CardActionArea } from '@material-ui/core'
import styles from '../styles/PluginCard';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { 
  pluginsMyPluginsTogglePluginDialog, 
  pluginsPluginsShopTogglePluginDialog,
  pluginsPluginsShopFetchPlugin,
  pluginsMyPluginsFetchPlugin
} from '../../../redux/actions';
import config from '../../../config.json';

class PluginCard extends Component {

  pluginClicked() {
    const { type, 
      pluginsMyPluginsFetchPlugin,
      pluginsPluginsShopFetchPlugin,
      plugin,
      club,
      token
    } = this.props; 

    if(type === 'plugins-shop') {
        pluginsPluginsShopFetchPlugin(club._id, plugin._id, token);
    } else {
      pluginsMyPluginsFetchPlugin(club._id, plugin.plugin._id, token)
    }
  }

  render() {
    const {
      classes,
      type,
      plugin,
      club
    } = this.props;
    return (
      <Grid md={3} sm={6} xs={12} item>
        <Card className={classes.card}>
          <CardActionArea
            className={classes.cardActionArea}
            onClick={this.pluginClicked.bind(this)}
          >
            <CardMedia
              image={ !plugin.expire_date ? `${config.domain}/${plugin.image}` : `${config.domain}/${plugin.plugin.image}`}
              className={classes.pluginImage}
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <Grid container direction="column" spacing={16}>
                <h4 className={classes.pluginLabel}>{!plugin.expire_date ? plugin.name : plugin.plugin.name }</h4>
              </Grid>
              {
                club.options.show_plugin_price &&       
                <Grid container direction="row" alignItems="baseline" spacing={16}>
                  <h4 className={classes.pluginLabel}>قیمت</h4>
                  <span>:</span>
                  <span className={classes.pluginPrice}>{ !plugin.expire_date ? plugin.price : plugin.plugin.price }</span>
                </Grid>
              }
              {
                type === 'my-plugins' ? 
                  <Grid container direction="row" alignItems="baseline" spacing={16}>
                    <h4 className={classes.pluginLabel}>تاریخ انقضا</h4>
                    <span>:</span>
                    <span className={classes.pluginExpireDate}>{plugin.expire_date}</span>
                  </Grid>
                : ''
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
    pluginsPluginsShopFetchPlugin,
    pluginsMyPluginsFetchPlugin
  })
)(PluginCard);
import React, {Component} from 'react'
import {withStyles, Divider, List, ListItem, Avatar, Grid, Typography} from '@material-ui/core'
import {Link, withRouter} from 'react-router-dom'
import styles from '../styles/ClubSidebarContent'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import config from '../../../config.json'

class ClubSideBarContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: false,
      orders: false,
    }
  }

  renderProduct() {
    const {classes} = this.props
    console.log(this.props)
    return (
      <div>
        <ListItem
          button
          classes={{root: classes.listItem}}
          onClick={() => this.setState({products: !this.state.products})}
        >
          محصولات
        </ListItem>
        <Divider/>
        {this.state.products ? (
          <div>
            <ListItem>
              <List disablePadding component="ul">
                <ListItem classes={{root: classes.listItem}}>
                  <Link to={`/clubs/${this.props.match.params.clubId}`} className={classes.link}>
                    لیست محصولات
                  </Link>
                </ListItem>
              </List>
            </ListItem>
            <Divider/>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }

  renderOrders() {
    const {classes} = this.props
    if (this.state.orders)
      return (
        <div>
          <ListItem>
            <List disablePadding component="ul">
              <ListItem classes={{root: classes.listItem}}>
                <Link to="/dashboard/labels" className={classes.link}>
                  برچسب گذاری
                </Link>
              </ListItem>
              <ListItem classes={{root: classes.listItem}}>
                <Link to="/dashboard/checkLists" className={classes.link}>
                  چک لیست
                </Link>
              </ListItem>
              <ListItem classes={{root: classes.listItem}}>
                <Link to="/dashboard/order" className={classes.link}>
                  سفارشات
                </Link>
              </ListItem>
            </List>
          </ListItem>
          <Divider/>
        </div>
      )
  }


  render() {
    const {classes} = this.props
    return (
      <div>
        <Grid container justify="center" alignItems="center" direction='column'>
          <Avatar className={classes.bigAvatar}>C</Avatar>
          <Typography>نام کلاب</Typography>
        </Grid>
        <List component="ul" disablePadding>


          <Divider/>
          {this.renderProduct()}

          {/*<ListItem
            button
            classes={{root: classes.listItem}}
          >
            قرعه کشی‌ها
          </ListItem>

          <Divider/>

          {this.renderOrders()}

          <ListItem
            button
            classes={{root: classes.listItem}}
          >
            تخفیف‌ها
          </ListItem>

          <Divider/>

          <ListItem
            button
            classes={{root: classes.listItem}}
          >
            رویدادها و دورهمی‌ها
          </ListItem>

          <Divider/>

          <ListItem
            button
            classes={{root: classes.listItem}}
          >
            کمپین‌ها و هدایا
          </ListItem>

          <Divider/>

          <ListItem
            button
            classes={{root: classes.listItem}}
          >
            سفارشات
          </ListItem>
          <Divider/>
          {this.renderOrders()}

          <ListItem
            component="a"
            href="https://tafriheman.net/help"
            style={{textAlign: 'right', color: 'black'}}
          >
            درباره ما
          </ListItem>
          <Divider/>*/}
        </List>
      </div>
    )
  }
}

const mapStateToProps = ({app}) => {
  return {...app}
}

export default withRouter(
  compose(
    withStyles(styles),
    connect(mapStateToProps),
  )(ClubSideBarContent))

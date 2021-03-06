import React, {Component} from 'react'
import {Toolbar, AppBar, IconButton, Avatar, Button, colors, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {withStyles} from '@material-ui/core/styles'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {
  layoutDashboardLayoutToggleNavbar,
  appLogout,
} from '../../redux/actions'
import styles from './styles/TopNavbar'
import {withRouter} from 'react-router-dom'
import config from '../../config.json'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

class TopNavbar extends Component {

  gotoDashboard = () => (
    this.props.history.push('/dashboard')
  )

  render() {
    const {
      classes,
      layoutDashboardLayoutToggleNavbar,
      appLogout,
      history,
      club,
      isClubProfile,
    } = this.props

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={layoutDashboardLayoutToggleNavbar}
            className={classes.navIconHide}
          >
            <MenuIcon/>
          </IconButton>
          {club && club.logo ? <Avatar src={`${config.domain}/${club.logo}`}/> : ''}
          {club && <h3 className={classes.clubName}>{club.name}</h3>}

          {isClubProfile ?
            <Button
              variant="contained"
              color="primary"
              className={classes.clubButton}
              onClick={this.gotoDashboard}
            >
                ایجاد / ورود به کلاب
            </Button>
            :
            <IconButton
              className={classes.logoutButton}
              onClick={() => {
                appLogout()
                history.push('/login')
              }}
            >
              <PowerSettingsNewIcon/>
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = ({app}) => {
  return {...app}
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    {
      layoutDashboardLayoutToggleNavbar,
      appLogout,
    },
  ),
)(TopNavbar)

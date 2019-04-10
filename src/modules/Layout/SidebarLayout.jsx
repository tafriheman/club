import React, {Component} from 'react'
import {Hidden, Drawer, withStyles} from '@material-ui/core'
import ClubSideBarContent from './ClubProfile/ClubSidebarContent'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {layoutDashboardLayoutToggleNavbar} from '../../redux/actions'
import SideBarContent from './SidebarContent'

class SideBarLayout extends Component {

  render() {
    const {classes, layoutDashboardLayoutToggleNavbar, mobileOpen, isClubProfile} = this.props
    // console.log('isClubProfile: ', isClubProfile)

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={layoutDashboardLayoutToggleNavbar}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {isClubProfile ?
              <ClubSideBarContent />
              :
              <SideBarContent />
            }
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {isClubProfile ?
              <ClubSideBarContent/>
              :
              <SideBarContent/>
            }

          </Drawer>
        </Hidden>
      </div>
    )
  }
}

const styles = theme => ({
  drawerPaper: {
    height: '100vh',
    width: '240px',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
})

const mapStateToProps = ({layoutDashboardLayout}) => {
  return {...layoutDashboardLayout}
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    layoutDashboardLayoutToggleNavbar,
  }),
)(SideBarLayout)
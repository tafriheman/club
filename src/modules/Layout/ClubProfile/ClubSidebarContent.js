import React, {Component} from 'react'
import {withStyles, Divider, List, ListItem, Avatar, Grid, Typography} from '@material-ui/core'
import {Link, withRouter} from 'react-router-dom'
import styles from '../styles/ClubSidebarContent'
import compose from 'recompose/compose'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../../config.json'
import jwtDecode from 'jwt-decode';
class ClubSideBarContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: false,
            orders: false,
        }
    }

    logOut() {
        //user_token
        localStorage.removeItem('user_token');
        const {router} = this.context;
        router.history.push('/')

    }

    renderProduct() {
        const {classes, club, isClubProfile} = this.props
        let club_id = null

        if (club)
            club_id = isClubProfile ? this.props.match.params.clubId : this.props.club._id;
        if (window.location.host.includes('javaniran.club') && window.location.pathname === '/') {
            club_id = "5ca89c77e1d47c25a0374f51"
        } else if (window.location.host.includes("tafriheman.net") && window.location.pathname === '/') {
            club_id = "5bdd57b4397fec163454204e"
        }else if(window.location.host.includes("localhost:3000") && window.location.pathname === '/'){
            club_id = "5bdd57b4397fec163454204e"
        }


        if (this.props.club && this.props.club._id !== '' && window.location.pathname === '/dashboard/product/list') {
            club_id = this.props.club._id
        }
        return (
            <div>
                <ListItem
                    classes={{root: classes.listItem}}
                >
                    <Link to={`/clubs/${club_id}`} className={classes.link}>
                        لیست محصولات
                    </Link>
                </ListItem>
                <Divider/>
                <ListItem
                    classes={{root: classes.listItem}}
                >
                    <Link to={`/orders`} className={classes.link}>
                        لیست سفارشات
                    </Link>
                </ListItem>
                <Divider />
                <ListItem
                    button
                    onClick={this.logOut.bind(this)}
                    classes={{root: classes.listItem}}
                >
                    خروج
                </ListItem>
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
        const {classes} = this.props;
        // var decoded = jwtDecode(localStorage.getItem('TAFRIHEMAN_CLUB_UESR@KEY'));
        return (
            <div>
                <Grid container justify="center" alignItems="center" direction='column'>
                    {/*<Avatar className={classes.bigAvatar}>C</Avatar>*/}
                    <Typography></Typography>
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

ClubSideBarContent.contextTypes = {
    router: PropTypes.object
};
const mapStateToProps = ({app}) => {
    return {...app}
}

export default withRouter(
    compose(
        withStyles(styles),
        connect(mapStateToProps),
    )(ClubSideBarContent))

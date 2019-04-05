import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Button,
} from '@material-ui/core';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});
 class SmsBC extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:''
        }
    }

onClick(){
    let os = this.getMobileOperatingSystem();
    let url = '';
    let number = '10000044040040'
    if (os === 'Android') {
        url = `sms:${number}?body=${this.props.match.params.str}`;
    } else if (os === 'iOS') {
        url = `sms:${number}&body=${this.props.match.params.str}`;
    }

    if (os!=='unknown') {
        window.open(url, '_blank');
    }else{
        this.setState({
            message:'لطفا با تلفن همراه انجام دهید.'
        })
    }
}
  

 getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

    render() {
        const { classes } = this.props;
        return( <Grid container direction="column" alignItems="center">
        
            <Button variant="contained" color="primary" onClick={this.onClick.bind(this)} className={classes.button}>Send SMS</Button>
            <p>{this.state.message}</p>
        </Grid>);
    }
}
export default withStyles(styles)(SmsBC);
import React, { Component } from "react";
export default class SmsBC extends Component {
    constructor(props) {
        super(props);
        
    }
componentDidMount(){
    debugger
    let os = this.getMobileOperatingSystem();
    let url='';
    let number='50009500095000'
    if (os ==='Android'){
        url = `sms:${number}?body=${this.props.match.params.str}`;
    } else if (os === 'iOS'){
        url = `sms:${number}&body=${this.props.match.params.str}`;
    }
    else{
    }
    if(url.length>0){
        window.open(url, '_blank');
    }
    
}
  

 getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
debugger
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
        return <div></div>;
    }
}

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import {
  GetMessageDetail
} from "../../redux/actions";
import compose from "recompose/compose";
import moment from "jalali-moment";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Grid
} from "@material-ui/core";
import "../../assets/css/global/index.css";
import SideBarLayout from "../Layout/SidebarLayout"
import TopNavbar from "../Layout/TopNavbar";
import jwtDecode from 'jwt-decode';
import ReactPaginate from "react-paginate";
import {Link} from 'react-router-dom';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class MessageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      messageDetails:{}
    };
 
  }

  componentWillMount() {
  const{GetMessageDetail}=this.props;
  
    if (localStorage.getItem('user_token')){
      var decoded = jwtDecode(localStorage.getItem('user_token'));
      GetMessageDetail(decoded.user._id, this.props.match.params.code,localStorage.getItem('user_token')).then((response)=>{
        this.setState({
          loading:false,
      messageDetails:response.data
        })
      });
    }
    
  }
 georgianToPersianDate = date => {
    let persianDate = moment(date)
      .locale("fa")
      .format("YYYY/M/D");
    return persianDate;
  };
 
  render() {
    const { classes } = this.props;
    const {  userMessage, fetchingUserMessages}=this.props;
    if (!localStorage.getItem('user_token')) {
      return <div className='_error_login'>لطفابرای مشاهده لیست پیام ها <Link to='/'>لاگین</Link> کنید</div>
      }
    return (
      <div style={{ display: "flex" }}>
        <TopNavbar  />
        <SideBarLayout isClubProfile />
        <div
         
          style={{
            marginTop:70,
            marginRight:30
          }}
        >
      {
        this.state.loading ? <CircularProgress className={classes.progress} /> :
         <Grid container spacing={16}>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={6}spacing={16} className={classes.column}>
                {
                  this.state.messageDetails.message
                }
                </Grid>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={6}spacing={16}>
                 <Typography variant="title"> {` فرستنده: ${this.state.messageDetails.sender_name}`} </Typography>
                  <Typography variant="title">{` وضعیت: ${ this.state.messageDetails.message_state}`} {
                } </Typography>
                 
                  <Typography variant="title">{`تاریخ ارسال : ${this.georgianToPersianDate(this.state.messageDetails.created_at_time)}`}</Typography>
                </Grid>
          </Grid>
      }
          
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state,{app}) => {
  const { userMessage, fetchingUserMessages, totalUSerMessages,pageSize}=state.message;
  return {
    userMessage, fetchingUserMessages, totalUSerMessages,pageSize,
    ...app
  };
};

export default withRouter(compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      GetMessageDetail
    }
  )
)(MessageDetails));
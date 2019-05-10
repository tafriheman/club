import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import {
  GetCustomerMessageList
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
  CircularProgress
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

class MessageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
  const{GetCustomerMessageList,pageSize}=this.props;
  
    if (localStorage.getItem('user_token')){
      var decoded = jwtDecode(localStorage.getItem('user_token'));
      GetCustomerMessageList(decoded.user._id, 1, 8,localStorage.getItem('user_token'));
    }
    
  }
 georgianToPersianDate = date => {
    let persianDate = moment(date)
      .locale("fa")
      .format("YYYY/M/D");
    return persianDate;
  };
  handlePageClick(data) {
    const { GetCustomerMessageList } = this.props;
    if (localStorage.getItem('user_token')) {
      var decoded = jwtDecode(localStorage.getItem('user_token'));
      GetCustomerMessageList(decoded.user._id, data.selected + 1, 8,localStorage.getItem('user_token'));
    }
  }
  renderPagination() {
    const { totalUSerMessages } = this.props;
    if (totalUSerMessages > 8)
      return (
        <ReactPaginate
          previousLabel={"قبلی"}
          nextLabel={"بعدی"}
          breakLabel={<a className="page-link">...</a>}
          pageCount={Math.ceil(totalUSerMessages / 8)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          containerClassName="pagination"
          nextClassName="page-item"
          previousClassName="page-item"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          breakClassName="page-item"
        />
      );
  }
  render() {
    const { classes } = this.props;
    const {  userMessage, fetchingUserMessages}=this.props;
    console.log('fetchingUserMessages',fetchingUserMessages)
       console.log('userMessage',userMessage)
    if (!localStorage.getItem('user_token')) {
      return <div className='_error_login'>لطفابرای مشاهده لیست پیام ها <Link to='/'>لاگین</Link> کنید</div>
      }
    return (
      <div className="sectin__container" style={{ display: "flex" }}>
        <TopNavbar  />
        <SideBarLayout isClubProfile />
        <div
          className="sectin__divContainer"
          style={{
            marginTop:70,
            marginRight:30
          }}
        >
        {
           fetchingUserMessages ?  <CircularProgress className={classes.progress} /> :
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>متن</TableCell>
                      <TableCell align="right">وضعیت</TableCell>
                      <TableCell align="right">فرستنده</TableCell>
                      <TableCell align="right"> تاریخ ارسال</TableCell>
                       <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userMessage.map((row,index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.message}
                        </TableCell>
                        <TableCell align="right">{row.message_state}</TableCell>
                        <TableCell align="right">{row.sender_name}</TableCell>
                        <TableCell align="right"> {this.georgianToPersianDate(row.created_at_time)}</TableCell>
                        <TableCell align="right"> <Link to={`/message/${row._id}`}><RemoveRedEyeIcon className={classes.icon} /></Link></TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {this.renderPagination()}
              </Paper>
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
      GetCustomerMessageList
    }
  )
)(MessageCustomer));
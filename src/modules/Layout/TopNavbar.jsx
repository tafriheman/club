import React, {Component} from 'react'
import {
  FormControl,
  FormLabel ,
  RadioGroup ,
  Toolbar, 
  AppBar,
  IconButton,
  TextField ,
  Avatar, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio ,
  MenuItem,
  InputLabel,
  FormHelperText,
  Input,
  Select } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu'
import {withStyles} from '@material-ui/core/styles'
import compose from 'recompose/compose'
import {connect} from 'react-redux';
import {
  layoutDashboardLayoutToggleNavbar,
  appLogout,
  clubMembership,
  clubMembershipVerify,
  completeClubMembership
} from '../../redux/actions'
import styles from './styles/TopNavbar'
import {withRouter} from 'react-router-dom'
import config from '../../config.json'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

class TopNavbar extends Component {
  constructor(props){
    super(props);
    this.state={
      open:false,
      mobile:'',
      step:0,
      code:'',
      full_name:'',
      gender: 'female',
      marital_status:'single',
      day:1,
      month:1,
      year:1300,
      message:'',
      userId:'',
      error:''

    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  gotoDashboard = () => (
    this.props.history.push('/dashboard')
  )
  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({
      open: false, 
      step: 0, 
      error:'',
      code: '',
      mobile: '', 
      full_name: '',
      gender: 'female',
      marital_status: 'single',
      day: 1,
      month: 1,
      year: 1300, });
  }
  onSubmit=()=>{
    if(this.state.step===0){
      if(this.state.mobile.length===0){
        this.setState({
          error:'لطفا شماره موبایل را وارد نمایید'
        })
        return;
      }
      this.props.clubMembership(this.state.mobile).then((response)=>{
        if (response.status===200){
          this.setState({
            step: 1,
            error:''
          })
        }
      });
     
    }
    else if(this.state.step===1){
      if (this.state.code.length === 0) {
        this.setState({
          error: 'لطفا کد را وارد نمایید'
        })
        return;
      }
      this.props.clubMembershipVerify(this.state.mobile, this.state.code).then((response) => {
        if (response.status === 200) {
          if(response.data.user.status_register){
            alert('با موفقیت عضو شدید.')
          }
          else{
            this.setState({
              step: 2,
              userId: response.data.user._id,
              error:''
            })
          }
         
        }
      });
    }
    else if (this.state.step === 2) {
      if (this.state.full_name.length === 0) {
        this.setState({
          error: 'لطفا نام و نام خانوادگی را وارد نمایید'
        })
        return;
      }
      let birth_date='';
      let month = this.state.month < 10 ? '0' + this.state.month : this.state.month;
      if (this.state.year!==1300){
        birth_date = `${this.state.year}/${month}/${this.state.day}`;
      }
  
      this.props.completeClubMembership(this.state.full_name, '1368/01/18', this.state.gender, this.state.marital_status, this.state.userId).then((response) => {
        if (response.status === 200) {
          alert('با موفقیت عضو شدید.')
          this.setState({
            open: false,
            step: 0,
            code: '',
            mobile: '',
            error:'',
            full_name: '',
            gender: 'female',
            marital_status: 'single',
            day: 1,
            month: 1,
            year: 1300, });
        }
      });
    }
  }
  backToStepZero=()=>{
    this.setState({
      step:0
     })
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  }
  handleChangePosition = event => {
    this.setState({ marital_status: event.target.value });
  }
  render() {
    const {
      classes,
      layoutDashboardLayoutToggleNavbar,
      appLogout,
      history,
      club,
      isClubProfile,
    } = this.props
const month=[
  {
    value:1,
    text:'فروردین'

  },
  {
    value:2,
    text:'اردیبهشت'
  },
  {
    value:3,
    text:'خرداد'
  },
  {
    value:4,
    text:'تیر'
  },
  {
    value:5,
    text:'مرداد'
  },
  {
    value:6,
    text:'شهریور'
  },
  {
    value:7,
    text:'مهر'
  },
  {
    value:8,
    text:'آبان'
  },
  {
    value:9,
    text:'آذر'
  },
  {
    value:10,
    text:'دی'
  },
  {
    value:11,
    text:'بهمن'
  },
  {
    value:12,
    text:'اسفند'
  },

];
  let years=[];
  for(let i=1300;i<1398;i++){
    let year= {
      value:i,
      text:i
    };
    years.push(year);
  }
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"

        >
          <DialogContent>
            <TextField
            className={classes.inputStyle}
            error={this.state.error.length>0}
            id="standard-error"
            value={this.state.step === 0 ? this.state.mobile : ((this.state.step === 1 && this.state.step !== 0) ? this.state.code : this.state.full_name)}
              label={this.state.error.length > 0 ? this.state.error :(this.state.step===0 ? "شماره موبایل" : ((this.state.step===1 && this.state.step!==0 ) ?"کد فعالسازی": 'نام و نام خانوادگی'))}
            margin="normal"
            onChange={(event)=>{
              if(this.state.step===0){
                this.setState({
                  mobile:event.target.value
                })
              }
              else if(this.state.step===1){
                this.setState({
                  code:event.target.value
                })
              }
              else if(this.state.step===2){
                this.setState({
                  full_name:event.target.value
                })
              }
             
            }}
           />
           <br/>
           {
              this.state.step===2 &&   <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="day-simple">روز</InputLabel>
                <Select
                  value={this.state.day}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'day',
                    id: 'day-simple',
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="month-helper">ماه</InputLabel>
                <Select
                  value={this.state.month}
                  onChange={this.handleChange}
                  input={<Input name="month" id="month-helper" />}
                >
                {
                  month.map((m,index)=>{
                    return <MenuItem value={m.value}>{m.text}</MenuItem>
                  })
                }
              
                </Select>
               
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="year-helper">سال</InputLabel>
                <Select
                  value={this.state.year}
                  onChange={this.handleChange}
                  displayEmpty
                  name="year"
                  className={classes.selectEmpty}
                >
                {
                  years.map((y,i)=>{
                    return  <MenuItem value={y.value}>{y.text}</MenuItem>
                  })
                }
               
                </Select>
              
              </FormControl>
              
            </form>
          }
           {
             this.state.step===2 &&
             <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">جنسیت</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                className={classes.group}
                value={this.state.gender}
                onChange={this.handleChangeGender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="زن"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="مرد"
                  labelPlacement="end"
                />
              </RadioGroup>
              <FormLabel component="legend">وضعیت تاهل</FormLabel>
              <RadioGroup
                aria-label="marital_status"
                name="marital_status"
                className={classes.group}
                value={this.state.marital_status}
                onChange={this.handleChangePosition}
              >
                <FormControlLabel
                  value="single"
                  control={<Radio color="primary" />}
                  label="مجرد"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="married"
                  control={<Radio color="primary" />}
                  label="متاهل"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
           }
     
        
          </DialogContent>
          <DialogActions>
            <Button  onClick={this.state.step===0 ? this.handleClose : this.backToStepZero} color="secondary">
            {
              this.state.step!==1 ? 'انصراف' : 'بازگشت و اصلاح شماره'
            }
        
            </Button>
            <Button variant="contained" onClick={this.onSubmit} color="primary" autoFocus>
            {this.state.step!==1 ? 'ثبت نام' : 'تایید'}
            </Button>
          </DialogActions>
        </Dialog>
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
          {isClubProfile && <div className={classes.registerButton} onClick={this.handleClickOpen}><Button variant="outlined" color="primary">{localStorage.getItem('user_token')? 'لغو عضویت' : 'عضو شوید'}</Button></div>}
      </AppBar>
      
     </div>
      
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
      clubMembership,
      clubMembershipVerify,
      completeClubMembership
    },
  ),
)(TopNavbar)

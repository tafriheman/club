import React, {Component} from 'react'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Toolbar,
    AppBar,
    IconButton,
    TextField,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    FormControlLabel,
    Radio,
    MenuItem,
    InputLabel,
    FormHelperText,
    Input,
    Select
} from '@material-ui/core';
import Share from "@material-ui/icons/Share";
import MenuIcon from '@material-ui/icons/Menu'
import {withStyles} from '@material-ui/core/styles'
import compose from 'recompose/compose'
import {connect} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {
    layoutDashboardLayoutToggleNavbar,
    appLogout,
    clubMembership,
    clubMembershipVerify,
    completeClubMembership,
    cancelMemebrShip,
    clubRegister,
    checkUserMembership
} from '../../redux/actions'
import SnackBar from "../../components/SnackBar";
import styles from './styles/TopNavbar'
import {withRouter} from 'react-router-dom'
import config from '../../config.json'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


class TopNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            mobile: '',
            step: 0,
            code: '',
            full_name: '',
            gender: 'female',
            marital_status: 'single',
            day: 1,
            month: 1,
            year: 1300,
            message: '',
            userId: '',
            error: '',
            disabledRegister: false,
            showSnackBar: false,
            typeSnackBar: "",
            messageSnackBar: "",

        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        if(localStorage.getItem('user_token')){
            const {
                isClubProfile,
                checkUserMembership,
            } = this.props;
            let club_id = null
            club_id = isClubProfile ? this.props.match.params.clubId : (this.props.club ? this.props.club._id : null);
            if (window.location.host.includes('javaniran.club') && window.location.pathname === '/') {
                club_id = "5ca89c77e1d47c25a0374f51"
            } else if (window.location.host.includes("tafriheman.net") && window.location.pathname === '/') {
                club_id = "5bdd57b4397fec163454204e"
            } else if (window.location.host.includes("localhost:3000") && window.location.pathname === '/') {
                club_id = "5bdd57b4397fec163454204e"
            }
            if (this.props.match.params.clubId){
                club_id = this.props.match.params.clubId
            }
            if (club_id!==null){
                var decoded = jwtDecode(localStorage.getItem('user_token'));
                checkUserMembership(decoded.user.phone, club_id)
            }
            
        }
    

    }
    handleSnackBarClose = () => {
        this.setState({ showSnackBar: false });
    };
    gotoDashboard = () => {
        if (localStorage.getItem('TAFRIHEMAN_CLUB_UESR@KEY')) {
            this.props.history.push('/dashboard/product/list')
        }
        else {
            this.props.history.push('/login')
        }
    }


    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({
            open: false,
            step: 0,
            error: '',
            code: '',
            mobile: '',
            full_name: '',
            gender: 'female',
            marital_status: 'single',
            day: 1,
            month: 1,
            year: 1300,
        });
    }
    onSubmit = () => {
        this.setState({
            disabledRegister: true
        }, () => {
            if (this.state.step === 0) {
                if (this.state.mobile.length === 0) {
                    this.setState({
                        error: 'لطفا شماره موبایل را وارد نمایید',
                        disabledRegister: false
                    })
                    return;
                }
                this.props.clubMembership(this.state.mobile).then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            step: 1,
                            error: '',
                            disabledRegister: false
                        })
                    }
                    else {
                        this.setState({
                            error: 'شماره تلفن معتبر نیست',
                            disabledRegister: false
                        })
                    }
                });

            }
            else if (this.state.step === 1) {
                if (this.state.code.length === 0) {
                    this.setState({
                        error: 'لطفا کد را وارد نمایید',
                        disabledRegister: false
                    })
                    return;
                }
                this.props.clubMembershipVerify(this.state.mobile, this.state.code).then((response) => {
                    if (response.status === 200) {
                        if (response.data.user.status_register) {
                            var decoded = jwtDecode(localStorage.getItem('user_token'));
                            this.props.clubRegister(this.props.match.params.clubId, decoded.user._id).then((response) => {


                                this.setState({
                                    open: false,
                                    error: '',
                                    step: 0,
                                    disabledRegister: false,
                                    showSnackBar: true,
                                    typeSnackBar: "success",
                                    messageSnackBar: 'با موفقیت عضو شدید',
                                })
                            })

                        }
                        else {
                            this.setState({
                                step: 2,
                                userId: response.data.user._id,
                                error: '',
                                disabledRegister: false
                            })
                        }

                    } else {
                        this.setState({
                            error: 'کد وارد شده معتبر نیست',
                            disabledRegister: false
                        })
                    }
                });
            }
            else if (this.state.step === 2) {
                if (this.state.full_name.length === 0) {
                    this.setState({
                        error: 'لطفا نام و نام خانوادگی را وارد نمایید',
                        disabledRegister: false
                    })
                    return;
                }
                let birth_date = '';
                let month = this.state.month < 10 ? '0' + this.state.month : this.state.month;
                if (this.state.year !== 1300) {
                    birth_date = `${this.state.year}/${month}/${this.state.day}`;
                }
                this.props.completeClubMembership(this.state.full_name, birth_date, this.state.gender, this.state.marital_status, this.state.userId).then((response) => {
                    if (response.status === 200) {
                        var decoded = jwtDecode(localStorage.getItem('user_token'));
                        this.props.clubRegister(this.props.match.params.clubId, decoded.user._id).then((response) => {
                            this.setState({
                                open: false,
                                step: 0,
                                code: '',
                                mobile: '',
                                error: '',
                                full_name: '',
                                gender: 'female',
                                marital_status: 'single',
                                day: 1,
                                month: 1,
                                year: 1300,
                                disabledRegister: false,
                                showSnackBar: true,
                                typeSnackBar: "success",
                                messageSnackBar: 'با موفقیت عضو شدید',
                            });
                        })

                    }
                });
            }
        });
    }


    backToStepZero = () => {
        this.setState({
            step: 0
        })
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleChangeGender = event => {
        this.setState({gender: event.target.value});
    }
    handleChangePosition = event => {
        this.setState({marital_status: event.target.value});
    }
    cancelMembership = () => {
        const { cancelMemebrShip, isClubProfile} = this.props;
        let club_id = null
        club_id = isClubProfile ? this.props.match.params.clubId : (this.props.club ? this.props.club._id : null);
        if (window.location.host.includes('javaniran.club') && window.location.pathname === '/') {
            club_id = "5ca89c77e1d47c25a0374f51"
        } else if (window.location.host.includes("tafriheman.net") && window.location.pathname === '/') {
            club_id = "5bdd57b4397fec163454204e"
        } else if (window.location.host.includes("localhost:3000") && window.location.pathname === '/') {
            club_id = "5bdd57b4397fec163454204e"
        }
        if (this.props.match.params.clubId) {
            club_id = this.props.match.params.clubId
        }
        var decoded = jwtDecode(localStorage.getItem('user_token'));
        cancelMemebrShip(club_id, decoded.user._id).then((response) => {
            this.setState({
                error: false,
                showSnackBar: true,
                typeSnackBar: "success",
                messageSnackBar: 'با موفقیت عضویت شما لغو گردید',
            });
            
        })
    }

    render() {
        const {
            classes,
            layoutDashboardLayoutToggleNavbar,
            appLogout,
            history,
            club,
            isClubProfile,
            registerUser
        } = this.props;
        
        const month = [
            {
                value: 1,
                text: 'فروردین'

            },
            {
                value: 2,
                text: 'اردیبهشت'
            },
            {
                value: 3,
                text: 'خرداد'
            },
            {
                value: 4,
                text: 'تیر'
            },
            {
                value: 5,
                text: 'مرداد'
            },
            {
                value: 6,
                text: 'شهریور'
            },
            {
                value: 7,
                text: 'مهر'
            },
            {
                value: 8,
                text: 'آبان'
            },
            {
                value: 9,
                text: 'آذر'
            },
            {
                value: 10,
                text: 'دی'
            },
            {
                value: 11,
                text: 'بهمن'
            },
            {
                value: 12,
                text: 'اسفند'
            },

        ];
        let years = [];
        for (let i = 1300; i < 1398; i++) {
            let year = {
                value: i,
                text: i
            };
            years.push(year);
        }
        let days = [];
        for (let i = 1; i < 32; i++) {
            let day = {
                value: i,
                text: i
            };
            days.push(day);
        }
        let username = '';
        if (localStorage.getItem('user_token')) {
            var decoded = jwtDecode(localStorage.getItem('user_token'));
            username = decoded.user.full_name
        }
        let clubName = '';
        if (localStorage.getItem('TAFRIHEMAN_CLUB_UESR@KEY')) {
            var decoded = jwtDecode(localStorage.getItem('TAFRIHEMAN_CLUB_UESR@KEY'));
            clubName = decoded.club.name
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
                    <DialogTitle id="simple-dialog-title">برای عضویت در کلاب باید لاگین کنید</DialogTitle>
                    <DialogContent>
                        <TextField
                            className={classes.inputStyle}
                            error={this.state.error.length > 0}
                            id="standard-error"
                            value={this.state.step === 0 ? this.state.mobile : ((this.state.step === 1 && this.state.step !== 0) ? this.state.code : this.state.full_name)}
                            label={this.state.error.length > 0 ? this.state.error : (this.state.step === 0 ? "شماره موبایل" : ((this.state.step === 1 && this.state.step !== 0 ) ? "کد فعالسازی" : 'نام و نام خانوادگی'))}
                            margin="normal"
                            onChange={(event) => {
                                if (this.state.step === 0) {
                                    this.setState({
                                        mobile: event.target.value
                                    })
                                }
                                else if (this.state.step === 1) {
                                    this.setState({
                                        code: event.target.value
                                    })
                                }
                                else if (this.state.step === 2) {
                                    this.setState({
                                        full_name: event.target.value
                                    })
                                }

                            }}
                        />
                        <br/>
                        {
                            this.state.step === 2 && <form className={classes.root} autoComplete="off">
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
                                        {
                                            days.map((m, index) => {
                                                return <MenuItem value={m.value}>{m.text}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="month-helper">ماه</InputLabel>
                                    <Select
                                        value={this.state.month}
                                        onChange={this.handleChange}
                                        input={<Input name="month" id="month-helper"/>}
                                    >
                                        {
                                            month.map((m, index) => {
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
                                            years.map((y, i) => {
                                                return <MenuItem value={y.value}>{y.text}</MenuItem>
                                            })
                                        }

                                    </Select>

                                </FormControl>

                            </form>
                        }
                        {
                            this.state.step === 2 &&
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
                                        control={<Radio color="primary"/>}
                                        label="زن"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio color="primary"/>}
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
                                        control={<Radio color="primary"/>}
                                        label="مجرد"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="married"
                                        control={<Radio color="primary"/>}
                                        label="متاهل"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                        }


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.state.step === 0 ? this.handleClose : this.backToStepZero}
                                color="secondary">
                            {
                                this.state.step !== 1 ? 'انصراف' : 'بازگشت و اصلاح شماره'
                            }

                        </Button>
                        <Button variant="contained" onClick={this.onSubmit} color="primary" autoFocus
                                disabled={this.state.disabledRegister}>
                            {this.state.disabledRegister ? 'لطفا منتطر بمانید' : this.state.step !== 1 ? 'ثبت نام/ورود' : 'تایید/ورود'}
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
                        {}
                        {
                            isClubProfile ? <h3 className={classes.clubName}>{username}</h3> :
                                <h3 className={classes.clubName}>{clubName}</h3>                        }
                        {
                            isClubProfile ? '' :
                                <IconButton aria-label="Cart" onClick={() => {
                                    if (localStorage.getItem('TAFRIHEMAN_CLUB_UESR@KEY')) {
                                        var decoded = jwtDecode(localStorage.getItem('TAFRIHEMAN_CLUB_UESR@KEY'));
                                        var clubId = decoded.club._id;
                                        var hostName = window.location.hostname.toString();
                                        window.open(/*hostName +*/'/clubs/' + clubId, '_blank');
                                    }
                                }}>
                                    <Share style={{color: 'white'}}/>
                                </IconButton>
                        }
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
                    {isClubProfile && <div className={classes.registerButton}
                        onClick={this.props.registerUser ? this.cancelMembership : this.handleClickOpen}>
                        <Button variant="outlined"
                                color="primary">{this.props.registerUser ? 'لغو عضویت' : 'عضو شوید'}</Button>
                    </div>}
                </AppBar>
                <SnackBar
                    show={this.state.showSnackBar}
                    type={this.state.typeSnackBar}
                    message={this.state.messageSnackBar}
                    onClose={this.handleSnackBarClose}
                    autoHideDuration={5000}
                />
            </div>

        )
    }
}

const mapStateToProps = (state, {app}) => {
    const {userData} = state.club;
    const registerUser=state.app.registerUser;
    return {...app, userData,registerUser}
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
            completeClubMembership,
            cancelMemebrShip,
            clubRegister,
            checkUserMembership
        },
    ),
)(TopNavbar)

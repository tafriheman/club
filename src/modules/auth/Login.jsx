import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import BackgorundImage from '../../assets/images/auth/bg.jpg';



import '../../assets/css/auth/login.css';

class Login extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Grid
					className={classes.container}
					container
					justify="center"
					alignItems="center"
				>
					<Grid
						md={3}
						item
						className={classes.formContainer}
					>
					<Avatar 
						src={require('../../assets/images/global/logo.jpg')}
						classes={{ root: classes.logo }}
					/>
						<FormControl
							fullWidth
							className={classes.usernameFormControl}
						>
							<Input
								classes={{ input: classes.input, underline: classes.inputUnderline }}
								placeholder="نام کاربری"
								startAdornment={
									<InputAdornment
										classes={{ root: classes.userIcon }}
										position="start"
									>
										<AccountCircle />
									</InputAdornment>
								}
							/>
						</FormControl>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							classes={{ root: classes.loginButton }}>
							ورود
						</Button>
						<Link to='/register' className={classes.registerLink}>ثبت نام</Link>
					</Grid>
				</Grid>
				<div className={classes.backgroundImage}></div>
			</div>
		);
	}
}

const styles = theme => ({
	container: {
		height: '100vh',
	},
	formContainer: {
		textAlign: 'center'
	},
	logo: {
		height: '128px',
		width: '128px',
		marginRight: 'auto',
		marginLeft: 'auto'
	},
	usernameFormControl: {
		marginTop: '30px',
		marginBottom: '30px'
	},
	input: {
		paddingRight: '10px !important',
		color: 'white'
	},
	inputUnderline: {
		borderBottom: '1px solid white',
	},
	userIcon: {
		marginRight: 0,
		color: 'white'
	},
	loginButton: {
		marginBottom: '20px'
	},
	registerLink: {
		textDecoration: 'none',
		color: 'white'
	},
	backgroundImage: {
		zIndex: '-1',
		position: 'fixed',
		height: '100%',
		width: '100%',
		top: 0,
		left: 0,
		background: `url(${BackgorundImage})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		'&::after': {
			zIndex: 1,
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			display: 'block',
			backgroundColor: 'rgba(0,0,0, 0.7)',
			content: '""'
		}
	}
});


export default withStyles(styles)(Login);
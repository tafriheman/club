import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { Button, Avatar, Input, FormControl, InputAdornment, Grid, Typography } from '@material-ui/core';
import styles from './styles/Login.js';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { authLoginVerifyChangeProp, authLoginVerifySendVerificationCode } from '../../redux/actions';


class Login extends Component {
	render() {
		const { classes, phone, authLoginVerifyChangeProp, error, authLoginVerifySendVerificationCode, history } = this.props;

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
								value={phone}
								onChange={e => authLoginVerifyChangeProp('phone', e.target.value )}
							/>
						</FormControl>
						<FormControl>
								<Typography color="error" variant="body1" className={classes.error}>
								{ error }
								</Typography>
						</FormControl>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={() => authLoginVerifySendVerificationCode(phone, history)}
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

const mapStateToProps = ({ authLoginVerify }) => {
	return { ...authLoginVerify };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps, {
		authLoginVerifyChangeProp,
		authLoginVerifySendVerificationCode
	})
)(Login);
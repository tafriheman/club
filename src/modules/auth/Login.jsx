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
	constructor(props) {
		super(props);
		this.state = {
	
			disabled: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.error !== nextProps.error) {
			this.setState({
				disabled: false
			})
		}
	}
	render() {
		const { classes, phone, authLoginVerifyChangeProp, error, authLoginVerifySendVerificationCode, history } = this.props;

		return (
			<div onKeyPress={e => {
				if (e.key === 'Enter') {
					this.setState({
						disabled: true
					}, () => {
						authLoginVerifySendVerificationCode(phone, history)
					});
					
				}
			}}
			>
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
								placeholder="شماره موبایل"
								startAdornment={
									<InputAdornment
										classes={{ root: classes.userIcon }}
										position="start"
									>
										<AccountCircle />
									</InputAdornment>
								}
								value={phone}
								onChange={e =>
									authLoginVerifyChangeProp('phone', e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<Typography color="error" variant="body1" className={classes.error}>
								{error}
							</Typography>
						</FormControl>
						<Button
							variant="contained"
							color={this.state.disabled ? '' :"primary"}
							fullWidth
							
							onClick={() => {
								this.setState({
									disabled: true
								}, () => {
										authLoginVerifySendVerificationCode(phone, history)
								});
							}}
							classes={{ root: classes.loginButton }}>
							{
								this.state.disabled ? 'منتظر بمانید' : 'ورود'
							}
							
						</Button>
						<Link to='/register' className={classes.registerLink}>ثبت نام</Link>
						<p className={classes.policy}>تفریح من به شما این امکان را می دهد که برای خود یک باشگاه مشتریان ایجاد و مشتریان خود را مدیریت کنید و آن ها را به خرید مجدد ترغیب نمایید. جهت استفاده از این باشگاه، مشتریان ابتدا ثبت نام نمایید و افزونه مورد نظر خود را تهیه فرمایید.</p>
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
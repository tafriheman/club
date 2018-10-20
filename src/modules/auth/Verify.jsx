import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { Button, Avatar, Input, FormControl, InputAdornment, Grid, Typography } from '@material-ui/core';
import styles from './styles/Login.js';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { authLoginVerifyChangeProp, authLoginVerifyVerifyCode } from '../../redux/actions';



class Verify extends Component {
	render() {
		const { classes, error, code, authLoginVerifyChangeProp, authLoginVerifyVerifyCode, phone, history } = this.props;

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
								placeholder="کد فعال سازی"
								value={code}
								onChange={e => authLoginVerifyChangeProp('code', e.target.value)}
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
						<FormControl>
								<Typography color="error" variant="body1" className={classes.error}>
								{ error }
								</Typography>
						</FormControl>
						<Button
							onClick={() => authLoginVerifyVerifyCode(phone, code, history)}
							variant="contained"
							color="primary"
							fullWidth
							classes={{ root: classes.loginButton }}>
              تایید
						</Button>
						<Link to='/login' className={classes.registerLink} onClick={() => authLoginVerifyChangeProp('error', '')}>بازگشت و اصلاح شماره</Link>
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
		authLoginVerifyVerifyCode
	})
)(Verify);
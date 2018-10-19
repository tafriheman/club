import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { Button, Avatar, Input, FormControl, InputAdornment, Grid } from '@material-ui/core';
import styles from './styles/Login.js';



class Verify extends Component {
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
								placeholder="کد فعال سازی"
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
              تایید
						</Button>
						<Link to='/login' className={classes.registerLink}>بازگشت و اصلاح شماره</Link>
					</Grid>
				</Grid>
				<div className={classes.backgroundImage}></div>
			</div>
		);
	}
}

export default withStyles(styles)(Verify);
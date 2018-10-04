import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropZone from 'react-dropzone';
import { connect } from 'react-redux';
import { authRegisterChangeForm } from '../../redux/actions';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { setRTLTextPlugin } from 'mapbox-gl'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles'
import { Grid, FormControl, Input, InputAdornment, Avatar, Button } from '@material-ui/core';
import { Phone, LocationOn, StoreMallDirectory, Description } from '@material-ui/icons';
import BackgorundImage from '../../assets/images/auth/bg.jpg';


// config map
const Map = ReactMapboxGl({
	accessToken: "pk.eyJ1Ijoicm1zMjEiLCJhIjoiY2ptcmp0aXgzMDF0azNwbGJyMDl1emppbiJ9.abyt2atUYYbJ8k95PjjCSw"
});
setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.2/mapbox-gl-rtl-text.js');


class Register extends Component {

	constructor(props) {
		super(props);

		this.onLogoDrop = this.onLogoDrop.bind(this);
		this.onImagesDrop = this.onImagesDrop.bind(this);
		this.onMapClick = this.onMapClick.bind(this);
	}


	onMapClick(map, e) {
		this.props.authRegisterChangeForm('location', e.lngLat);
	}

	onLogoDrop(acceptedFiles, rejectedFiles) {
		if (acceptedFiles) {
			const reader = new FileReader();
			reader.onload = () => {
				const image = reader.result;
				this.props.authRegisterChangeForm('logo', image);
			};
			reader.readAsDataURL(acceptedFiles[0]);
		}
	}

	onImagesDrop(acceptedFiles, rejectedFiles) {
		if (acceptedFiles) {
			let images = [];
			acceptedFiles.forEach(file => {
				const reader = new FileReader();
				reader.onload = () => {
					const image = reader.result;
					images.push(image);
					this.props.authRegisterChangeForm('images', images);
				}
				reader.readAsDataURL(file);
			});
		}
	}

	renderImages() {
		if (this.props.form.images.length !== 0) {
			return (
				<div>
					<p className={this.props.classes.label}>عکس های ارسال شده</p>
					{
						this.props.form.images.map((image, i) => {
							return <img className={this.props.classes.imagesImage} src={image} alt="" key={i} />
						})
					}
				</div>
			);
		}
	}

	renderMarker() {
		const { location } = this.props.form;
		if (!_.isEmpty(location)) {
			return (
				<Marker
					coordinates={[location.lng, location.lat]}
				>
					<img src={require('../../assets/images/auth/marker.png')} alt='marker' style={{ width: 24, height: 24 }} />
				</Marker>
			);
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Grid
					className={classes.container}
					container
					justify="center"
				>
					<Grid item md={6} xs={11} sm={8}>
						<Grid
							container
							spacing={16}
							justify="center"
						>
							<Grid item xs={12}>
								<Avatar
									src={require('../../assets/images/global/logo.jpg')}
									classes={{ root: classes.logo }}
								/>
							</Grid>

							<Grid item md={6} sm={8} xs={10} className={classes.inputGridContainer}>
								<FormControl
									fullWidth
								>
									<Input
										classes={{ input: classes.input, underline: classes.inputUnderline }}
										placeholder="نام فروشگاه"
										startAdornment={
											<InputAdornment
												classes={{ root: classes.inputIcon }}
												position="start"
											>
												<StoreMallDirectory />
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item md={6} sm={8} xs={10} className={classes.inputGridContainer}>
								<FormControl
									fullWidth
								>
									<Input
										classes={{ input: classes.input, underline: classes.inputUnderline }}
										placeholder="شماره همراه"
										startAdornment={
											<InputAdornment
												classes={{ root: classes.inputIcon }}
												position="start"
											>
												<Phone />
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item md={6} sm={8} xs={10} className={classes.inputGridContainer}>
								<FormControl
									fullWidth
								>
									<Input
										multiline
										classes={{ input: classes.input, underline: classes.inputUnderline }}
										placeholder="آدرس"
										startAdornment={
											<InputAdornment
												classes={{ root: classes.inputIcon }}
												position="start"
											>
												<LocationOn />
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item md={6} sm={8} xs={10} className={classes.inputGridContainer}>
								<FormControl
									fullWidth
								>
									<Input
										classes={{ input: classes.input, underline: classes.inputUnderline }}
										placeholder="توضیحات"
										startAdornment={
											<InputAdornment
												classes={{ root: classes.inputIcon }}
												position="start"
											>
												<Description />
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item md={6} sm={8} xs={12} container direction="column" alignItems="center">
								<p className={classes.label}>لوگو</p>
								<DropZone
									multiple={false}
									onDrop={this.onLogoDrop}
									accept="image/jpeg, image/png"
								>
									{
										this.props.form.logo ?
											<img style={{ borderRadius: 5, margin: 'auto' }} width={197} height={197} src={this.props.form.logo} alt="logo" />
											:
											<div className={classes.uploadMessageContainer}>
												<p className={classes.textWhite}>عکس را اینجا بکشید</p>
												<p className={classes.textWhite}>یا کلیک کنید</p>
											</div>
									}
								</DropZone>
							</Grid>
							<Grid item md={6} sm={8} xs={12} container direction="column" alignItems="center">
								<p className={classes.label}>عکس های فروشگاه</p>
								<DropZone
									onDrop={this.onImagesDrop}
									accept="image/jpeg, image/png"
								>
									<div className={classes.uploadMessageContainer}>
										<p className={classes.textWhite}>عکس ها را اینجا بکشید</p>
										<p className={classes.textWhite}>یا کلیک کنید</p>
									</div>
								</DropZone>
							</Grid>
							<Grid item xs={12} container direction="row">
								{this.renderImages()}
							</Grid>
							<Grid item xs={12} container direction="column" className={classes.inputGridContainer}>
								<p className={classes.label}>مکان فروشگاه</p>
								<Map
									style="mapbox://styles/mapbox/streets-v9"
									containerStyle={{
										width: '100%',
										height: 300
									}}
									center={[52.5837, 29.5918]}
									zoom={[11]}
									onClick={this.onMapClick}
								>
									{this.renderMarker()}
								</Map>
							</Grid>
							<Grid xs={12} sm={10} md={6} item container direction="column" alignItems="center">
								<Button
									variant="contained"
									color="primary"
									fullWidth
									style={{ marginBottom: '20px' }}
								>
									ثبت نام
								</Button>
								<Link to='/login' className={classes.loginLink}>ورود</Link>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<div className={classes.backgroundImage}></div>
			</div>
		)
	}
}

const styles = theme => ({
	container: {
		height: '100vh',
	},
	logo: {
		height: '128px',
		width: '128px',
		marginRight: 'auto',
		marginLeft: 'auto',
		marginTop: '50px',
		marginBottom: '30px'
	},
	inputGridContainer: {
		marginBottom: '20px'
	},
	input: {
		paddingRight: '10px !important',
		color: 'white'
	},
	inputUnderline: {
		borderBottom: '1px solid white',
	},
	inputIcon: {
		marginRight: 0,
		color: 'white'
	},
	uploadMessageContainer: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textWhite: {
		color: 'white'
	},
	label: {
		color: 'white',
		width: '100%',
		textAlign: 'right'
	},
	imagesImage: {
		width: 'calc(25% - 10px)',
		height: '150px',
		margin: '5px'
	},
	loginLink: {
		textDecoration: 'none',
		color: 'white',
		marginBottom: '50px'
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
	},
	"@global": {
		'.mapboxgl-canvas': {
			position: 'relative !important'
		}
	}
});

const mapStateToProps = ({ authRegister }) => {
	const { form } = authRegister;

	return { form };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps, {
		authRegisterChangeForm
	})
)(Register);
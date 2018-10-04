import BackgorundImage from '../../../assets/images/auth/bg.jpg';

export default theme => ({
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
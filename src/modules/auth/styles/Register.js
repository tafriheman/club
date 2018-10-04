import BackgorundImage from '../../../assets/images/auth/bg.jpg';

export default  theme => ({
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
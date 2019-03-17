import {colors} from '@material-ui/core'

export default theme => ({
  appBar: {
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
      marginRight: 240,
      width: `calc(100% - 240px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  clubName: {
    marginRight: '10px'
  },
  logoutButton: {
    color: 'white',
    marginRight: 'auto'
  },
  clubButton: {
    marginRight: 'auto',
    backgroundColor: colors.indigo.A100,
    color: 'white'
  },
  registerButton: {
    backgroundColor: '#fafafa',
    color:'#000',
    paddingRight:20,
    cursor:'pointer'
    
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})
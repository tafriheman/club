import { deepOrange } from '@material-ui/core/colors'

export default theme => ({
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 10
  },

  bigAvatar: {
    margin: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 80,
    height: 80,
    backgroundColor: deepOrange[500],
    color: '#fff',
  },

  listItem: {
    textAlign: 'right'
  },

  link: {
    textDecoration: 'none',
    color: '#000',
  },

  textFit: {
    textAlign: 'center',
    color: '#8ca3a3'
  },

  PowerSettingsNew: {
    alignSelf: 'center',
    fontSize: "medium",
    color: "#4040a1",
    marginBottom: '-5px'
  },

  a: {
    textAlign: 'center',
    marginRight: 0,
    color: '#4040a1',
    justifyContent: 'center'
  }


})
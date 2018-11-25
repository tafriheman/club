export default theme =>({
  header: {
    width: '100%',
    marignBottom: '20px'
  },
  selectIcon: {
    left: 0,
    right: 'auto'
  },
  uploadMessageContainer: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
  },
  tagsInputWrapper: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    color: 'black',
    lineHeight: '19px',
    marginTop: '5px',
    paddingTop: '7.5px',
    paddingBottom: '7.5px',
    '&:hover': {
      border: '1px solid black',
    },
    '& > span > input': {
      width: '100%',
      margin: 0,
      '&:focus': {
        '&:parent:parent': {
          border: '1px solid red'
        }
      }
   }
  },
  image: {
    width: 'calc(25% - 20px)',
    height: '150px',
    margin: '5px',
    [theme.breakpoints.only('xs')]: {
      width: 'calc(50% - 10px)'
    }
  }
});
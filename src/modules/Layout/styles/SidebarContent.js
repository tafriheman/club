export default theme => ({
  link: {
    textDecoration: 'none',
    color: '#000',
    marginTop: '10px'
  },
  expantionDetail: {
    dispaly: 'flex',
    flexDirection: 'column'
  },
  expantionPanelSummaryRoot: {
    paddingRight: '10px',
  },
  expandIcon: {
    right: 'auto',
    left: '8px',
    paddingLeft: 0
  },
  '@global': {
    "[class*='MuiExpansionPanel-expanded-']": {
      marginBottom: 0,
      marginTop: 0
    }
  }
});
export default theme =>({
  header: {
    width: '100%',
    marignBottom: '20px'
  },
  phoneLabel: {
    marginTop: '10px',
    '&::after': {
      content: "'*'",
      color: 'red'
    }
  }
});
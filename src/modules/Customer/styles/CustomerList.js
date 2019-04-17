export default theme =>({
  header: {
    marignBottom: '20px',
    width: '100%'
  },
  paperContainer: {
    width: '100%'
  },
  paperRoot: {
    marginTop: '30px',
    marginBottom: '20px'
  },
  badge: {
   
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
});
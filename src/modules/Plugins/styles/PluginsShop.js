export default theme => ({
  '@global': {
    'a': {
      outline: 'none'
    },
    '.pagination': {
      display: 'flex',
      flexDirection: 'row',
      listStyle: 'none',
      alignItems: 'baseline'
    },
    '.page-link': {
      cursor: 'pointer',
      position: 'relative',
      display: 'block',
      padding: '.5rem .75rem',
      marginLeft: '-1px',
      lineHeight: '1.25',
      color: '#000',
      backgroundColor: '#fff',
      border: '1px solid #dee2e6',
    },
    '.page-item.active .page-link': {
      color: '#fff',
      background: '#3f51b5'
    }
  }
});
export default theme => ({
  header: {
    width: "100%",
    marignBottom: "20px"
  },
  phoneLabel: {
    marginTop: "10px",
    "&::after": {
      content: "'*'",
      color: "red"
    }
  },
  card: {
    width: "50%",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.only("sm")]: {
      width: "70%"
    }
  }
});

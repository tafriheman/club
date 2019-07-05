export default theme => ({
  header: {
    width: "100%",
    marignBottom: "20px"
  },
  datePicker: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    color: "black",
    lineHeight: "19px",
    marginTop: "5px",
    paddingTop: "7.5px",
    paddingBottom: "7.5px",
    textAlign: "center !important",
    "&:hover": {
      border: "1px solid black"
    },
    "& > span > input": {
      width: "25%",
      margin: 0,
      "&:focus": {
        "&:parent:parent": {
          border: "1px solid red"
        }
      }
    }
  }
});

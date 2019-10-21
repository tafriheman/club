export default theme => ({
  flexDiv: {
    display: 'flex',
  },

  fcatdiv: {
    paddingLeft: '2.6vw',
    paddingTop: '42px'
  },

  catSelect: {
    width: '47vw',
    height: '94px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    border: 'solid 1px #e3e3e3',
    fontSize: '22px',
    color: '#283264',
    '&::-webkit-input-placeholder': {
      fontFamily: 'Roboto',
      fontSize: '22px',
      textAlign: 'left',
      align: 'left',
      lineHeight: 1.14,
      fontWeight: 300,
      fontStyle: 'normal',
      fontStretch: 'normal',
      color: '#283264',
      paddingLeft: '16px'

    }
  },

  brandInput: {
    outline: 'none',
    width: '22.1vw',
    height: '94px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    border: 'solid 1px #e3e3e3',
    paddingLeft: '16px',
    fontFamily: 'Roboto',
    fontSize: '22px',
    textAlign: 'left',
    align: 'left',
    lineHeight: 1.17,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    color: '#283264',
    '&::-webkit-input-placeholder': {
      fontFamily: 'Roboto',
      width: '86px',
      fontSize: '22px',
      textAlign: 'left',
      align: 'left',
      lineHeight: 1.14,
      fontWeight: 300,
      fontStyle: 'normal',
      fontStretch: 'normal',
      color: '#283264',
    }
  },

  buttondiv: {
    paddingTop: '28px',
    paddingLeft: '26.7vw',
    // paddingBottom:'200px'
  },


  nextButton: {
    width: '23vw',
    height: '4.733vh',
    borderRadius: '100px',
    backgroundColor: '#990000',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#990000',
    },
  },

  card: {
    width: '9vw',
    backgroundColor: '#2eb82e',
    minHeight: 180
  },

  next: {
    width: '8vw',
    fontFamily: 'Roboto',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    color: '#f8f8f8',
  },

  dashDiv: {
    display: "flex",
    paddingTop: '136.5px',
    paddingLeft: '52px'
  },

  
  title: {
    width: '14vw',
    fontFamily: 'Roboto',
    fontSize: '24px',
    textAlign: 'right',
    lineHeight: 1.17,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    color: '#283264'
  },

  title2: {
    width: '9vw',
    fontFamily: 'Roboto',
    fontSize: '18px',
    textAlign: 'right',
    lineHeight: 1.17,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    color: '#283264',
    paddingTop: '20px'
  },

  title3: {
    width: '9vw',
    fontFamily: 'Roboto',
    fontSize: '18px',
    textAlign: 'right',
    lineHeight: 1.17,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    color: '#fcfcfc',
    paddingTop: '20px'
  },

  err: {
    width: '15vw',
    fontFamily: 'Roboto',
    fontSize: '18px',
    textAlign: 'right',
    lineHeight: 1.17,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    color: '#ff0000',
    paddingTop: '8px'
  },

  orderCat: {
    fontFamily: 'Roboto',
    fontSize: '22px',
    textAlign: 'left',
    align: 'left',
    lineHeight: 1.14,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    color: '#283264',
    paddingTop: '10px',
    paddingLeft: '16px'
  },

  orderCatt: {
    fontFamily: 'Roboto',
    fontSize: '22px',
    textAlign: 'left',
    align: 'left',
    lineHeight: 1.14,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    color: '#283264',
    paddingTop: '16px',
  },

  formcontrol: {
    width: '15.1vw',
    height: '64px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#283264',
    borderRadius: '10px',
    border: 'solid 1px #e3e3e3',
    fontSize: '22px',
  },

  coloredOrederCat: {
    width: '15.1vw',
    height: '94px',
    backgroundColor: 'rgb(40,50,100,0.1)',
    borderRadius: '10px',
    border: 'solid 1px #e3e3e3',
    fontSize: '22px',
    color: '#283264',
  },

  orderForm: {
    width: '23vw',
    height: '94px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#283264',
    borderRadius: '10px',
    border: 'solid 1px #e3e3e3',
    fontSize: '22px',
  },

  backdiv: {
    paddingTop: '28px',
    paddingLeft: '21.5vw',
    paddingBottom: '50px'
  },

  backButton: {
    width: '90px',
    height: '4.733vh',
    borderRadius: '100px',
    backgroundColor: 'transparent',
    textTransform: 'none',
  },

  back: {
    width: '60px',
    fontFamily: 'Roboto',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    color: '#283264',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },

  dialog: {
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    WebkitBackfaceVisibility: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    blurRadius: '50px'
  },

  dialogdiv: {
    width: '32vw',
    height: '382px',
    borderRadius: '10px',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#ffffff'
  },

  dialogButton: {
    padding: 0,
    marginLeft: '2.42vw',
    marginTop: '60px',
    width: '23vw',
    height: '94px',
    backgroundColor: 'rgb(40,50,100,0.1)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#283264',
      '& $export': {
        color: '#fcfcfc'
      }
    }
  },

  dialogButtonn: {
    padding: 0,
    marginLeft: '2.42vw',
    marginTop: '30px',
    width: '23vw',
    height: '94px',
    backgroundColor: 'rgb(40,50,100,0.1)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#283264',
      '& $export': {
        color: '#fcfcfc'
      }
    }
  },

  export: {
    width: '14vw',
    fontFamily: 'Roboto',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.14,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    color: '#283264',
    // '&:hover': {
    //   color: '#fcfcfc'
    // }
  },

  enough: {
    width: '191px',
    height: '28px',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.17,
    letterSpacing: '3.96px',
    textAlign: 'center',
    color: '#00d278',
  },

  notenough: {
    width: '196px',
    height: '28px',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.17,
    letterSpacing: '3.96px',
    textAlign: 'center',
    color: '#fa506e',
  },

  increase: {
    width: '150px',
    height: '25px',
    fontFamily: 'Roboto',
    fontSize: '22px',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#f8f8f8',
    paddingTop: '5px'
  },

  price: {
    width: '151px',
    height: '66px',
    fontFamily: 'Roboto',
    fontSize: '56px',
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.18,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#283264',
  },

  pricee: {
    width: '151px',
    height: '66px',
    fontFamily: 'Roboto',
    fontSize: '56px',
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.18,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#fa506e',
  },

  dashboard: {
    fontFamily: 'Roboto',
    fontSize: '1.145vw',
    textAlign: 'center',
    lineHeight: 1.14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    color: '#f8f8f8',
    textDecoration: 'none',
  },


})
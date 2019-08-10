import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Button,
  Link
} from "@material-ui/core";
import coffee from "../../assets/images/coffeeshop.jpg"
import { rotate } from "gl-matrix/src/gl-matrix/mat2";
export default class CoffeeShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [
        { title: 'شنبه', description: "توضیحات شنبه", backgroundColor: "#80add7", color: "#a97c67", backgroundColorDetail: 'wheat' }
        , { title: 'یکشنبه', description: "توضیحات یکشنبه", backgroundColor: "#0abda0", color: "#CBCDCB", backgroundColorDetail: '#607D86' }
        , { title: 'دوشنبه', description: " ,n kjljklj lkj lkj»نت منت منت منت منت منت منت منتمنت منت منت منمنت توضیحات دوشنبه", backgroundColor: "#ebf2ea", color: "white", backgroundColorDetail: '#444444' }
        , { title: 'سه شنبه', description: "توضیحات شنبه", backgroundColor: "#d4dca9", color: "#a97c67", backgroundColorDetail: '#7d7573' }
        , { title: 'چهار شنبه', description: "توضیحات چهار شنبه", backgroundColor: "#f1931b", color: "#6c614b", backgroundColorDetail: 'wheat' }
        , { title: 'پنج شنبه', description: "توضیحات  پنج شنبه", backgroundColor: "#a882c1", color: "#a97c67", backgroundColorDetail: '#58809a' }
        , { title: 'جمعه', description: "توضیحات  جمعه شنبه", backgroundColor: "#824ca7", color: "#a97c67", backgroundColorDetail: '#CBCDCB' }

      ]
    };
  }
  render() {
    return (
      <Grid container >
        <Grid
          item
          xs={12}
          lg={12}
          xl={12}
          md={12}
          sm={12}
          spacing={16}
          marginTop={20}
        >
          <Grid item>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop={false}
              swipeable={true}

              stopOnHover={true}
            >
              <div>
                <img
                  style={{ height: 300 }}
                  src="https://www.costa.co.uk/content/dam/costa/homepage-spring_19-three_bean_cappuccino-1600x464-v3.jpg"
                />
              </div>
              <div>
                <img
                  style={{ height: 300 }}
                  src="https://picsum.photos/id/501/1000/400"
                />
              </div>
              <div>
                <img
                  style={{ height: 300 }}
                  src="https://picsum.photos/id/500/1000/400"
                />
              </div>
            </Carousel>
          </Grid>
        </Grid>
        <Grid container
          justify="center"
          xs={12} sm={12} md={12} style={{ marginTop: 40 }}
        >
          <Grid item container xs={12} sm={12} md={4} style={{ padding: 0, marginTop: 0 }}>
            <img src={coffee} style={{ margin: '0px', width: '100%', height: '100%' }}></img>
          </Grid>
          <Grid item container xs={12} sm={12} md={4}  >
            <div style={{ width: '100%', backgroundColor: '#4a87c6', color: 'white', padding: 15 }}>
              <h3 style={{ textAlign: 'right' }}> یک مزه فوق العاده و به یاد ماندنی</h3>
              <p>مهم نیست هوا چطوریه، مهم اینه که همیشه میتونید اینجا در یک محیط پر از عشق و دوستانه باشید</p>
            </div>
          </Grid>
        </Grid>

        <Grid container
          justify="center"
          alignContent="center"
          alignItems="center"
          xs={12} sm={12} md={12} style={{ marginTop: 40, marginRight: 60, marginLeft: 60, overflowY: 'scroll' }}
        >
          <Grid alignContent="center" item xs={2} sm={2} md={2} style={{
            transform: 'skewX(-20deg)', padding: 50, height: 200, backgroundColor: '#80add7'
          }}>
            شنبه
        </Grid>
          <Grid alignContent="center" item xs={2} sm={2} md={2} style={{ transform: 'skewX(-20deg)', padding: 50, height: 200, backgroundColor: '#ebf2ea ' }}>
            یک شنبه
        </Grid>
          <Grid alignContent="center" item xs={2} sm={2} md={2} style={{ transform: 'skewX(-20deg)', padding: 50, height: 200, backgroundColor: '#d4dca9' }}>
            دو شنبه
        </Grid>
          <Grid alignContent="center" item xs={2} sm={2} md={2} style={{ transform: 'skewX(-20deg)', padding: 50, height: 200, backgroundColor: '#a882c1' }}>
            سه شنبه
        </Grid>
          <Grid alignContent="center" item xs={2} sm={2} md={2} style={{ transform: 'skewX(-20deg)', padding: 50, height: 200, backgroundColor: '#a882c1' }}>
            سه شنبه
        </Grid>
        </Grid>


        <Grid item container xs={12} sm={12} md={4} style={{ padding: 0, height: 300, overflow: 'scroll' }}>
          <div style={{ width: '100%' }}>

            {
              this.state.days.map((item, i) => {
                return (
                  <ExpansionPanel square style={{ margin: 0 }}>
                    <ExpansionPanelSummary
                      style={{ backgroundColor: item.backgroundColor }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id={"panel-" + i}
                    >
                      <Typography> {item.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ padding: 15 }}>
                      <Typography >
                        {item.description}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })
            }

          </div>
        </Grid>
        <Grid item container xs={12} sm={12} md={8} style={{ padding: 0, marginTop: 40 }} justify="center">
          <Grid item container xs={12} sm={12} md={5} style={{ padding: 0, marginTop: 0, backgroundImage: coffee }} justify="center">
            <img src={coffee} style={{ margin: '0px', width: '100%', height: '100%' }}></img>
          </Grid>
          <Grid item container xs={12} sm={12} md={5} justify="center">
            <div style={{ width: '100%', backgroundColor: '#4a87c6', color: 'white', padding: 15 }}>
              <h3 style={{ textAlign: 'right' }}> باشگاه مشتریان + عکس گیفت کارت</h3>
              <p>مهم نیست هوا چطوریه، مهم اینه که همیشه میتونید اینجا در یک محیط پر از عشق و دوستانه باشید</p>
            </div>
          </Grid>
        </Grid>




        <Grid container alignContent="center" item xs={12} sm={12} md={12}
          style={{ backgroundColor: '#a882e1', marginTop: 30 }} justify='center' alignContent='center'
        >

          <Grid alignContent="center" item xs={12} sm={12} md={4}>فوتر 1</Grid>
          <Grid alignContent="center" item xs={12} sm={12} md={4}>2</Grid>
          <Grid alignContent="center" item xs={12} sm={12} md={4}>فوتر 3</Grid>


        </Grid>
      </Grid >
    );
  }
}

// const theme = createMuiTheme({
//   direction: "rtl" // Both here and <body dir="rtl">
// });

// const ExpansionPanel = withStyles({
//   root: {
//     border: "1px solid rgba(0, 0, 0, .125)",
//     boxShadow: "none",
//     "&:not(:last-child)": {
//       borderBottom: 0
//     },
//     "&:before": {
//       display: "none"
//     },
//     "&$expanded": {
//       margin: "auto"
//     }
//   },
//   expanded: {}
// })(MuiExpansionPanel);

// const ExpansionPanelSummary = withStyles({
//   root: {
//     backgroundColor: "rgba(0, 0, 0, .03)",
//     borderBottom: "1px solid rgba(0, 0, 0, .125)",
//     marginBottom: -1,
//     minHeight: 56,
//     "&$expanded": {
//       minHeight: 56
//     }
//   },
//   content: {
//     "&$expanded": {
//       margin: "12px 0"
//     }
//   },
//   expanded: {}
// })(MuiExpansionPanelSummary);

// export default function CustomizedExpansionPanels() {
//   const [expanded, setExpanded] = React.useState("panel1");

//   const handleChange = panel => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div dir="rtl">
//         <div style={{ margin: "auto", width: 200 }}>
//           <ExpansionPanel
//             square
//             expanded={expanded === "panel1"}
//             onChange={handleChange("panel1")}
//             style={{ backgroundColor: "#844e36", color: "#a97c67" }}
//           >
//             <ExpansionPanelSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1d-content"
//               id="panel1d-header"
//             >
//               <Typography>شنبه</Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails
//               style={{ color: "#844e36", backgroundColor: "wheat" }}
//             >
//               <Typography>اطلاعات مربوط به شنبه</Typography>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//           <ExpansionPanel
//             square
//             expanded={expanded === "panel2"}
//             onChange={handleChange("panel2")}
//             style={{ backgroundColor: "#484854", color: "#787884" }}
//           >
//             <ExpansionPanelSummary
//               aria-controls="panel2d-content"
//               id="panel2d-header"
//               expandIcon={<ExpandMoreIcon />}
//             >
//               <Typography>یکشنبه</Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails style={{ backgroundColor: "#fff" }}>
//               <Typography>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget.
//               </Typography>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//           <ExpansionPanel
//             square
//             expanded={expanded === "panel3"}
//             onChange={handleChange("panel3")}
//             style={{ backgroundColor: "#aaa09f", color: "#7d7573" }}
//           >
//             <ExpansionPanelSummary
//               aria-controls="panel3d-content"
//               id="panel3d-header"
//               expandIcon={<ExpandMoreIcon />}
//             >
//               <Typography>دوشنبه</Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails>
//               <Typography>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget.
//               </Typography>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//           <ExpansionPanel
//             square
//             expanded={expanded === "panel4"}
//             onChange={handleChange("panel4")}
//             style={{ backgroundColor: "#8d8368", color: "#6c614b" }}
//           >
//             <ExpansionPanelSummary
//               aria-controls="panel4d-content"
//               id="panel4d-header"
//               expandIcon={<ExpandMoreIcon />}
//             >
//               <Typography>سه شنبه</Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails>
//               <Typography>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//                 eget.
//               </Typography>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//           <ExpansionPanel
//             square
//             expanded={expanded === "panel5"}
//             onChange={handleChange("panel5")}
//             style={{ backgroundColor: "#86b3d2", color: "#58809a" }}
//           >
//             <ExpansionPanelSummary
//               aria-controls="panel5d-content"
//               id="panel5d-header"
//               expandIcon={<ExpandMoreIcon />}
//             >
//               <Typography>چهارشنبه</Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails>
//               <Typography />
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// }

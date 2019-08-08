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
import coffee from "../../assets/images/coffeeshop.jpeg"
export default class CoffeeShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        days:[
            {title:'شنبه',description:"توضیحات شنبه",backgroundColor:"#844e36",color:"#a97c67",backgroundColorDetail:'wheat'}
            ,{title:'یکشنبه',description:"توضیحات یکشنبه",backgroundColor:"#C44B4F",color:"#CBCDCB",backgroundColorDetail:'#607D86'}
            ,{title:'دوشنبه',description:"توضیحات دوشنبه",backgroundColor:"#B1B1B1",color:"white",backgroundColorDetail:'#444444'}
            ,{title:'سه شنبه',description:"توضیحات شنبه",backgroundColor:"#aaa09f",color:"#a97c67",backgroundColorDetail:'#7d7573'}
            ,{title:'چهار شنبه',description:"توضیحات چهار شنبه",backgroundColor:"#8d8368",color:"#6c614b",backgroundColorDetail:'wheat'}
            ,{title:'پنج شنبه',description:"توضیحات  پنج شنبه",backgroundColor:"#86b3d2",color:"#a97c67",backgroundColorDetail:'#58809a'}
            ,{title:'جمعه',description:"توضیحات  جمعه شنبه",backgroundColor:"wheat",color:"#a97c67",backgroundColorDetail:'#CBCDCB'}
        ],
        expanded:""
    };
 };
  handleChange = (panel)=>{
   this.setState({expanded:panel})
 }
  render() {
    const expanded = this.state.expanded;
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
                  showThumbs={true}
                  showStatus={false}
                  infiniteLoop={true}
                >
                  <div>
                    <img
                      style={{ maxHeight: 400 }}
                      src="https://picsum.photos/id/504/1000/400"
                    />
                  </div>
                  <div>
                    <img
                      style={{ maxHeight: 400 }}
                      src="https://picsum.photos/id/501/1000/400"
                    />
                  </div>
                  <div>
                    <img
                      style={{ maxHeight: 400 }}
                      src="https://picsum.photos/id/500/1000/400"
                    />
                  </div>
                </Carousel>
              </Grid>
              </Grid>




        <Grid item container xs={12} sm={12} md={4} style={{padding:20}}>
          <div style={{width:'100%'}}>

              {
                  this.state.days.map((item,i)=>{
                      return(
                        <ExpansionPanel expanded={expanded === 'panel'+i}  onChange={()=>this.handleChange('panel'+i)} square style={{ margin: 0  }}>
                        <ExpansionPanelSummary
                        style={{backgroundColor:item.backgroundColor}}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id={"panel-"+i}
                        >
                          <Typography> {item.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{backgroundColor:item.backgroundColorDetail,color:item.color}}>
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
        <Grid item container xs={12} sm={12} md={4} style={{padding:15}}>
            <img src={coffee} style={{height:"220px",margin:'auto',boxShadow:"10px 10px 5px 0px rgba(0,0,0,0.75)"}}></img>
        </Grid>
        <Grid item container xs={12} sm={12} md={4}>
            <div style={{width:'100%'}}>
                <h3 style={{textAlign:'center'}}> محصول کافی شاپ</h3>
            <p>توضیحات مربوط به محصول</p>    
            </div>
        </Grid>
      </Grid>
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

import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { Grid } from "@material-ui/core";
import coffee from "../../assets/images/coffeeshop.jpeg";
export default class CoffeeShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [
        {
          title: "شنبه",
          description: "توضیحات شنبه",
          backgroundColor: "red",
          color: "#a97c67",
          backgroundColorDetail: "white"
        },
        {
          title: "یکشنبه",
          description: "توضیحات یکشنبه",
          backgroundColor: "yellow",
          color: "#CBCDCB",
          backgroundColorDetail: "white"
        },
        {
          title: "دوشنبه",
          description: "توضیحات دوشنبه",
          backgroundColor: "pink",
          color: "white",
          backgroundColorDetail: "white"
        },
        {
          title: "سه شنبه",
          description: "توضیحات شنبه",
          backgroundColor: "green",
          color: "#a97c67",
          backgroundColorDetail: "white"
        },
        {
          title: "چهار شنبه",
          description: "توضیحات چهار شنبه",
          backgroundColor: "orange",
          color: "#6c614b",
          backgroundColorDetail: "white"
        },
        {
          title: "پنج شنبه",
          description: "توضیحات  پنج شنبه",
          backgroundColor: "lightblue",
          color: "#a97c67",
          backgroundColorDetail: "white"
        },
        {
          title: "جمعه",
          description: "توضیحات  جمعه شنبه",
          backgroundColor: "purple",
          color: "#a97c67",
          backgroundColorDetail: "white"
        }
      ],
      expanded: ""
    };
  }
  handleChange = panel => {
    if (this.state.expanded == panel) this.setState({ expanded: "" });
    else if (this.state.expanded == "") this.setState({ expanded: panel });
  };
  render() {
    const expanded = this.state.expanded;
    return (
      <Grid container>
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
            <Carousel showThumbs={true} showStatus={false} infiniteLoop={true}>
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

        <Grid item container xs={12} sm={12} md={4} style={{ padding: 20 }}>
          <div style={{ width: "100%" }}>
            {this.state.days.map((item, i) => {
              return (
                <ExpansionPanel
                  expanded={expanded === "panel" + i}
                  onChange={() => this.handleChange("panel" + i)}
                  square
                  style={{ margin: 0 }}
                >
                  <ExpansionPanelSummary
                    style={{
                      backgroundColor: item.backgroundColor,
                      height: 20,
                      minHeight: expanded === "panel" + i ? 45 : 25,
                      opacity:
                        expanded === "panel" + i || expanded == "" ? 1 : 0.55
                    }}
                    aria-controls="panel-content"
                    id={"panel-" + i}
                  >
                    {expanded === "panel" + i ? <ExpandLess /> : null}

                    <Typography>
                      {expanded === "panel" + i || expanded === ""
                        ? item.title
                        : ""}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    style={{
                      backgroundColor: item.backgroundColorDetail,
                      color: item.color
                    }}
                  >
                    <Typography>{item.description}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </div>
        </Grid>
        <Grid item container xs={12} sm={12} md={4} style={{ padding: 15 }}>
          <img
            src={coffee}
            style={{
              height: "220px",
              margin: "auto",
              boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)"
            }}
          />
        </Grid>
        <Grid item container xs={12} sm={12} md={4} style={{ padding: 15 }}>
          <div style={{ width: "100%" }}>
            <h3 style={{ textAlign: "center" }}> محصول کافی شاپ</h3>
            <p>توضیحات مربوط به محصول</p>
          </div>
        </Grid>
      </Grid>
    );
  }
}

import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  withStyles,
  CardActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  ListItem,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import compose from "recompose/compose";
import styles from "./EventAdd.js";
import { connect } from "react-redux";
import {
  productProductAddChangeProp,
  prodcutProductAddFetchCategories,
  productProductAddSubmitForm
} from "../../redux/actions";
import TagsInput from "react-tagsinput";
import DropZone from "react-dropzone";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./Event.css";
import "react-tagsinput/react-tagsinput.css";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import SettingIcon from "@material-ui/icons/SettingsApplications";
import DeleteIcon from "@material-ui/icons/Delete";

class EventAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDay: "",
      startMonth: "",
      startYear: "",
      endDay: "",
      endMonth: "",
      endYear: "",
      startTimeHour: 12,
      startTimeMin: 0,
      endTimeHour: 12,
      endTimeMin: 0,
      percent: "",
      disabledAdd: false,
      images: [],
      value: 0,
      creditHadie: 0,

      capacity: 0,
      score: 0,
      credit: 0,
      sans: [],
      type: "",
      ticketList: [
        { title: "", amount: 1, price: 1, score: 0, credit: 0 },
        { title: "", amount: 1, price: 0, score: 0, credit: 0 }
      ],
      popUpSetting: true,
      itemSetting: 0
    };
    this.changePercent = this.changePercent.bind(this);
    this.days = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31
    ];
  }

  componentWillMount() {
    // const { club, token, prodcutProductAddFetchCategories } = this.props;
    // prodcutProductAddFetchCategories(club._id, token);
  }
  add = async item => {
    await this.setState({
      [item]: this.state[item] + 1
    });
  };

  subtract = async item => {
    await this.setState({
      [item]: this.state[item] - 1
    });
  };
  onImagesDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles) {
      this.props.productProductAddChangeProp("images", []);
      let images = this.state.images;
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const image = reader.result;
          images.push(image);
          this.setState({
            images
          });
          this.props.productProductAddChangeProp("images", [
            ...this.props.images,
            image
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  renderImages() {
    const { classes } = this.props;
    return this.state.images.map((image, i) => {
      if (image.includes("data:video")) {
        return (
          <Grid item xs={6} sm={4} md={3} style={{ height: 150, padding: 5 }}>
            <div
              style={{
                borderRadius: 5,
                width: "100%",
                height: "100%",
                boxShadow: "0px 0px 7px 2px rgba(0,0,0,0.75)",
                textAlign: "center",
                lineHeight: "150px"
              }}
            >
              فیلم اضافه شد
            </div>
          </Grid>
        );
      }
      return (
        <Grid item xs={6} sm={4} md={3} style={{ height: 150, padding: 5 }}>
          <img
            src={image}
            key={i}
            alt=""
            style={{
              borderRadius: 5,
              width: "100%",
              height: "100%",
              boxShadow: "0px 0px 7px 2px rgba(0,0,0,0.75)"
            }}
          />
        </Grid>
      );
    });
  }

  renderSanses() {
    return this.state.sans.map((item, i) => {
      return (
        <React.Fragment>
          <Grid container xs={12} style={{ marginTop: 10 }}>
            <Typography
              variant="h6"
              style={{
                fontSize: 14,
                paddingTop: 20,
                paddingLeft: 20,
                color: "green"
              }}
            >
              ساعت شروع
            </Typography>
            <Grid
              container
              xs={12}
              style={{
                position: "relative",
                maxWidth: 105,
                marginTop: 5
              }}
            >
              <Grid>
                <IconButton
                  onClick={() => {
                    if (item.startTimeMin < 59) {
                      const { sans } = this.state;
                      sans[i].startTimeMin = item.startTimeMin + 1;
                      this.setState({
                        sans
                      });
                    }
                  }}
                  style={{ padding: 0, display: "block" }}
                >
                  <ArrowDropUpIcon
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
                <IconButton style={{ padding: 0, display: "block" }}>
                  <ArrowDropDownIcon
                    onClick={() => {
                      if (item.startTimeMin > 0) {
                        const { sans } = this.state;
                        sans[i].startTimeMin = item.startTimeMin - 1;
                        this.setState({
                          sans
                        });
                      }
                    }}
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid style={{ margin: "auto", direction: "ltr" }}>
                {item.startTimeHour} : {item.startTimeMin}
              </Grid>
              <Grid>
                <IconButton style={{ padding: 0, display: "block" }}>
                  <ArrowDropUpIcon
                    onClick={() => {
                      const { sans } = this.state;
                      sans[i].startTimeHour = item.startTimeHour + 1;
                      this.setState({
                        sans
                      });
                    }}
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
                <IconButton style={{ padding: 0, display: "block" }}>
                  <ArrowDropDownIcon
                    onClick={() => {
                      if (item.startTimeHour > 0) {
                        const { sans } = this.state;
                        sans[i].startTimeHour = item.startTimeHour - 1;
                        this.setState({
                          sans
                        });
                      }
                    }}
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            style={{
              marginTop: 10,
              borderBottom: "1px solid #eaeaea",
              paddingBottom: 10
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontSize: 14,
                paddingTop: 20,
                paddingLeft: 20,
                color: "green"
              }}
            >
              ساعت پایان
            </Typography>
            <Grid
              container
              xs={12}
              style={{
                position: "relative",
                maxWidth: 105,
                marginTop: 5
              }}
            >
              <Grid>
                <IconButton
                  onClick={() => {
                    if (item.endTimeMin < 59) {
                      const { sans } = this.state;
                      sans[i].endTimeMin = item.endTimeMin + 1;
                      this.setState({
                        sans
                      });
                    }
                  }}
                  style={{ padding: 0, display: "block" }}
                >
                  <ArrowDropUpIcon
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
                <IconButton style={{ padding: 0, display: "block" }}>
                  <ArrowDropDownIcon
                    onClick={() => {
                      if (item.endTimeMin > 0) {
                        const { sans } = this.state;
                        sans[i].endTimeMin = item.endTimeMin - 1;
                        this.setState({
                          sans
                        });
                      }
                    }}
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid style={{ margin: "auto", direction: "ltr" }}>
                {item.endTimeHour} : {item.endTimeMin}
              </Grid>
              <Grid>
                <IconButton style={{ padding: 0, display: "block" }}>
                  <ArrowDropUpIcon
                    onClick={() => {
                      if (item.endTimeHour < 59) {
                        const { sans } = this.state;
                        sans[i].endTimeHour = item.endTimeHour + 1;
                        this.setState({
                          sans
                        });
                      }
                    }}
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
                <IconButton style={{ padding: 0, display: "block" }}>
                  <ArrowDropDownIcon
                    onClick={() => {
                      if (item.endTimeHour > 0) {
                        const { sans } = this.state;
                        sans[i].endTimeHour = item.endTimeHour - 1;
                        this.setState({
                          sans
                        });
                      }
                    }}
                    style={{
                      fontSize: 25,
                      color: "black"
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    });
  }

  findParent(categories, category) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i]._id.toString() === category.parent) {
        return i;
      }
    }
    return -1;
  }

  sortCategories() {
    const { categories } = this.props;
    let newCategories = [];

    let needRunAgain = true;
    while (needRunAgain) {
      needRunAgain = false;

      for (let i = 0; i < categories.length; i++) {
        let category = newCategories.find(cat => cat._id === categories[i]._id);
        if (category !== undefined) continue;

        if (!categories[i].parent) {
          categories[i].indent = 1;
          newCategories.push(categories[i]);
        } else {
          let parentIndex = this.findParent(newCategories, categories[i]);
          if (parentIndex === -1) {
            needRunAgain = true;
            continue;
          }
          categories[i].indent = newCategories[parentIndex].indent + 1;
          newCategories.splice(parentIndex, 0, categories[i]);
        }
      }
    }

    return newCategories.reverse();
  }

  submitForm() {
    const {
      productProductAddSubmitForm,
      club,
      token,
      links,
      type,
      name,
      category,
      history,
      point,
      price,
      description,
      credit
    } = this.props;
    const { images } = this.state;
    this.setState({
      disabledAdd: true
    });

    productProductAddSubmitForm(
      club._id,
      token,
      {
        name,
        type,
        description,
        point,
        price,
        links,
        images,
        category
      },
      history
    );
  }

  changePercent(percent, price) {
    if (percent === undefined) percent = this.state.percent;
    else this.setState({ percent });

    if (!price) price = this.props.price;

    if (!isNaN(percent) && price) {
      if (price === 0) {
        this.props.productProductAddChangeProp("point", percent);
      } else {
        let point = (percent * price) / 100000;
        this.props.productProductAddChangeProp("point", point);
      }
    } else {
      this.props.productProductAddChangeProp("point", "");
    }
  }

  render() {
    const {
      classes,
      type,
      productProductAddChangeProp,
      links,
      name,
      point,
      price,
      description,
      category,
      error,
      credit,
      history
    } = this.props;

    let categories = this.sortCategories();
    const { value } = this.state;
    const settingItem = this.state.ticketList[this.state.itemSetting];
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>
          افزودن رویداد
        </Typography>
        <Grid item container style={{ marginTop: "20px" }} direction="column">
          <Card style={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={(event, newVal) => {
                this.setState({ value: newVal });
              }}
            >
              <Tab label="عنوان و توضیحات" />
              <Tab label="رسانه" />
              <Tab label="زمان تاریخ" />
              <Tab label="ظرفیت امتیاز" />
              <Tab label="بلیط" />
            </Tabs>
            <CardContent>
              <Grid
                item
                container
                direction="row"
                alignItems="baseline"
                spacing={32}
                justify="center"
              >
                {value === 0 && (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={10}
                    md={8}
                    direction="row"
                    spacing={16}
                    alignItems="center"
                  >
                    <Grid item container direction="row" xs={12} sm={12} md={6}>
                      <Typography variant="h6">عنوان</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        value={name}
                        onChange={e =>
                          productProductAddChangeProp("name", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      sm={12}
                      md={12}
                      direction="row"
                    >
                      <Typography variant="h6">توضیحات</Typography>
                      <TextField
                        multiline
                        rows="8"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        value={description}
                        onChange={e =>
                          productProductAddChangeProp(
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <Typography variant="caption">
                        توضیحات در صورت لزوم
                      </Typography>
                    </Grid>
                    <Button
                      style={{
                        margin: "auto",
                        width: 200,
                        marginBottom: 10,
                        marginTop: 20
                      }}
                      variant="contained"
                      color="primary"
                    >
                      بعدی
                    </Button>
                  </Grid>
                )}
                {value == 1 && (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={10}
                    md={10}
                    direction="row"
                    spacing={8}
                    alignItems="center"
                  >
                    <Grid container>
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        style={{
                          height: 150,
                          padding: 5,
                          width: 150
                        }}
                      >
                        <DropZone
                          multiple
                          onDrop={this.onImagesDrop.bind(this)}
                          accept="image/jpeg, image/png, video/*"
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            boxShadow: "0px 0px 7px 2px rgba(0,0,0,0.75)",
                            borderRadius: 5,
                            position: "relative"
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: "100%",
                              lineHeight: "150px",
                              fontSize: 40,
                              fontWeight: "bold",
                              textAlign: "center"
                            }}
                          >
                            +
                          </div>
                          <Typography
                            variant="caption"
                            style={{
                              position: "absolute",
                              bottom: 5,
                              width: "100%",
                              textAlign: "center"
                            }}
                          >
                            عکس ها را اینجا بکشید<br></br> یا کلیک کنید.
                          </Typography>
                        </DropZone>
                      </Grid>
                      {value == 1 && this.renderImages()}
                    </Grid>
                    <Button
                      style={{
                        margin: "auto",
                        width: 200,
                        marginBottom: 10,
                        marginTop: 20
                      }}
                      variant="contained"
                      color="primary"
                    >
                      بعدی
                    </Button>
                  </Grid>
                )}
                {value == 2 && (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={10}
                    md={6}
                    direction="row"
                    justify="center"
                  >
                    <Grid container xs={12}>
                      <Typography
                        variant="h6"
                        style={{
                          position: "inline-block",
                          fontSize: 14,
                          paddingTop: 20,
                          paddingLeft: 10,
                          color: "green"
                        }}
                      >
                        تاریخ شروع
                      </Typography>
                      <FormControl>
                        <Select
                          style={{
                            paddingTop: 10,
                            paddingBottom: 5
                          }}
                          value={this.state.startDay}
                          onChange={e =>
                            this.setState({ startDay: e.target.value })
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            روز
                          </MenuItem>
                          {this.days.map((item, i) => {
                            return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl style={{ marginRight: 10 }}>
                        <Select
                          style={{
                            paddingTop: 10,
                            paddingBottom: 5
                          }}
                          value={this.state.startMonth}
                          onChange={e =>
                            this.setState({ startMonth: e.target.value })
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            ماه
                          </MenuItem>
                          {this.days.map((item, i) => {
                            if (i < 12)
                              return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                            else return null;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl style={{ marginRight: 10 }}>
                        <Select
                          style={{
                            paddingTop: 10,
                            paddingBottom: 5
                          }}
                          value={this.state.startYear}
                          onChange={e =>
                            this.setState({ startYear: e.target.value })
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            سال
                          </MenuItem>
                          <MenuItem value={1398}>1398</MenuItem>
                          <MenuItem value={1399}>1399</MenuItem>
                          <MenuItem value={1400}>1400</MenuItem>
                          <MenuItem value={1401}>1401</MenuItem>
                          <MenuItem value={1402}>1402</MenuItem>
                          <MenuItem value={1403}>1403</MenuItem>
                          <MenuItem value={1404}>1404</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      xs={12}
                      style={{
                        marginTop: 10,
                        borderBottom: "1px solid #eaeaea"
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 14,
                          paddingTop: 20,
                          paddingLeft: 20,
                          color: "green"
                        }}
                      >
                        ساعت شروع
                      </Typography>
                      <Grid
                        container
                        xs={12}
                        style={{
                          position: "relative",
                          maxWidth: 105,
                          marginTop: 5
                        }}
                      >
                        <Grid>
                          <IconButton
                            onClick={() => {
                              if (this.state.startTimeMin < 59)
                                this.setState({
                                  startTimeMin: this.state.startTimeMin + 1
                                });
                            }}
                            style={{ padding: 0, display: "block" }}
                          >
                            <ArrowDropUpIcon
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                          <IconButton style={{ padding: 0, display: "block" }}>
                            <ArrowDropDownIcon
                              onClick={() => {
                                if (this.state.startTimeMin > 0)
                                  this.setState({
                                    startTimeMin: this.state.startTimeMin - 1
                                  });
                              }}
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid style={{ margin: "auto", direction: "ltr" }}>
                          {this.state.startTimeHour} : {this.state.startTimeMin}
                        </Grid>
                        <Grid>
                          <IconButton style={{ padding: 0, display: "block" }}>
                            <ArrowDropUpIcon
                              onClick={() => {
                                this.setState({
                                  startTimeHour: this.state.startTimeHour + 1
                                });
                              }}
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                          <IconButton style={{ padding: 0, display: "block" }}>
                            <ArrowDropDownIcon
                              onClick={() => {
                                if (this.state.startTimeHour > 0)
                                  this.setState({
                                    startTimeHour: this.state.startTimeHour - 1
                                  });
                              }}
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container xs={12}>
                      <Typography
                        variant="h6"
                        style={{
                          position: "inline-block",
                          fontSize: 14,
                          paddingTop: 20,
                          paddingLeft: 10,
                          color: "green"
                        }}
                      >
                        تاریخ پایان
                      </Typography>
                      <FormControl>
                        <Select
                          style={{
                            paddingTop: 10,
                            paddingBottom: 5
                          }}
                          value={this.state.endDay}
                          onChange={e =>
                            this.setState({ endDay: e.target.value })
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            روز
                          </MenuItem>
                          {this.days.map((item, i) => {
                            return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl style={{ marginRight: 10 }}>
                        <Select
                          style={{
                            paddingTop: 10,
                            paddingBottom: 5
                          }}
                          value={this.state.endMonth}
                          onChange={e =>
                            this.setState({ endMonth: e.target.value })
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            ماه
                          </MenuItem>
                          {this.days.map((item, i) => {
                            if (i < 12)
                              return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                            else return null;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl style={{ marginRight: 10 }}>
                        <Select
                          style={{
                            paddingTop: 10,
                            paddingBottom: 5
                          }}
                          value={this.state.endYear}
                          onChange={e =>
                            this.setState({ endYear: e.target.value })
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            سال
                          </MenuItem>
                          <MenuItem value={1398}>1398</MenuItem>
                          <MenuItem value={1399}>1399</MenuItem>
                          <MenuItem value={1400}>1400</MenuItem>
                          <MenuItem value={1401}>1401</MenuItem>
                          <MenuItem value={1402}>1402</MenuItem>
                          <MenuItem value={1403}>1403</MenuItem>
                          <MenuItem value={1404}>1404</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      xs={12}
                      style={{
                        marginTop: 10,
                        borderBottom: "1px solid #eaeaea",
                        paddingBottom: 10
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 14,
                          paddingTop: 20,
                          paddingLeft: 20,
                          color: "green"
                        }}
                      >
                        ساعت پایان
                      </Typography>
                      <Grid
                        container
                        xs={12}
                        style={{
                          position: "relative",
                          maxWidth: 105,
                          marginTop: 5
                        }}
                      >
                        <Grid>
                          <IconButton
                            onClick={() => {
                              if (this.state.endTimeMin < 59)
                                this.setState({
                                  endTimeMin: this.state.endTimeMin + 1
                                });
                            }}
                            style={{ padding: 0, display: "block" }}
                          >
                            <ArrowDropUpIcon
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                          <IconButton style={{ padding: 0, display: "block" }}>
                            <ArrowDropDownIcon
                              onClick={() => {
                                if (this.state.endTimeMin > 0)
                                  this.setState({
                                    endTimeMin: this.state.endTimeMin - 1
                                  });
                              }}
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid style={{ margin: "auto", direction: "ltr" }}>
                          {this.state.endTimeHour} : {this.state.endTimeMin}
                        </Grid>
                        <Grid>
                          <IconButton style={{ padding: 0, display: "block" }}>
                            <ArrowDropUpIcon
                              onClick={() => {
                                this.setState({
                                  endTimeHour: this.state.endTimeHour + 1
                                });
                              }}
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                          <IconButton style={{ padding: 0, display: "block" }}>
                            <ArrowDropDownIcon
                              onClick={() => {
                                if (this.state.endTimeHour > 0)
                                  this.setState({
                                    endTimeHour: this.state.endTimeHour - 1
                                  });
                              }}
                              style={{
                                fontSize: 25,
                                color: "black"
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    {this.renderSanses()}
                    <Grid container xs={12} style={{ marginTop: 10 }}>
                      <FormControl
                        style={{
                          margin: "auto",
                          width: 200,
                          marginBottom: 10,
                          marginTop: 10
                        }}
                      >
                        <Select
                          style={{
                            paddingTop: 10,
                            paddingBottom: 5
                          }}
                          value={this.state.type}
                          onChange={e =>
                            this.setState({ type: e.target.value })
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            تکراری
                          </MenuItem>
                          <MenuItem value={1}>روزانه</MenuItem>
                          <MenuItem value={2}>هفتگی</MenuItem>
                          <MenuItem value={3}>ماهانه</MenuItem>
                        </Select>
                      </FormControl>
                      <div
                        style={{
                          margin: "auto",
                          width: "100%",
                          display: "block"
                        }}
                      >
                        <Button
                          style={{
                            margin: "auto",
                            width: 200,
                            marginBottom: 10,
                            marginTop: 10,
                            display: "block"
                          }}
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            var sans = this.state.sans;
                            sans.push({
                              startTimeHour: 12,
                              startTimeMin: 0,
                              endTimeHour: 12,
                              endTimeMin: 0
                            });
                            this.setState({
                              sans
                            });
                          }}
                        >
                          افزودن سانس
                        </Button>
                      </div>

                      <Button
                        style={{
                          margin: "auto",
                          width: 200,
                          marginBottom: 10
                        }}
                        variant="contained"
                        color="primary"
                      >
                        بعدی
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {value === 3 && (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={10}
                    md={4}
                    direction="row"
                    justify="center"
                  >
                    <List>
                      <ListItem>
                        ظرفیت
                        <IconButton
                          style={{ padding: 0, marginRight: 10 }}
                          aria-owns={"simple-menu"}
                          onClick={() => this.add("capacity")}
                        >
                          <Button>
                            <AddCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                        {this.state.capacity}
                        <IconButton
                          style={{ padding: 0 }}
                          aria-owns={"simple-menu"}
                          disabled={this.state.capacity < 1}
                          onClick={() => this.subtract("capacity")}
                        >
                          <Button style={{ fontSize: 16 }}>
                            <RemoveCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                      </ListItem>
                      <ListItem>
                        امتیاز
                        <IconButton
                          style={{ padding: 0, marginRight: 18 }}
                          aria-owns={"simple-menu"}
                          onClick={() => this.add("score")}
                        >
                          <Button>
                            <AddCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                        {this.state.score}
                        <IconButton
                          style={{ padding: 0 }}
                          aria-owns={"simple-menu"}
                          disabled={this.state.score < 1}
                          onClick={() => this.subtract("score")}
                        >
                          <Button style={{ fontSize: 16 }}>
                            <RemoveCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                      </ListItem>
                      <ListItem>
                        اعتبار
                        <IconButton
                          style={{ padding: 0, marginRight: 18 }}
                          aria-owns={"simple-menu"}
                          onClick={() => this.add("credit")}
                        >
                          <Button>
                            <AddCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                        {this.state.credit}
                        <IconButton
                          style={{ padding: 0 }}
                          aria-owns={"simple-menu"}
                          disabled={this.state.credit < 1}
                          onClick={() => this.subtract("credit")}
                        >
                          <Button style={{ fontSize: 16 }}>
                            <RemoveCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                      </ListItem>
                      <ListItem>
                        <Button
                          style={{ margin: "auto", width: 200 }}
                          variant="contained"
                          color="primary"
                        >
                          بعدی
                        </Button>
                      </ListItem>
                    </List>
                  </Grid>
                )}
                {value === 4 && (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={10}
                    md={4}
                    direction="row"
                    justify="center"
                  >
                    {this.state.ticketList.map((item, i) => {
                      return (
                        <Grid item xs={12} justify="center">
                          <div
                            style={{
                              width: "100%",
                              height: 40,
                              textAlign: "center",
                              lineHeight: "40px",
                              background: "#eaeaea",
                              margin: "auto"
                            }}
                          >
                            {item.price > 0 ? "پولی" : "رایگان"}
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: 30,
                              textAlign: "center",
                              margin: "5 auto"
                            }}
                          >
                            <input
                              placeholder="عنوان"
                              style={{ width: "90%", height: "100%" }}
                            />
                          </div>

                          <Grid>
                            <List>
                              <ListItem>
                                تعداد
                                <IconButton
                                  style={{ padding: 0, marginRight: 18 }}
                                  aria-owns={"simple-menu"}
                                  onClick={() => {
                                    const { ticketList } = this.state;
                                    ticketList[i].amount += 1;
                                    this.setState({ ticketList });
                                  }}
                                >
                                  <Button>
                                    <AddCircleIcon
                                      style={{ fontSize: 28, color: "#0073c4" }}
                                    />
                                  </Button>
                                </IconButton>
                                {item.amount}
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-owns={"simple-menu"}
                                  disabled={item.amount < 1}
                                  onClick={() => {
                                    const { ticketList } = this.state;
                                    ticketList[i].amount -= 1;
                                    this.setState({ ticketList });
                                  }}
                                >
                                  <Button style={{ fontSize: 16 }}>
                                    <RemoveCircleIcon
                                      style={{ fontSize: 28, color: "#0073c4" }}
                                    />
                                  </Button>
                                </IconButton>
                              </ListItem>
                              {item.price > 0 && (
                                <ListItem>
                                  قیمت
                                  <IconButton
                                    style={{ padding: 0, marginRight: 18 }}
                                    aria-owns={"simple-menu"}
                                    onClick={() => {
                                      const { ticketList } = this.state;
                                      ticketList[i].price += 1;
                                      this.setState({ ticketList });
                                    }}
                                  >
                                    <Button>
                                      <AddCircleIcon
                                        style={{
                                          fontSize: 28,
                                          color: "#0073c4"
                                        }}
                                      />
                                    </Button>
                                  </IconButton>
                                  {item.price}
                                  <IconButton
                                    style={{ padding: 0 }}
                                    aria-owns={"simple-menu"}
                                    disabled={item.price < 2}
                                    onClick={() => {
                                      const { ticketList } = this.state;
                                      ticketList[i].price -= 1;
                                      this.setState({ ticketList });
                                    }}
                                  >
                                    <Button style={{ fontSize: 16 }}>
                                      <RemoveCircleIcon
                                        style={{
                                          fontSize: 28,
                                          color: "#0073c4"
                                        }}
                                      />
                                    </Button>
                                  </IconButton>
                                </ListItem>
                              )}
                              <div style={{ width: "100%", textAlign: "left" }}>
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-owns={"simple-menu"}
                                  onClick={() =>
                                    this.setState({
                                      itemSetting: i,
                                      popUpSetting: true
                                    })
                                  }
                                >
                                  <Button>
                                    <SettingIcon
                                      style={{
                                        fontSize: 28,
                                        color: "#0073c4"
                                      }}
                                    />
                                  </Button>
                                </IconButton>
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-owns={"simple-menu"}
                                  onClick={() => {
                                    const { ticketList } = this.state;
                                    ticketList.splice(i, 1);
                                    this.setState({ ticketList });
                                  }}
                                >
                                  <Button>
                                    <DeleteIcon
                                      style={{
                                        fontSize: 28,
                                        color: "#0073c4"
                                      }}
                                    />
                                  </Button>
                                </IconButton>
                              </div>
                            </List>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <div
                      style={{
                        margin: "auto",
                        width: "100%",
                        marginTop: 10,
                        marginBottom: 5
                      }}
                    >
                      <Typography style={{ marginBottom: 5 }}>
                        شرایط ورود را مشخص کنید.
                      </Typography>
                      <Button
                        style={{ width: "calc(50% - 5px)", marginLeft: 5 }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          const tickets = [...this.state.ticketList];
                          tickets.push({
                            title: "",
                            amount: 1,
                            price: 0,
                            credit: 0,
                            score: 0,
                            description: "",
                            startDay: "",
                            startMonth: "",
                            startYear: "",
                            endDay: "",
                            endMonth: "",
                            endYear: "",
                            startTimeHour: 12,
                            startTimeMin: 0,
                            endTimeHour: 12,
                            endTimeMin: 0
                          });
                          this.setState({ ticketList: tickets });
                        }}
                      >
                        رایگان
                      </Button>
                      <Button
                        style={{ width: "calc(50% - 5px)", marginRight: 5 }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          const tickets = [...this.state.ticketList];
                          tickets.push({ title: "", amount: 1, price: 1 });
                          this.setState({ ticketList: tickets });
                        }}
                      >
                        پولی
                      </Button>
                    </div>
                    <Button
                      style={{ margin: "auto", width: "100%", marginTop: 5 }}
                      variant="contained"
                      color="primary"
                    >
                      بعدی
                    </Button>
                  </Grid>
                )}

                <Grid item container xs={12} sm={12} md={12} direction="row">
                  <Typography
                    variant="body1"
                    style={{ width: "100%", color: "red" }}
                  >
                    {error}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions>
              <Grid container direction="row-reverse">
                {value === 3 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.submitForm.bind(this)}
                    disabled={this.state.disabledAdd}
                  >
                    افزودن
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({ value: this.state.value + 1 });
                    }}
                  >
                    مرحله بعد
                  </Button>
                )}

                <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={() => history.goBack()}
                >
                  انصراف
                </Button>
              </Grid>
            </CardActions>
          */}
          </Card>
          <Dialog
            open={this.state.popUpSetting}
            onClose={() => {
              this.setState({
                popUpSetting: false
              });
            }}
          >
            <DialogContent>
              <Grid item container xs={12} direction="row" justify="center">
                <List>
                  <ListItem>
                    امتیاز
                    <IconButton
                      style={{ padding: 0, marginRight: 10 }}
                      aria-owns={"simple-menu"}
                      onClick={() => {
                        const { ticketList } = this.state;
                        ticketList[this.state.itemSetting].score += 1;
                        this.setState({ ticketList });
                      }}
                    >
                      <Button>
                        <AddCircleIcon
                          style={{ fontSize: 28, color: "#0073c4" }}
                        />
                      </Button>
                    </IconButton>
                    {settingItem.score}
                    <IconButton
                      style={{ padding: 0 }}
                      aria-owns={"simple-menu"}
                      disabled={settingItem.score < 1}
                      onClick={() => {
                        const { ticketList } = this.state;
                        ticketList[this.state.itemSetting].score -= 1;
                        this.setState({ ticketList });
                      }}
                    >
                      <Button style={{ fontSize: 16 }}>
                        <RemoveCircleIcon
                          style={{ fontSize: 28, color: "#0073c4" }}
                        />
                      </Button>
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    اعتبار
                    <IconButton
                      style={{ padding: 0, marginRight: 18 }}
                      aria-owns={"simple-menu"}
                      onClick={() => {
                        const { ticketList } = this.state;
                        ticketList[this.state.itemSetting].credit += 1;
                        this.setState({ ticketList });
                      }}
                    >
                      <Button>
                        <AddCircleIcon
                          style={{ fontSize: 28, color: "#0073c4" }}
                        />
                      </Button>
                    </IconButton>
                    {settingItem.credit}
                    <IconButton
                      style={{ padding: 0 }}
                      aria-owns={"simple-menu"}
                      disabled={settingItem.credit < 1}
                      onClick={() => {
                        const { ticketList } = this.state;
                        ticketList[this.state.itemSetting].credit -= 1;
                        this.setState({ ticketList });
                      }}
                    >
                      <Button style={{ fontSize: 16 }}>
                        <RemoveCircleIcon
                          style={{ fontSize: 28, color: "#0073c4" }}
                        />
                      </Button>
                    </IconButton>
                  </ListItem>
                  <Typography variant="h6">توضیحات</Typography>
                  <ListItem>
                    <TextField
                      multiline
                      rows="8"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                    />
                  </ListItem>

                  <Grid container xs={12}>
                    <Typography
                      variant="h6"
                      style={{
                        position: "inline-block",
                        fontSize: 14,
                        paddingTop: 20,
                        paddingLeft: 10,
                        color: "green"
                      }}
                    >
                      تاریخ شروع
                    </Typography>
                    <FormControl>
                      <Select
                        style={{
                          paddingTop: 10,
                          paddingBottom: 5
                        }}
                        value={this.state.startDay}
                        onChange={e =>
                          this.setState({ startDay: e.target.value })
                        }
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="" disabled>
                          روز
                        </MenuItem>
                        {this.days.map((item, i) => {
                          return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                    <FormControl style={{ marginRight: 10 }}>
                      <Select
                        style={{
                          paddingTop: 10,
                          paddingBottom: 5
                        }}
                        value={this.state.startMonth}
                        onChange={e =>
                          this.setState({ startMonth: e.target.value })
                        }
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="" disabled>
                          ماه
                        </MenuItem>
                        {this.days.map((item, i) => {
                          if (i < 12)
                            return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                          else return null;
                        })}
                      </Select>
                    </FormControl>
                    <FormControl style={{ marginRight: 10 }}>
                      <Select
                        style={{
                          paddingTop: 10,
                          paddingBottom: 5
                        }}
                        value={this.state.startYear}
                        onChange={e =>
                          this.setState({ startYear: e.target.value })
                        }
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="" disabled>
                          سال
                        </MenuItem>
                        <MenuItem value={1398}>1398</MenuItem>
                        <MenuItem value={1399}>1399</MenuItem>
                        <MenuItem value={1400}>1400</MenuItem>
                        <MenuItem value={1401}>1401</MenuItem>
                        <MenuItem value={1402}>1402</MenuItem>
                        <MenuItem value={1403}>1403</MenuItem>
                        <MenuItem value={1404}>1404</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    xs={12}
                    style={{
                      marginTop: 10,
                      borderBottom: "1px solid #eaeaea"
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: 14,
                        paddingTop: 20,
                        paddingLeft: 20,
                        color: "green"
                      }}
                    >
                      ساعت شروع
                    </Typography>
                    <Grid
                      container
                      xs={12}
                      style={{
                        position: "relative",
                        maxWidth: 105,
                        marginTop: 5
                      }}
                    >
                      <Grid>
                        <IconButton
                          onClick={() => {
                            if (this.state.startTimeMin < 59)
                              this.setState({
                                startTimeMin: this.state.startTimeMin + 1
                              });
                          }}
                          style={{ padding: 0, display: "block" }}
                        >
                          <ArrowDropUpIcon
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                        <IconButton style={{ padding: 0, display: "block" }}>
                          <ArrowDropDownIcon
                            onClick={() => {
                              if (this.state.startTimeMin > 0)
                                this.setState({
                                  startTimeMin: this.state.startTimeMin - 1
                                });
                            }}
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                      </Grid>
                      <Grid style={{ margin: "auto", direction: "ltr" }}>
                        {this.state.startTimeHour} : {this.state.startTimeMin}
                      </Grid>
                      <Grid>
                        <IconButton style={{ padding: 0, display: "block" }}>
                          <ArrowDropUpIcon
                            onClick={() => {
                              this.setState({
                                startTimeHour: this.state.startTimeHour + 1
                              });
                            }}
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                        <IconButton style={{ padding: 0, display: "block" }}>
                          <ArrowDropDownIcon
                            onClick={() => {
                              if (this.state.startTimeHour > 0)
                                this.setState({
                                  startTimeHour: this.state.startTimeHour - 1
                                });
                            }}
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container xs={12}>
                    <Typography
                      variant="h6"
                      style={{
                        position: "inline-block",
                        fontSize: 14,
                        paddingTop: 20,
                        paddingLeft: 10,
                        color: "green"
                      }}
                    >
                      تاریخ پایان
                    </Typography>
                    <FormControl>
                      <Select
                        style={{
                          paddingTop: 10,
                          paddingBottom: 5
                        }}
                        value={this.state.endDay}
                        onChange={e =>
                          this.setState({ endDay: e.target.value })
                        }
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="" disabled>
                          روز
                        </MenuItem>
                        {this.days.map((item, i) => {
                          return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                    <FormControl style={{ marginRight: 10 }}>
                      <Select
                        style={{
                          paddingTop: 10,
                          paddingBottom: 5
                        }}
                        value={this.state.endMonth}
                        onChange={e =>
                          this.setState({ endMonth: e.target.value })
                        }
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="" disabled>
                          ماه
                        </MenuItem>
                        {this.days.map((item, i) => {
                          if (i < 12)
                            return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                          else return null;
                        })}
                      </Select>
                    </FormControl>
                    <FormControl style={{ marginRight: 10 }}>
                      <Select
                        style={{
                          paddingTop: 10,
                          paddingBottom: 5
                        }}
                        value={this.state.endYear}
                        onChange={e =>
                          this.setState({ endYear: e.target.value })
                        }
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="" disabled>
                          سال
                        </MenuItem>
                        <MenuItem value={1398}>1398</MenuItem>
                        <MenuItem value={1399}>1399</MenuItem>
                        <MenuItem value={1400}>1400</MenuItem>
                        <MenuItem value={1401}>1401</MenuItem>
                        <MenuItem value={1402}>1402</MenuItem>
                        <MenuItem value={1403}>1403</MenuItem>
                        <MenuItem value={1404}>1404</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    xs={12}
                    style={{
                      marginTop: 10,
                      borderBottom: "1px solid #eaeaea",
                      paddingBottom: 10
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: 14,
                        paddingTop: 20,
                        paddingLeft: 20,
                        color: "green"
                      }}
                    >
                      ساعت پایان
                    </Typography>
                    <Grid
                      container
                      xs={12}
                      style={{
                        position: "relative",
                        maxWidth: 105,
                        marginTop: 5
                      }}
                    >
                      <Grid>
                        <IconButton
                          onClick={() => {
                            if (this.state.endTimeMin < 59)
                              this.setState({
                                endTimeMin: this.state.endTimeMin + 1
                              });
                          }}
                          style={{ padding: 0, display: "block" }}
                        >
                          <ArrowDropUpIcon
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                        <IconButton style={{ padding: 0, display: "block" }}>
                          <ArrowDropDownIcon
                            onClick={() => {
                              if (this.state.endTimeMin > 0)
                                this.setState({
                                  endTimeMin: this.state.endTimeMin - 1
                                });
                            }}
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                      </Grid>
                      <Grid style={{ margin: "auto", direction: "ltr" }}>
                        {this.state.endTimeHour} : {this.state.endTimeMin}
                      </Grid>
                      <Grid>
                        <IconButton style={{ padding: 0, display: "block" }}>
                          <ArrowDropUpIcon
                            onClick={() => {
                              this.setState({
                                endTimeHour: this.state.endTimeHour + 1
                              });
                            }}
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                        <IconButton style={{ padding: 0, display: "block" }}>
                          <ArrowDropDownIcon
                            onClick={() => {
                              if (this.state.endTimeHour > 0)
                                this.setState({
                                  endTimeHour: this.state.endTimeHour - 1
                                });
                            }}
                            style={{
                              fontSize: 25,
                              color: "black"
                            }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </List>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" fullWidth>
                بعدی
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ productProductAdd, app }) => {
  return { ...productProductAdd, ...app };
};

export default compose(
  connect(
    mapStateToProps,
    {
      productProductAddChangeProp,
      prodcutProductAddFetchCategories,
      productProductAddSubmitForm
    }
  ),
  withStyles(styles)
)(EventAdd);

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
  Tab
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

class EventAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: "",
      disabledAdd: false,
      images: [],
      value: 1,
      creditHadie: 0
    };
    this.changePercent = this.changePercent.bind(this);
  }

  componentWillMount() {
    const { club, token, prodcutProductAddFetchCategories } = this.props;

    prodcutProductAddFetchCategories(club._id, token);
  }

  onImagesDrop(acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles);
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
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>
          افزودن رویداد
        </Typography>
        <Grid item container style={{ marginTop: "20px" }} direction="column">
          <Card>
            <Tabs
              value={value}
              onChange={(event, newVal) => {
                this.setState({ value: newVal });
              }}
            >
              <Tab label="عنوان و توضیحات" />
              <Tab label="عنوان و توضیحات" />
              <Tab label="قیمت امتیاز" />
              <Tab label="انتخاب عکس " />
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
                    {value == 1 && this.renderImages()}

                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      style={{
                        height: 150,
                        padding: 5
                      }}
                    >
                      <DropZone
                        multiple
                        onDrop={this.onImagesDrop.bind(this)}
                        accept="image/jpeg, image/png"
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
                    {/* <div className={classes.uploadMessageContainer}>
                        <p>عکس ها را اینجا بکشید</p>
                        <p>یا کلیک کنید</p>
                      </div> */}
                  </Grid>
                )}
                {value == 2 && (
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
                      <Typography variant="h6">قیمت به تومان</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        value={price}
                        onChange={e => {
                          productProductAddChangeProp("price", e.target.value);
                          this.changePercent(undefined, e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      sm={12}
                      md={6}
                      direction="column"
                    >
                      <Typography variant="h6">امتیاز هدیه</Typography>
                      <Grid item container direction="row" alignItems="center">
                        <TextField
                          variant="outlined"
                          margin="dense"
                          value={this.state.percent}
                          onChange={e => this.changePercent(e.target.value)}
                        />
                        <br />
                        <Typography
                          variant="caption"
                          style={{ marginRight: "3px" }}
                        >
                          {point}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ marginRight: "5px" }}
                        >
                          امتیاز
                        </Typography>
                      </Grid>
                      <Typography variant="caption">
                        امتیازات در کیف پول مشتریان ذخیره میگردد که میتوانند در
                        خریدهای بعدی از آن استفاده کنند.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      sm={12}
                      md={6}
                      direction="column"
                    >
                      <Typography variant="h6">اعتبار هدیه</Typography>
                      <Grid item container direction="row" alignItems="center">
                        <TextField
                          variant="outlined"
                          margin="dense"
                          value={this.state.creditHadie}
                          onChange={e =>
                            this.setState({ creditHadie: e.target.value })
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            )
                          }}
                        />
                        <br />
                        <Typography
                          variant="caption"
                          style={{ marginRight: "3px" }}
                        >
                          {credit}
                        </Typography>
                      </Grid>
                      <Typography variant="caption">
                        اعتبار هدیه در کیف پول مشتریان ذخیره میگردد و میتوانند
                        بعدا در خریدهای بعدی از آن استفاده کننده
                      </Typography>
                    </Grid>

                    <Grid item container xs={12} sm={12} md={6} direction="row">
                      <Typography variant="h6">نوع</Typography>
                      <FormControl fullWidth>
                        <Select
                          style={{ paddingTop: "10px", paddingBottom: "15px" }}
                          value={type}
                          onChange={e =>
                            productProductAddChangeProp("type", e.target.value)
                          }
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem value="" disabled>
                            نوع محصول را انتخاب کنید
                          </MenuItem>
                          <MenuItem value="downloadable">
                            دارای لینک دانلود
                          </MenuItem>
                          <MenuItem value="physical">بدون لینک دانلود</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Typography vaiant="caption">
                      محصولات شما میتوانند دانلودی یا فیزیکی باشند، لینک محصولات
                      دانلودی پس از خرید برای مشتری ارسال میشود{" "}
                    </Typography>
                    {type === "downloadable" && (
                      <Grid
                        item
                        container
                        xs={12}
                        sm={12}
                        md={12}
                        direction="row"
                      >
                        <Typography variant="h6" style={{ marginTop: "20px" }}>
                          لینک ها
                        </Typography>
                        <TagsInput
                          className={classes.tagsInputWrapper}
                          inputProps={{
                            placeholder: "افزودن لینک"
                          }}
                          value={links}
                          onChange={tags =>
                            productProductAddChangeProp("links", tags)
                          }
                        />
                      </Grid>
                    )}
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
                    <Typography variant="h6" style={{ width: "100%" }}>
                      عکس ها
                    </Typography>
                    <DropZone
                      multiple
                      onDrop={this.onImagesDrop.bind(this)}
                      accept="image/jpeg, image/png"
                    >
                      <div className={classes.uploadMessageContainer}>
                        <p>عکس ها را اینجا بکشید</p>
                        <p>یا کلیک کنید</p>
                      </div>
                    </DropZone>
                  </Grid>
                )}
                {value === 3 && (
                  <Typography variant="caption">
                    جهت دریافت بازخوردهای بهتر از عکسهای با کیفیت استفاده کنید{" "}
                  </Typography>
                )}
                {value === 3 && this.renderImages()}

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
            <CardActions>
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
          </Card>
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

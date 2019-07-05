import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
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
  FormControlLabel,
  Radio,
  RadioGroup,
  Tabs,
  Tab
} from "@material-ui/core";
//import styles from "./styles/CreditAdd";
import {
  productProductAddChangeProp,
  prodcutProductAddFetchCategories
} from "../../redux/actions";
import "./CreditCardAdd.css";
import { getLabel } from "../../redux/actions/label/labelAction";
import Label from "@material-ui/icons/Label";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import { DatePicker } from "react-advance-jalaali-datepicker";
import moment from "jalali-moment";
import styles from "./styles/CreditCardAdd";
import { campainCampainAddChangeProp } from "../../redux/actions";
class CreditCardAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      cartType: "",
      score: 0,
      amount: 0,
      credit: 0,
      price: 0
    };
  }
  componentDidMount() {
    // const { club, token, prodcutProductAddFetchCategories } = this.props;
    // prodcutProductAddFetchCategories(club._id, token);
    //getLabel(club._id, token);
    //console.log("props:", this.props);
  }
  componentWillMount = () => {
    const { club, token, prodcutProductAddFetchCategories } = this.props;
    prodcutProductAddFetchCategories(club._id, token);
  };
  DatePickerInput = (props, prop) => {
    return (
      <input
        className={this.props.classes.datePicker}
        {...props}
        value={this.props[prop]}
      />
    );
  };

  changeTime(prop, unix, format) {
    let now = moment().format("jYYYY/jMM/jDD");
    if (format < now) {
      this.props.campainCampainAddChangeProp(prop, now);
      return;
    }
    this.props.campainCampainAddChangeProp(prop, format);
  }
  handleCurrency = e => {
    var rt = e.target.value;
    // if (rt.length % 4 === 1) {
    //   rt = rt + ",";
    // }
    this.setState({ credit: rt });
    console.log(rt);
  };
  handleChange = event => {
    //setValue(event.target.value);
    //console.log(event.target.value);
    this.setState({ cartType: event.target.value });
  };
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

      for (let i = 0; categories && i < categories.length; i++) {
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
  add = item => {
    if (item === "score") this.setState({ score: this.state.score + 1 });
    else if (item === "amount")
      this.setState({ amount: this.state.amount + 1 });
  };
  subtract = item => {
    if (item === "score") this.setState({ score: this.state.score - 1 });
    else if (item === "amount")
      this.setState({ amount: this.state.amount - 1 });
  };
  handleChange = () => {};
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
      history
    } = this.props;
    const formater = new Intl.NumberFormat("en-IN", {});
    let categories = this.sortCategories();
    const { value } = this.state;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6">افزودن کارت اعتباری</Typography>
        <Grid item container xs={12} sm={12} md={6}>
          <Card style={{ marginBottom: 10, width: "100%" }}>
            <div variant="h6" style={{ margin: 10, display: "inline-block" }}>
              جستجو بر اساس نام کلاب
            </div>
            <input
              style={{
                width: "80%",
                height: 25,
                overflow: "hidden",
                borderRadius: 10,
                padding: 5,
                margin: 10
              }}
            />
            <Button variant="contained" color="primary">
              جست و جو
            </Button>
          </Card>
        </Grid>
        <Grid item container style={{ marginTop: "20px" }} direction="column">
          <Card>
            <Tabs
              value={value}
              onChange={(event, newVal) => {
                this.setState({ value: newVal });
              }}
            >
              {/* <Tab label="نوع کارت" /> */}
              <Tab label="جزئیات" />
              <Tab label="محصولات و دسته بندی" />
              <Tab label="تاریخ" />
            </Tabs>
            <CardContent>
              <Grid
                item
                container
                direction="row"
                alignItems="baseline"
                spacing={2}
                justify="flex-start"
              >
                {value == 0 && (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={6}
                    direction="row"
                    spacing={0}
                    alignItems="center"
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <Typography variant="body2">
                        مشتریان میتوانند با پرداخت هزینه یا با استفاده از
                        امتیازاتی که قبلا دریافت کرده اند این اعتبار را دریافت
                        کنند
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" xs={12} sm={12} md={6}>
                      <Typography variant="h6">تعداد کارت اعتباری</Typography>
                      <Grid
                        item
                        container
                        direction="row"
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        <IconButton
                          style={{ padding: 0, marginRight: 53 }}
                          aria-owns={"simple-menu"}
                          onClick={() => this.add("amount")}
                        >
                          <Button>
                            <AddCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                        <Typography variant="h6">
                          {this.state.amount}
                        </Typography>
                        <IconButton
                          style={{ padding: 0 }}
                          aria-owns={"simple-menu"}
                          disabled={this.state.amount < 1}
                          onClick={() => this.subtract("amount")}
                        >
                          <Button style={{ fontSize: 16 }}>
                            <RemoveCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>
                      </Grid>

                      <Typography variant="h6">امتیاز مورد نیاز</Typography>
                      <Grid
                        item
                        container
                        direction="row"
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        <IconButton
                          style={{ padding: 0, marginRight: 53 }}
                          aria-owns={"simple-menu"}
                          onClick={() => this.add("score")}
                        >
                          <Button>
                            <AddCircleIcon
                              style={{ fontSize: 28, color: "#0073c4" }}
                            />
                          </Button>
                        </IconButton>

                        <Typography variant="h6">{this.state.score}</Typography>
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
                        <Typography variant="body1">
                          تعداد امتیاز مورد نیاز برای دریافت اعتبار ممکن است
                          توسط مدیریت سایت تغییر کند
                        </Typography>
                      </Grid>

                      <Typography variant="h6">حجم اعتبار(تومان)</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        type="string"
                        value={formater.format(this.state.credit)}
                        onChange={this.handleCurrency}
                      />
                      <Typography variant="h6">قیمت (تومان)</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        type="number"
                      />
                    </Grid>
                  </Grid>
                )}
                {value === 1 && (
                  <Grid item container xs={12} sm={10} md={4} direction="row">
                    {categories.length !== 0 && (
                      <React.Fragment>
                        <Typography variant="h6" style={{ width: "100%" }}>
                          دسته بندی
                        </Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            value={category}
                            onChange={e =>
                              productProductAddChangeProp(
                                "category",
                                e.target.value
                              )
                            }
                          >
                            {categories.map(category => {
                              return (
                                <FormControlLabel
                                  value={category._id}
                                  control={<Radio />}
                                  key={category._id}
                                  label={
                                    "-".repeat(category.indent) +
                                    " " +
                                    category.name
                                  }
                                />
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      </React.Fragment>
                    )}
                  </Grid>
                )}

                {value === 2 && (
                  <Grid item container direction="row" xs={12} sm={12} md={6}>
                    <Grid
                      item
                      container
                      direction="row"
                      alignItems="center"
                      style={{ marginTop: "20px" }}
                    >
                      <Typography variant="title" style={{ width: "50%" }}>
                        تاریخ شروع
                      </Typography>
                      <DatePicker
                        placeholder="انتخاب تاریخ"
                        format="jYYYY/jMM/jDD"
                        inputComponent={props =>
                          this.DatePickerInput(props, "start_date")
                        }
                        onChange={(unix, format) =>
                          this.changeTime("start_date", unix, format)
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      alignItems="center"
                      style={{ marginBottom: "20px" }}
                    >
                      <Typography variant="title" style={{ width: "50%" }}>
                        تاریخ پایان
                      </Typography>
                      <DatePicker
                        placeholder="انتخاب تاریخ"
                        format="jYYYY/jMM/jDD"
                        inputComponent={props =>
                          this.DatePickerInput(props, "expire_date")
                        }
                        onChange={(unix, format) =>
                          this.changeTime("expire_date", unix, format)
                        }
                      />
                    </Grid>
                    <Typography variant="h6">توضیحات</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      multiline
                    />
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
            <CardActions>
              <Grid container direction="row-reverse">
                {value === 2 ? (
                  <Button variant="contained" color="primary">
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

const mapStateToProps = ({
  customerCustomerAdd,
  app,
  label,
  campainCampainAdd
}) => {
  return { ...customerCustomerAdd, ...app, ...label, ...campainCampainAdd };
};

export default compose(
  connect(
    mapStateToProps,
    {
      productProductAddChangeProp,
      prodcutProductAddFetchCategories,
      campainCampainAddChangeProp
    }
  ),
  withStyles(styles)
)(CreditCardAdd);
//export default CreditCardAdd;

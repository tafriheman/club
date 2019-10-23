import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { Textfit } from "react-textfit";
import styles from './styles/gold';
import {
  FormControl, IconButton,
} from '@material-ui/core';
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import Edit from "@material-ui/icons/Edit";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActions,
  TextField,
  withStyles,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@material-ui/core";
// import styles from "./styles/CustomerAdd";

import {
  customerCustomerAddChangeProp,
  customerCustomerSubmitForm
} from "../../redux/actions";
import readXlsxFile from "read-excel-file";

import { getLabel } from "../../redux/actions/label/labelAction";
import Label from "@material-ui/icons/Label";
import DoneIcon from "@material-ui/icons/Done";
class CustomerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      labels: [],
      error: false,
      count: [1],
      count2: [1]
    };
  }
  componentDidMount() {
    const { token, club, getLabel, clubId } = this.props;
    getLabel(club._id, token);
    console.log("props:", this.props);
  }

  excelInput = event => {
    const fileAddress = event.target.value;
    readXlsxFile(event.target.files[0]).then(rows => {
      var newRows = [];
      rows.map(row => {
        const newRow = {};
        newRow["name"] = row[0];
        newRow["phone"] = row[1];
        newRow["job"] = row[2];
        newRow["city"] = row[3];
        newRow["birth"] = row[4];
        newRow["address"] = row[5];
        newRows.push(newRow);
      });
      this.setState({ customerList: newRows });
    });
  };
  render() {
    const {
      classes,
      customerCustomerAddChangeProp,
      full_name,
      phone,
      error,
      address,
      job,
      city,
      birth_date,
      customerCustomerSubmitForm,
      club,
      token
    } = this.props;
    return (
      <div style={{ flexGrow: 1 }}>
        <TopNavbar isClubProfile />
        <div className={classes.flexDiv}>
          <div>
            <SideBarLayout isClubProfile={false} />
          </div>
          <Grid container justify="space-evenly" spacing={3}>
            <Grid
              item
              xs={12}
              sm={8}
              style={{ paddingLeft: 10, marginBottom: 20 }}
            >
              <Paper className={classes.paper} style={{ padding: 20 }}>
                <div style={{ paddingRight: '20px' }}>
                  <div style={{ paddingTop: '106px' }}         >
                    <div className={classes.fcatdiv}>
                      <div style={{ paddingRight: '1.3vw' }}>
                        <Textfit className={classes.title}>
                          تنظیمات
            </Textfit>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              کدحسابداری
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                            {this.state.error ? <Textfit className={classes.err}>
                              این کد قبلا ثبت شده است.
            		</Textfit> : <Textfit className={classes.err} style={{ color: 'transparent' }}>
                                این کد قبلا ثبت شده است.
                </Textfit>
                            }
                          </div>
                        </div>
                        <div style={{ paddingTop: '16px', paddingRight: '1.5vw' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              کد سرگروه
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                            {this.state.error ? <Textfit className={classes.err}>
                              موردی با این کد یافت نشد.
            		</Textfit> : null
                            }
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              نام و نام خانوادگی
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div style={{ paddingTop: '16px', paddingRight: '1vw' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              کد ملی
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '25px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              تاریخ تولد
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div style={{ paddingRight: '16vw' }}>
                          <IconButton >
                            <Button >
                              <AddCircleIcon style={{
                                width: '40px', height: '40px',
                                fontSize: 28, color: "#283264",
                                '&:hover': {
                                  backgroundColor: 'transparent'
                                }
                              }} />
                            </Button>
                          </IconButton>
                          <Textfit className={classes.title4}>
                            افزودن عکس
            </Textfit>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              توضیحات
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.fcatdiv} style={{ paddingTop: '62px' }}>
                      <div style={{ paddingRight: '20px' }}>
                        <Textfit className={classes.title}>
                          نشانی
            </Textfit>
                      </div>
                      <div className={classes.flexDiv}>
                        <div>
                          {this.state.count.map(() => {
                            return (
                              <div>
                                <div className={classes.flexDiv}>
                                  <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                                    <div>
                                      <Textfit className={classes.title2}>
                                        عنوان
                              </Textfit>
                                    </div>
                                    <div style={{ paddingRight: '1.5vw' }}>
                                      <FormControl className={classes.formcontrol}  >
                                        <Input type="text" disableUnderline
                                          className={classes.orderCatt}
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                                <div className={classes.flexDiv}>
                                  <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                                    <div>
                                      <Textfit className={classes.title2}>
                                        منطقه
                    </Textfit>
                                    </div>
                                    <div style={{ paddingRight: '1.5vw' }}>
                                      <FormControl className={classes.formcontrol}  >
                                        <Input type="text" disableUnderline
                                          className={classes.orderCatt}
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                                <div className={classes.flexDiv}>
                                  <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                                    <div>
                                      <Textfit className={classes.title2}>
                                        نشانی
                    </Textfit>
                                    </div>
                                    <div style={{ paddingRight: '1.5vw' }}>
                                      <FormControl className={classes.formcontrol}  >
                                        <Input type="text" disableUnderline
                                          className={classes.orderCatt}
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                                <div className={classes.flexDiv}>
                                  <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                                    <div>
                                      <Textfit className={classes.title2}>
                                        شماره ثابت
              </Textfit>
                                    </div>
                                    <div style={{ paddingRight: '1.5vw' }}>
                                      <FormControl className={classes.formcontrol}  >
                                        <Input type="text" disableUnderline
                                          className={classes.orderCatt}
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                                <Textfit className={classes.title2} style={{ width: '27vw' }}>
                                  <hr />
                                </Textfit>
                              </div>
                            )
                          })
                          }
                          <div style={{ paddingRight: '15vw' }}>
                            <IconButton
                              style={{
                                '&:hover': {
                                  backgroundColor: 'transparent'
                                }
                              }}
                              onClick={() => {
                                let x = this.state.count;
                                x.push(1);
                                this.setState({
                                  count: x
                                })
                              }}
                            >
                              <Button>
                                <AddCircleIcon style={{
                                  fontSize: 28, color: "#283264",
                                  '&:hover': {
                                    backgroundColor: 'transparent'
                                  }
                                }} />
                              </Button>
                            </IconButton>
                          </div>
                        </div>
                        <div >
                          {this.state.count2.map(() => {
                            return (
                              <div className={classes.flexDiv}>
                                <div className={classes.flexDiv}>
                                  <div>
                                    <Textfit className={classes.title2}>
                                      شماره تماس
            		      </Textfit>
                                  </div>
                                  <div style={{ paddingRight: '1.5vw' }}>
                                    <FormControl className={classes.formcontrol}  >
                                      <Input type="text" disableUnderline
                                        className={classes.orderCatt}
                                      />
                                    </FormControl>
                                    {this.state.error ? <Textfit className={classes.err}>
                                      این شماره قبلا ثبت شده است.
            		      </Textfit> : <Textfit className={classes.err} style={{ color: 'transparent' }}>
                                        این کد قبلا ثبت شده است.
                      </Textfit>
                                    }
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          <div style={{ paddingRight: '15.5vw' }}>
                            <IconButton
                              style={{
                                '&:hover': {
                                  backgroundColor: 'transparent'
                                }
                              }}
                              onClick={() => {
                                let x = this.state.count2;
                                x.push(1);
                                this.setState({
                                  count2: x
                                })
                              }}
                            >
                              <Button>
                                <AddCircleIcon style={{
                                  fontSize: 28, color: "#283264",
                                  '&:hover': {
                                    backgroundColor: 'transparent'
                                  }
                                }} />
                              </Button>
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.fcatdiv}>
                      <div >
                        <Textfit className={classes.title}>
                          اطلاعات باشگاهی
            </Textfit>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              نام معرف
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div style={{ paddingTop: '16px', paddingRight: '1.5vw' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              عنوان شغلی
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              امتیاز اولیه
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div style={{ paddingTop: '16px', paddingRight: '1.5vw' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              عنوان محل کار
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              گروه بندی
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div style={{ paddingTop: '16px', paddingRight: '1.5vw' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              نشانی محل کار
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              شیوه ی اشنایی
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div style={{ paddingTop: '16px', paddingRight: '1.5vw' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              شماره تماس محل کار
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.fcatdiv}>
                      <div >
                        <Textfit className={classes.title}>
                          اطلاعات آشنایان
            </Textfit>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              نام و نام خانوادگی
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              شماره تماس
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              شماره موبایل
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className={classes.flexDiv}>
                        <div style={{ paddingTop: '16px' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              نشانی
            		</Textfit>
                          </div>
                          <div style={{ paddingRight: '1.5vw' }}>
                            <FormControl className={classes.formcontrol}  >
                              <Input type="text" disableUnderline
                                className={classes.orderCatt}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={classes.backdiv} style={{ paddingRight: '32.4vw', paddingTop: '85px' }}>
                      <Button className={classes.nextButton}							>
                        <Textfit className={classes.next}> ثبت تنظیمات </Textfit>
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
              <Paper
                className={classes.paper}
                style={{ padding: 20, marginTop: 20 }}
              >
                <Grid container direction="column" style={{ padding: "30px" }}>
                  <Typography variant="title">فایل Excel</Typography>
                  <div
                    style={{
                      width: "40%",
                      minWidth: 200,
                      marginBottom: 5
                    }}
                  >
                    <Input
                      onChange={event => {
                        this.excelInput(event);
                      }}
                      type="file"
                      fullWidth
                    />
                  </div>
                </Grid>

                <Grid container direction="row-reverse">
                  <Button variant="contained" color="primary" onClick={() => { }}>
                    افزودن
                </Button>
                </Grid>

                <Grid
                  container
                  direction="column"
                  style={{ paddingRight: "30px" }}
                >
                  <Typography
                    style={{ fontSize: 20, marginBottom: "5px" }}
                    variant="title"
                  >
                    پیش نمایش
                </Typography>
                </Grid>
                <Paper style={{ margin: 20, direction: "rtl", overflow: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ textAlign: "center" }}>
                          نام و نام خانوادگی
                      </TableCell>
                        <TableCell style={{ textAlign: "center" }} align="right">
                          شماره همراه
                      </TableCell>
                        <TableCell style={{ textAlign: "center" }} align="right">
                          شغل
                      </TableCell>
                        <TableCell style={{ textAlign: "center" }} align="right">
                          شهر
                      </TableCell>
                        <TableCell style={{ textAlign: "center" }} align="right">
                          تاریخ تولد
                      </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.customerList.map(row => (
                        <TableRow key={row.name}>
                          <TableCell
                            style={{ textAlign: "center" }}
                            component="th"
                            scope="row"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center" }}
                            align="right"
                          >
                            {row.phone}
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center" }}
                            align="right"
                          >
                            {row.job}
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center" }}
                            align="right"
                          >
                            {row.city}
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center" }}
                            align="right"
                          >
                            {row.birth}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper style={{ padding: 20 }} className={classes.paper}>
                <div style={{ position: "relative", padding: 8 }}>
                  <div style={{ display: "inline-block" }}>
                    <Typography variant="title">برچسب های انتخاب شده</Typography>
                  </div>
                </div>
                {/* SelectedLabels */}
                <Grid container spacing={16}>
                  <Grid item xs={12} lg={12} md={12} spacing={16}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}
                    >
                      <div style={{ flex: 1, paddingRight: 20 }} />
                    </div>
                    {this.state.labels.map((element, i) => {
                      return (
                        <div
                          key={"label-" + i}
                          style={{ display: "inline-block" }}
                        >
                          <Chip
                            label={element.title}
                            onDelete={() => {
                              let labels = this.state.labels;
                              let i = 0;
                              for (let j = 0; j < labels.length; j++) {
                                if (labels[j]._id === element._id) {
                                  i = j;
                                }
                              }
                              const filteredItems = labels
                                .slice(0, i)
                                .concat(labels.slice(i + 1, labels.length));
                              this.setState({
                                labels: filteredItems
                              });
                            }}
                            style={{
                              margin: 5,
                              height: "auto",
                              flexWrap: "wrap",
                              backgroundColor: element.color,
                              display: "flex",
                              color: element.color ? "#000" : "#fff",
                              justifyContent: "space-between"
                            }}
                            classes={{
                              deleteIcon: "chipIcon",
                              label: "chipLabel"
                            }}
                          />
                        </div>
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
              <Paper
                style={{ padding: 20, marginTop: 20 }}
                className={classes.paper}
              >
                <Grid item xs={12} sm={12} lg={6} md={6} spacing={16}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: 20 }}>
                      <Typography variant="h6" style={{ paddingTop: 15 }}>
                        عنوان
                    </Typography>
                    </div>

                    <div>
                      <Typography variant="h6" style={{ paddingTop: 15 }}>
                        انتخاب
                    </Typography>
                    </div>
                  </div>
                  {this.props.list.data.length > 0 &&
                    this.props.list.data.map((item, index) => {
                      return (
                        <div
                          id={item._id}
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 10
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              backgroundColor: item.color,
                              margin: 5
                            }}
                          />
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "flex-start"
                            }}
                          >
                            <Typography style={{ paddingTop: 10 }}>
                              {item.title}
                            </Typography>
                          </div>

                          <div>
                            <IconButton
                              component="span"
                              onClick={() => {
                                const itemId = item._id;
                                let label = {
                                  label: itemId
                                };
                                let labels = this.state.labels;
                                let flag = false;
                                labels.forEach(i => {
                                  if (itemId === i._id) flag = true;
                                });
                                if (!flag) {
                                  labels.push(item);
                                  //selectedLabels.push(label);
                                  this.setState({
                                    labels
                                  });
                                }
                              }}
                            >
                              <DoneIcon
                                style={{
                                  marginTop: 0,
                                  color: "#000"
                                }}
                              />
                            </IconButton>
                          </div>
                        </div>
                      );
                    })}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customerCustomerAdd, app, label }) => {
  return { ...customerCustomerAdd, ...app, ...label };
};

export default compose(
  connect(
    mapStateToProps,
    {
      getLabel,
      customerCustomerAddChangeProp,
      customerCustomerSubmitForm
    }
  ),
  withStyles(styles)
)(CustomerAdd);

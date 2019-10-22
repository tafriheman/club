import React, { Component } from 'react';
import { Textfit } from "react-textfit";
import styles from './styles/gold';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Input, FormControl, IconButton, Grid,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import Edit from "@material-ui/icons/Edit";
import SideBarLayout from "../Layout/SidebarLayout";
import TopNavbar from "../Layout/TopNavbar";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      count: [1],
      count2: [1]
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TopNavbar isClubProfile />
        <div className={classes.flexDiv}>
          <div>
            <SideBarLayout isClubProfile={false} />
          </div>
          <div
            style={{ paddingTop: '106px', paddingRight: '20px' }}
          >
            <div className={classes.fcatdiv}>
              <div style={{ paddingRight: '1.8vw' }}>
                <Textfit className={classes.title}>
                  تنظیمات
            </Textfit>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      کدحسابداری
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
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
                <div style={{ paddingTop: '16px', paddingRight: '3vw' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      کد سرگروه
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
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
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      نام و نام خانوادگی
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
                <div style={{ paddingTop: '16px', paddingRight: '3vw' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      کد ملی
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '25px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      تاریخ تولد
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
                <div style={{ paddingRight: '18vw' }}>
                  <IconButton style={{ paddingRight: '2vw' }}>
                    <Button>
                      <AddCircleIcon style={{
                        width: '40px', height: '40px',
                        fontSize: 28, color: "#283264",
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }} />
                    </Button>
                  </IconButton>
                  <Textfit className={classes.title4} style={{ paddingRight: '1vw' }}>
                    افزودن عکس
            </Textfit>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      توضیحات
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
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
              <div style={{ paddingRight: '1.8vw' }}>
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
                          <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                            <div>
                              <Textfit className={classes.title2}>
                                عنوان
                              </Textfit>
                            </div>
                            <div style={{ paddingRight: '3vw' }}>
                              <FormControl className={classes.formcontrol}  >
                                <Input type="text" disableUnderline
                                  className={classes.orderCatt}
                                />
                              </FormControl>
                            </div>
                          </div>
                        </div>
                        <div className={classes.flexDiv}>
                          <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                            <div>
                              <Textfit className={classes.title2}>
                                منطقه
                    </Textfit>
                            </div>
                            <div style={{ paddingRight: '3vw' }}>
                              <FormControl className={classes.formcontrol}  >
                                <Input type="text" disableUnderline
                                  className={classes.orderCatt}
                                />
                              </FormControl>
                            </div>
                          </div>
                        </div>
                        <div className={classes.flexDiv}>
                          <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                            <div>
                              <Textfit className={classes.title2}>
                                نشانی
                    </Textfit>
                            </div>
                            <div style={{ paddingRight: '3vw' }}>
                              <FormControl className={classes.formcontrol}  >
                                <Input type="text" disableUnderline
                                  className={classes.orderCatt}
                                />
                              </FormControl>
                            </div>
                          </div>
                        </div>
                        <div className={classes.flexDiv}>
                          <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                            <div>
                              <Textfit className={classes.title2}>
                                شماره ثابت
              </Textfit>
                            </div>
                            <div style={{ paddingRight: '3vw' }}>
                              <FormControl className={classes.formcontrol}  >
                                <Input type="text" disableUnderline
                                  className={classes.orderCatt}
                                />
                              </FormControl>
                            </div>
                          </div>
                        </div>
                        <Textfit className={classes.title2} style={{ width: '30vw' }}>
                          <hr />
                        </Textfit>
                      </div>
                    )
                  })
                  }
                  <div style={{ paddingRight: '18vw' }}>
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
                        <div style={{ paddingRight: '3vw' }} className={classes.flexDiv}>
                          <div>
                            <Textfit className={classes.title2}>
                              شماره تماس
            		      </Textfit>
                          </div>
                          <div style={{ paddingRight: '3vw' }}>
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
                  <div style={{ paddingRight: '20vw' }}>
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
              <div style={{ paddingRight: '1.8vw' }}>
                <Textfit className={classes.title}>
                  اطلاعات باشگاهی
            </Textfit>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      نام معرف
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
                <div style={{ paddingTop: '16px', paddingRight: '3vw' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      عنوان شغلی
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      امتیاز اولیه
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
                <div style={{ paddingTop: '16px', paddingRight: '3vw' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      عنوان محل کار
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      گروه بندی
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
                <div style={{ paddingTop: '16px', paddingRight: '3vw' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      نشانی محل کار
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      شیوه ی اشنایی
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
                <div style={{ paddingTop: '16px', paddingRight: '3vw' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      شماره تماس محل کار
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
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
              <div style={{ paddingRight: '1.8vw' }}>
                <Textfit className={classes.title}>
                  اطلاعات آشنایان
            </Textfit>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      نام و نام خانوادگی
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      شماره تماس
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      شماره موبایل
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
                    <FormControl className={classes.formcontrol}  >
                      <Input type="text" disableUnderline
                        className={classes.orderCatt}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv}>
                <div style={{ paddingTop: '16px', paddingRight: '20px' }} className={classes.flexDiv}>
                  <div>
                    <Textfit className={classes.title2}>
                      نشانی
            		</Textfit>
                  </div>
                  <div style={{ paddingRight: '3vw' }}>
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
              <div style={{ paddingRight: '1.8vw' }}>
                <Textfit className={classes.title}>
                  برچسب ها
            </Textfit>
              </div>
              <div style={{ width: '73vw' }}>
                <div style={{ paddingTop: '32px' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card} style={{ backgroundColor: '#ff33ff' }}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
      </Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}

                          >
                            <Edit style={{ color: "white" }} />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
      </Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}
                          >
                            <Edit style={{ color: "white" }} />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
      </Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}
                          >
                            <Edit style={{ color: "white" }} />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
      </Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}

                          >
                            <Edit style={{ color: "white" }} />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ paddingTop: '32px' }}>
                  <Grid container spacing={1}>

                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
                      </Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}

                          >
                            <Edit style={{ color: "white" }} />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card} style={{ backgroundColor: ' #cc0066' }}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
                      </Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}

                          >
                            <Edit style={{ color: "white" }} />
                          </Button>

                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card} style={{ backgroundColor: '#ff3333' }}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
</Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}

                          >
                            <Edit style={{ color: "white" }} />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} spacing={2}>
                      <Card className={classes.card} style={{ backgroundColor: '#ff3333' }}>
                        <CardContent>
                          <Textfit className={classes.title3}>
                            آژانس مسافربری و تور
</Textfit>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="fab"
                            mini
                            style={{ background: "#00a152" }}

                          >
                            <Edit style={{ color: "white" }} />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>

                </div>
              </div>
            </div>
            <div className={classes.backdiv} style={{ paddingRight: '35.4vw', paddingTop: '85px' }}>
              <Button className={classes.nextButton}							>
                <Textfit className={classes.next}> ثبت تنظیمات </Textfit>
              </Button>
            </div>

          </div>
        </div>
      </div >
    )
  }
}



export default withStyles(styles)(Orders);


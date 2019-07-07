import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
class CreditCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCards: [
        {
          credit: 25000,
          price: 10000,
          point: 50,
          categories: ["پیتزا پپرونی", "شف برگر", "موهیتو"],
          expireTime: 1562440226720,
          remaining: 120
        },
        {
          credit: 2000,
          price: 12000,
          point: 20,
          categories: ["پیتزا مخصوص", " برگر", "موهیتو"],
          expireTime: 1562440226720,
          remaining: 30
        },
        {
          credit: 25000,
          price: 10000,
          point: 100,
          categories: ["پیتزا پپرونی", "شف برگر"],
          expireTime: 1562440226720,
          remaining: 100
        }
      ],
      productList: [
        { title: "شف برگر", price: 33000, photo: "" },
        { title: "چیز برگر", price: 33000, photo: "" },
        { title: " پیتزا", price: 33000, photo: "" },
        { title: "هات داگ ", price: 33000, photo: "" }
      ],

      openProduct: false
    };
  }
  componentDidMount() { }
  render() {
    return (
      <Grid container direction="column" alignItems="right">
        <Typography variant="h4"> کارت های اعتباری</Typography>
        <Grid item container xs={12} sm={12} md={12}>
          {this.state.creditCards.map((item, i) => {
            return (
              <Grid xs={12} sm={12} md={4}>
                <Card
                  style={{
                    textAlign: "center",
                    position: "relative",
                    height: "100%",
                    margin: 5
                  }}
                >
                  <CardContent>
                    <div style={{ width: "100%", height: "50%" }}>
                      <Carousel
                        showThumbs={true}
                        showStatus={false}
                        infiniteLoop={true}
                      >
                        <div>
                          <img src="https://picsum.photos/id/504/1000/400" />
                        </div>
                        <div>
                          <img src="https://picsum.photos/id/501/1000/400" />
                        </div>
                        <div>
                          <img src="https://picsum.photos/id/500/1000/400" />
                        </div>
                        <div>
                          <img src="https://picsum.photos/id/500/1000/400" />
                        </div>
                        <div>
                          <img src="https://picsum.photos/id/500/1000/400" />
                        </div>
                        <div>
                          <img src="https://picsum.photos/id/500/1000/400" />
                        </div>
                      </Carousel>
                    </div>
                    <div style={{ width: "100%", position: "relative" }}>
                      <div style={{ width: "68%" }}>
                        <p>نام کلاب</p>
                        <p style={{ fontWeight: "bold" }}>
                          {item.credit} تومان اعتبار هدیه با پرداخت {item.price} تومان
                          یا {item.point} امتیاز
                        </p>
                        <p>
                          امکان استفاده از :{" "}
                          {item.categories.map(item => item + " ,")}
                        </p>
                        <div>
                          <Button
                            style={{ margin: 8 }}
                            size="Large"
                            variant="outlined"
                            onClick={() => this.setState({ openProduct: true })}
                          >
                            مشاهده محصولات
                          </Button>
                          <p style={{ fontWeight: "bold", margin: 0 }}>
                            مهلت خرید: 10:10:10:10
                          </p>
                          <p
                            style={{
                              margin: 0,
                              textAlign: "left",
                              fontWeight: "lighter",
                              fontSize: 12
                            }}
                          >
                            {item.remaining} عدد باقی مانده
                          </p>
                        </div>
                      </div>
                      <Button
                        style={{
                          width: "30%",
                          position: "absolute",
                          height: "100%",
                          bottom: 0,
                          left: 0,
                          background: "#eaeaea"
                        }}
                      >
                        دریافت کد
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Dialog
          open={this.state.openProduct}
          onClose={() => {
            this.setState({
              openProduct: false
            });
          }}
          maxWidth="md"
        >
          <DialogTitle>
            محصولاتی که با این کارت اعتباری می توانید خرید کنید .
          </DialogTitle>
          <DialogContent>
            <Grid container direction="row" alignItems="center">
              {this.state.productList.map((item, i) => {
                return (
                  <div style={{ width: "20%", minWidth: 200 }}>
                    <Card style={{ margin: 5 }}>
                      <div>
                        <img src="https://picsum.photos/id/500/200/150" />
                      </div>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{
                            display: "inline-block",
                            float: "right",
                            marginBottom: 5
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{
                            display: "inline-block",
                            float: "left",
                            background: "#eaeaea",
                            marginBottom: 5
                          }}
                        >
                          {item.price} تومان
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  openProduct: false
                });
              }}
              color="secondary"
            >
              خروج
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}
export default CreditCardList;

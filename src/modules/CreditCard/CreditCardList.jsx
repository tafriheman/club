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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

class CreditCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      cartType: ""
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4">لیست کارت های اعتباری</Typography>
        <Grid item container style={{ marginTop: "20px" }} direction="column">
          <Card>
            <Grid item container xs={12} sm={12} md={12} direction="row">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>
                      کد اعتباری
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }} align="right">
                      محصولات
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }} align="right">
                      دسته ها
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }} align="right">
                      تاریخ پایان
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }} align="right">
                      تعداد
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      2x66FC
                    </TableCell>

                    <TableCell
                      style={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      ---
                    </TableCell>

                    <TableCell
                      style={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      ---
                    </TableCell>

                    <TableCell
                      style={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      15/8/1398
                    </TableCell>

                    <TableCell
                      style={{ textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      100
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
export default CreditCardList;

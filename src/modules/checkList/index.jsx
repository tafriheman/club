import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCheckList,
  checkListDelete,
  checkListAdd,
  checkListEdit,
  getParentCheckList
} from "../../redux/actions/checkList/checkListAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  TextField,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  FormControlLabel,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider
} from "@material-ui/core";
import SnackBar from "../../components/SnackBar";
import Style from "./style";
class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ParentCheckLists: [],
      checkLists: [],
      name: "",
      chekListName: "",
      activityType: "add",
      selectedItem: {},
      parentActivityType: "add",
      parentSelectedItem: {},
      ExpandDetailPanel: false,
      showDialog: false,
      showSnackBar: false,
      typeSnackBar: "",
      messageSnackBar: ""
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handlechangeCheckbox = (event, item) => {
    let newCheckList = {
      title: item.title,
      isChecked: event.target.checked
    };
    let index = this.state.checkLists.indexOf(item);
    let newCheckListArray = [...this.state.checkLists]; // create the copy of state array
    newCheckListArray[index] = newCheckList; //new value
    this.setState({ checkLists: newCheckListArray });
  };
  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };
  handleSubmitDialog = () => {
    const { club, token } = this.props;
    this.props.checkListDelete(
      this.state.parentSelectedItem._id,
      this.props.club._id,
      this.props.token,
      () => {
        this.props.getParentCheckList(club._id, token, () => {
          this.setState({
            ParentCheckLists: this.props.parentList.data,
            ExpandDetailPanel: false
          });
        });
      }
    );

    this.setState({ showDialog: false });
  };
  showSnackBar = (type, message) => {
    this.setState({
      showSnackBar: true,
      typeSnackBar: type,
      messageSnackBar: message
    });
  };
  static showSnackBars(type, message) {
    CheckList.setState({
      showSnackBar: true,
      typeSnackBar: type,
      messageSnackBar: message
    });
  }
  handleSnackBarClose = () => {
    this.setState({ showSnackBar: false });
  };
  handleSubmitClick = () => {
    const { club, token } = this.props;
    let title = this.state.name;
    if (this.state.parentActivityType === "add") {
      this.props.checkListAdd(
        { title: title, checkLists: this.state.checkLists },
        club._id,
        token,
        () => {
          this.props.getParentCheckList(club._id, token, () => {
            this.setState({ ParentCheckLists: this.props.parentList.data });
          });
        }
      );
      this.setState({
        activityType: "add",
        chekListName: "",
        name: "",
        checkLists: [],
        ExpandDetailPanel: false
      });
    } else {
      this.props.checkListEdit(
        { title: title, checkLists: this.state.checkLists },
        club._id,
        token,
        this.state.parentSelectedItem._id,
        () => {
          this.props.getParentCheckList(club._id, token, () => {
            this.setState({ ParentCheckLists: this.props.parentList.data });
          });
        }
      );
    }
    this.setState(
      {
        activityType: "add",
        chekListName: ""
      },
      () => {
        this.showSnackBar("success", "اطلاعات با موفقیت ثبت شد");
      }
    );
  };
  handleKeyPress = event => {
    if (event.charCode == 13) {
      if (this.state.activityType === "add") {
        let newCheckList = {
          title: event.target.value,
          isChecked: false
        };
        this.setState({
          checkLists: [...this.state.checkLists, newCheckList],
          chekListName: ""
        });
      } else {
        let newCheckList = {
          title: event.target.value
        };
        let index = this.state.checkLists.indexOf(this.state.selectedItem);
        let newCheckListArray = [...this.state.checkLists]; // create the copy of state array
        newCheckListArray[index] = newCheckList; //new value
        this.setState({ checkLists: newCheckListArray });
      }
    }
  };

  componentWillMount() {
    const { token, club, getParentCheckList } = this.props;
    getParentCheckList(club._id, token, () => {
      this.setState({ ParentCheckLists: this.props.parentList.data });
    });
  }

  render() {
    return (
      <div className="sectin__container" style={{ display: "flex" }}>
        <div
          className="sectin__divContainer"
          style={{
            maxHeight: 800,
            overflowY: "auto",
            width: "33%"
          }}
        >
          <ExpansionPanel expanded>
            <ExpansionPanelSummary>
              <Typography variant="h6">عناوین</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                {this.props.loading ? (
                  <LinearProgress style={{ margin: "10px AUTO" }} />
                ) : (
                  this.state.ParentCheckLists.map(item => (
                    <div>
                      <div
                        id={item._id}
                        key={item._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 10
                        }}
                      >
                        <div>
                          <Typography style={{ margin: 15 }}>
                            {item.title}
                          </Typography>
                        </div>
                        <div>
                          <IconButton
                            component="span"
                            onClick={() => {
                              this.setState(
                                {
                                  ExpandDetailPanel: true,
                                  parentActivityType: "edit",
                                  parentSelectedItem: item
                                },
                                () => {
                                  this.setState({
                                    checkLists: this.state.parentSelectedItem
                                      .checkLists,
                                    name: this.state.parentSelectedItem.title
                                  });
                                }
                              );
                            }}
                          >
                            <EditIcon
                              style={{
                                marginTop: 0,
                                color: "#000"
                              }}
                            />
                          </IconButton>
                          <IconButton
                            component="span"
                            onClick={() => {
                              this.setState({
                                showDialog: true,
                                parentSelectedItem: item
                              });
                            }}
                          >
                            <DeleteIcon
                              style={{
                                marginTop: 0,
                                color: "#000"
                              }}
                            />
                          </IconButton>
                        </div>
                      </div>
                      {/* <Divider /> */}
                    </div>
                  ))
                )}
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "left", margin: "20px 0" }}
                    onClick={() => {
                      this.setState({
                        ExpandDetailPanel: true,
                        checkLists: [],
                        name: ""
                      });
                    }}
                  >
                    افزودن
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div
          style={{
            maxHeight: 800,
            overflowY: "auto",
            width: "67%"
          }}
          className="sectin__divContainer"
        >
          <ExpansionPanel expanded={this.state.ExpandDetailPanel}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">چک لیست ها</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                <div>
                  <TextField
                    label="عنوان"
                    onChange={this.handleChange("name")}
                    value={this.state.name}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      style: {
                        left: "auto",
                        right: "0"
                      }
                    }}
                  />
                </div>
                {this.props.loading ? (
                  <LinearProgress style={{ margin: "100px AUTO" }} />
                ) : (
                  this.state.checkLists.map((item, index) => (
                    <div
                      id={item._id}
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}
                    >
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={item.isChecked}
                              onChange={e => this.handlechangeCheckbox(e, item)}
                              value={item._id}
                            />
                          }
                          label={item.title}
                        />
                      </div>
                      <div>
                        <IconButton
                          component="span"
                          onClick={() => {
                            this.setState({
                              chekListName: item.title,
                              activityType: "edit",
                              selectedItem: item
                            });
                          }}
                        >
                          <EditIcon
                            style={{
                              marginTop: 0,
                              color: "#000"
                            }}
                          />
                        </IconButton>
                        <IconButton
                          component="span"
                          onClick={() => {
                            var newList = this.state.checkLists.filter(
                              x => x._id !== item._id
                            );
                            this.setState({ checkLists: newList });
                          }}
                        >
                          <DeleteIcon
                            style={{
                              marginTop: 0,
                              color: "#000"
                            }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  ))
                )}

                <div style={{ marginTop: 10, display: "flex" }}>
                  <div style={{ width: "30%" }}>
                    <Button color="primary" onClick={() => {}}>
                      <AddCircleIcon
                        style={{
                          marginLeft: 10
                        }}
                      />
                      افزودن به چک لیست
                    </Button>
                  </div>
                  <div style={{ width: "70%" }}>
                    <TextField
                      autoFocus
                      ref={x => (this.chekListNameText = x)}
                      onKeyPress={e => this.handleKeyPress(e)}
                      onChange={this.handleChange("chekListName")}
                      value={this.state.chekListName}
                      style={{ width: "100%" }}
                      placeholder="افزودن چک لیست جدید"
                      InputLabelProps={{
                        style: {
                          left: "auto",
                          right: "0"
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "left", margin: "20px 0" }}
                    onClick={this.handleSubmitClick}
                  >
                    ثبت
                    <SaveIcon />
                  </Button>
                </div>
                <Dialog
                  open={this.state.showDialog}
                  onClose={this.handleCloseDialog}
                >
                  <DialogTitle id="draggable-dialog-title">
                    حذف چک لیست
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      ایا مایل به حذف این چک لیست هستید؟
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                      خیر
                    </Button>
                    <Button onClick={this.handleSubmitDialog} color="primary">
                      بلی
                    </Button>
                  </DialogActions>
                </Dialog>
                <SnackBar
                  show={this.state.showSnackBar}
                  type={this.state.typeSnackBar}
                  message={this.state.messageSnackBar}
                  onClose={this.handleSnackBarClose}
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ app, checkList }) => {
  return { ...app, ...checkList };
};

export default connect(
  mapStateToProps,
  {
    checkListAdd,
    getCheckList,
    checkListDelete,
    checkListEdit,
    getParentCheckList
  }
)(CheckList);

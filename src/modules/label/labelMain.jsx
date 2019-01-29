import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getLabel,
  labelDelete,
  labelAdd,
  labelEdit
} from "../../redux/actions/label/labelAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import {
  Button,
  TextField,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import MaterialColorPicker from "react-material-color-picker";
class LabelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "red",
      showColorPicker: false,
      activityType: "add",
      selectedItem: {},
      showDialog: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  submitColor = e => {
    this.setState({ color: e.target.value, showColorPicker: false });
  };
  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };
  handleSubmitDialog = () => {
    this.props.labelDelete(
      this.state.selectedItem._id,
      this.props.club._id,
      this.props.token,
      this.props.getLabel
    );
    this.setState({ showDialog: false });
  };
  componentWillMount() {
    const { token, club, getLabel } = this.props;
    getLabel(club._id, token);
  }

  render() {
    const { club, token } = this.props;

    return (
      <div>
        <div>
          <div style={{ width: "80%", margin: "auto" }}>
            {this.state.showColorPicker && (
              <MaterialColorPicker
                initColor="rgba(0, 0, 0, 0.26)"
                onSubmit={this.submitColor}
                style={{
                  width: 400,
                  backgroundColor: "#c7c7c7",
                  marginTop: 20
                }}
                submitLabel="انتخاب"
                resetLabel=""
              />
            )}
            <div
              onClick={() =>
                this.setState({
                  showColorPicker: !this.state.showColorPicker
                })
              }
              style={{
                width: 50,
                height: 50,
                backgroundColor: this.state.color
              }}
            />
            <TextField
              fullWidth
              label="عنوان"
              onChange={this.handleChange("name")}
              value={this.state.name}
              InputLabelProps={{
                style: {
                  left: "auto",
                  right: "0"
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ float: "left", margin: "20px 0" }}
              onClick={() => {
                let labelName = this.state.name;
                let colorName = this.state.color;
                if (this.state.activityType === "add") {
                  this.props.labelAdd(
                    { title: labelName, color: colorName },
                    club._id,
                    token,
                    this.props.getLabel
                  );
                } else {
                  this.props.labelEdit(
                    { title: labelName, color: colorName },
                    club._id,
                    token,
                    this.state.selectedItem._id,
                    this.props.getLabel
                  );
                  this.setState({
                    activityType: "add",
                    name: "",
                    color: "red"
                  });
                }
              }}
            >
              ثبت
              <SaveIcon />
            </Button>
          </div>
          <div>
            {this.props.loading ? (
              <LinearProgress style={{ margin: "100px AUTO", width: "80%" }} />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "80%",
                  margin: "100px auto",
                  flexWrap: "wrap"
                }}
              >
                {this.props.list.data.length > 0 &&
                  this.props.list.data.map(item => (
                    <div
                      id={item._id}
                      key={item._id}
                      style={{
                        width: 100,
                        height: 100,
                        backgroundColor: item.color,
                        textAlign: "center",
                        color: "rgba(0,0,0,0.8)",
                        margin: 10,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflow: "hidden"
                      }}
                    >
                      {item.title}
                      <div>
                        <IconButton
                          component="span"
                          onClick={() => {
                            this.setState({
                              showDialog: true,
                              selectedItem: item
                            });
                          }}
                        >
                          <DeleteIcon color="black" style={{ marginTop: 0 }} />
                        </IconButton>
                        <IconButton
                          component="span"
                          onClick={() => {
                            this.setState({
                              color: item.color,
                              name: item.title,
                              activityType: "edit",
                              selectedItem: item
                            });
                          }}
                        >
                          <EditIcon color="black" style={{ marginTop: 0 }} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <Dialog open={this.state.showDialog} onClose={this.handleCloseDialog}>
          <DialogTitle id="draggable-dialog-title">حذف بر چسب</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ایا مایل به حذف این برچسب هستید؟
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
      </div>
    );
  }
}

const mapStateToProps = ({ app, label }) => {
  return { ...app, ...label };
};

export default connect(
  mapStateToProps,
  {
    labelAdd,
    getLabel,
    labelDelete,
    labelEdit
  }
)(LabelList);

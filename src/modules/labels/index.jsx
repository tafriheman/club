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
import SnackBar from "../../components/SnackBar";
import { SketchPicker } from "react-color";
class LabelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "#fff",
      showColorPicker: false,
      activityType: "add",
      selectedItem: {},
      showDialog: false,
      showIcon: false,
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
  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };
  handleSubmitDialog = () => {
    this.props.labelDelete(
      this.state.selectedItem._id,
      this.props.club._id,
      this.props.token,
      { isDeleted: true },
      () => {
        this.props.getLabel(this.props.club._id, this.props.token);
      }
    );
    this.setState({ showDialog: false });
  };
  handleChangeComplete = color => {
    this.setState({ color: color.hex });
  };
  showSnackBar = (type, message) => {
    this.setState({
      showSnackBar: true,
      typeSnackBar: type,
      messageSnackBar: message
    });
  };
  handleSnackBarClose = () => {
    this.setState({ showSnackBar: false });
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
              <SketchPicker
                color={this.state.color}
                onChangeComplete={this.handleChangeComplete}
              />
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                onClick={() =>
                  this.setState({
                    showColorPicker: !this.state.showColorPicker
                  })
                }
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: this.state.color,
                  marginLeft: 20,
                  marginTop: 20,
                  cursor: "pointer",
                  borderRadius: 5,
                  border: "rgba(0,0,0,0.6) thin solid "
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
            </div>
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
                    () => {
                      this.props.getLabel(club._id, token);
                    }
                  );
                } else {
                  this.props.labelEdit(
                    { title: labelName, color: colorName },
                    club._id,
                    token,
                    this.state.selectedItem._id,
                    () => {
                      this.props.getLabel(club._id, token);
                    }
                  );
                }
                this.setState(
                  {
                    activityType: "add",
                    name: "",
                    color: "#fff",
                    showColorPicker: false
                  },
                  () => {
                    this.showSnackBar("success", "اطلاعات با موفقیت ثبت شد");
                  }
                );
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
                  flexWrap: "wrap",
                  alignItems: "flex-start"
                }}
              >
                {this.props.list.data.length > 0 &&
                  this.props.list.data.map(item => (
                    <div
                      id={item._id}
                      key={item._id}
                      style={{
                        width: 100,
                        backgroundColor: item.color,
                        textAlign: "center",
                        color: "rgba(0,0,0,0.8)",
                        margin: 10,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflow: "hidden",
                        borderRadius: 10,
                        verticalAlign: "middle"
                      }}
                    >
                      {item.title}
                      <div style={{ marginTop: 10 }}>
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
        <SnackBar
          show={this.state.showSnackBar}
          type={this.state.typeSnackBar}
          message={this.state.messageSnackBar}
          onClose={this.handleSnackBarClose}
        />
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

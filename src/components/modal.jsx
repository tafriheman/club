import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  Divider,
  Icon
} from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

class CustomModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    disableButton: false
  };

  render() {
    const { onOpen, onClose, onSubmit, title, activityType } = this.props;
    return (
      <div dir="rtl">
        <Dialog
          open={onOpen}
          onClose={onClose}
          fullWidth
          maxWidth={this.props.size}
        >
          <Paper className="paperHeaderModal">
            <DialogTitle dir="rtl">
              {activityType === "add" && (
                <div>
                  <Icon style={{ float: "left", color: "#FFF" }}>
                    library_add
                  </Icon>
                  <Typography className="white" variant="subheading">
                    {title}
                  </Typography>
                </div>
              )}

              {activityType === "delete" && (
                <div>
                  <Icon style={{ float: "left", color: "#FFF" }}>
                    delete_forever
                  </Icon>
                  <Typography className="white" variant="subheading">
                    حذف {title}
                  </Typography>
                </div>
              )}
            </DialogTitle>
          </Paper>
          <DialogContent dir="rtl">{this.props.children}</DialogContent>
          <Divider />
          {this.props.action && (
            <DialogActions dir="rtl">
              <Button
                onClick={this.onSubmit}
                color="primary"
                disabled={this.state.disableButton}
              >
                تایید
                {this.props.loading ? (
                  <CircularProgress style={{ width: 20, height: 20 }} />
                ) : (
                  ""
                )}
              </Button>

              <Button onClick={onClose} color="primary" autoFocus>
                بازگشت
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </div>
    );
  }

  onSubmit = () => {
    this.props.onSubmit();
  };
}

export default CustomModal;

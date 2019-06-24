import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel } from "@material-ui/core";

class SimpleSelect extends React.Component {
  state = {
    value: this.props.value,
    change: false,
    showLabel: true
  };
  //   componentWillMount() {
  //     this.setState({ value: this.props.values });
  //   }
  componentWillReceiveProps(nextProps) {
    if (this.state.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.values === "") {
      if (state.change) {
        state.value = state.value;
      } else {
        state.value = "";
        state.showLabel = true;
      }
    } else {
      if (state.change) {
        state.value = state.value;
      } else {
        state.value = props.values;
      }
    }
    state.change = false;
    return null;
  }
  handleChange = event => {
    let value = event.target.value.substr(0, event.target.value.search("&"));
    let id = event.target.value.substr(
      event.target.value.search("&") + 1,
      event.target.value.length
    );
    this.setState({ value: value, change: true });

    let data = this.props.data;
    for (var key in data) {
      if (data[key]._id === id) {
        this.props.onChangeValue(data[key]);
        this.setState({ showLabel: false });
      }
    }
  };

  render() {
    const { label, data } = this.props;
    return (
      <FormControl style={{ width: "100%" }}>
        <InputLabel
          htmlFor="age-native-simple"
          style={{ left: "auto", right: 20 }}
        >
          {this.props.values
            ? ""
            : this.state.showLabel
              ? this.props.label
              : ""}
        </InputLabel>
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          renderValue={value => `${value}`}
        >
          {data.map(option => (
            <MenuItem
              style={{ direction: "rtl" }}
              key={option._id}
              value={option.title + "&" + option._id}
            >
              {option.title}
            </MenuItem>
          ))}
          }
        </Select>
      </FormControl>
    );
  }
}

export default SimpleSelect;

import React, { Component } from "react";
import { List, ListItem, Typography, TextField } from "@material-ui/core";

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showList: false,
      list: [],
      listIndex: 0,
      selectedItem: {},
      selfChange: false
    };
  }
  textChange = e => {
    const target = this.props.target;
    let value = e.target.value;
    const { data } = this.props;
    let fetchList = [];
    this.setState({ text: value, showList: true, selfChange: true }, () => {
      data.map(item => {
        if (item[target].includes(value)) {
          fetchList.push(item);
        }
      });
      this.setState({ list: fetchList });
    });
  };
  clickList = item => {
    this.setState({
      text: item[this.props.target],
      showList: false
    });
    this.props.handleSelect(item);
  };
  textKeyDown = e => {
    if (e.keyCode == "38") {
      this.setState({
        listIndex:
          this.state.listIndex > 0
            ? this.state.listIndex - 1
            : this.state.list.length - 1
      });
    } else if (e.keyCode == "40") {
      this.setState({
        listIndex:
          this.state.listIndex < this.state.list.length - 1
            ? this.state.listIndex + 1
            : 0
      });
    } else if (e.keyCode == "13") {
      this.list.props.children.map(item => {
        if (item.props.selected) {
          this.setState(
            {
              text: item.props.children.props.children,
              selectedItem: item.props.item,
              showList: false
            },
            () => {
              this.props.handleSelect(this.state.selectedItem);
            }
          );
        }
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultValue !== state.text) {
      if (state.selfChange) {
        return {
          text: state.text
        };
      } else {
        return {
          text: props.defaultValue
        };
      }
    }
    return null;
  }

  render() {
    return (
      <div>
        <TextField
          placeholder="انتخاب مشتری"
          style={{ width: "100%" }}
          InputLabelProps={{
            style: {
              left: "auto",
              right: "0"
            }
          }}
          onChange={this.textChange}
          value={this.state.text}
          onKeyDown={this.textKeyDown}
        />
        {this.state.showList && (
          <List
            ref={ref => (this.list = ref)}
            style={{
              position: "absolute",
              width: " 100%",
              zIndex: 10000,
              backgroundColor: "white"
            }}
          >
            {this.state.list.map((item, index) => (
              <ListItem
                divider
                selected={this.state.listIndex === index}
                key={index}
                id={item._id}
                item={item}
                button
                onClick={() => this.clickList(item)}
              >
                <Typography>{item[this.props.target]}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );
  }
}

export default AutoComplete;

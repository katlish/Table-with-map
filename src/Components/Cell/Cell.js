import React from "react";

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  setActive = bool => {
    this.props.onItemActive(this.props.item);
    this.props.onClick(this.props.item);
  };

  render() {
    let item = this.props.item;
    return (
      <li
        style={
          this.props.active
            ? { backgroundColor: "#007aff", color: "white" }
            : null
        }
        onClick={this.setActive}
      >
        {item}
      </li>
    );
  }
}

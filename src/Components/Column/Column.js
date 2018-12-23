import React, { Component } from "react";
import Cell from "../Cell/Cell";
import "./Column.css";

export default class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    };
  }

  onItemActive = item => {
    this.setState({ activeItem: item });
  };

  getCells = () => {
    let cells = [];

    if (this.props.items) {
      this.props.items.map((item, key) => {
        cells.push(
          <Cell
            key={key}
            item={item}
            onItemActive={this.onItemActive}
            active={item === this.state.activeItem}
            onClick={() => {
              this.props.updateState(item);
            }}
          />
        );
      });
    }
    return cells;
  };

  render() {
    return (
      <div className={this.props.width ? "Column Map" : "Column"}>
        <div className="title">{this.props.title}</div>
        <div className="divider" />
        <ul className={this.props.width ? "Map" : null}>
          {this.getCells()}
          {this.props.children}
        </ul>
      </div>
    );
  }
}

import React, { Component } from "react";

const MY_API = "AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.getMap = this.getMap.bind(this);
  }

  getMap = () => {
    let address = this.props.address;
    let _url = `https://www.google.com/maps/embed/v1/place?key=${MY_API}&q=${address}`;
    let map = [];

    if (address) {
      map = (
        <iframe
          id="map"
          frameBorder="0"
          width="92%"
          height="98%"
          scrolling="no"
          src={_url}
        />
      );
    } else {
      map = <h1> Please select a company </h1>;
    }
    return map;
  };

  render() {
    return <>{this.getMap()}</>;
  }
}

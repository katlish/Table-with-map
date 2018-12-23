import React, { Component } from "react";
import Geocode from "react-geocode";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MY_API: "AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk",
      address: props.address,
      center: {}
    };
  }

  shouldComponentUpdate(nextprops) {
    if (nextprops.address) {
      return true;
    } else {
      return false;
    }
  }

  async componentWillReceiveProps(nextprops) {
    const center = await this.getCenter(nextprops.address);
    this.setState({
      center: center,
      address: nextprops.address
    });
  }

  getCenter = address => {
    Geocode.setApiKey(this.state.MY_API);

    return Geocode.fromAddress(address).then(
      response => response.results[0].geometry.location
    );
  };

  getMap = () => {
    if (this.state.center) {
      const _url = `https://www.google.com/maps/embed/v1/place?key=${
        this.state.MY_API
      }&q=${this.state.center.lat},${this.state.center.lng}`;
      return (
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
      return <h1> Place does not found :/ </h1>;
    }
  };

  render() {
    return <>{this.getMap()}</>;
  }
}

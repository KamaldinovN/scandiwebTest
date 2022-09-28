import React, { Component } from "react";
import Color from "../Color/Color";
import Capacity from "../Capacity/Capacity";
import Ports from "../Ports/Ports";
import TouchId from "../TouchId/TouchId";
import Size from "../Size/Size";

class Attributes extends Component {
  isSize(arr) {
    if (arr.find((obj) => obj.name === "Size")) {
      let index = arr.findIndex((elem) => elem.name === "Size");
      return <Size arr={arr[index]} setSize={this.setSize} />;
    }
  }
  isColor(arr) {
    if (arr.find((obj) => obj.name === "Color")) {
      let index = arr.findIndex((elem) => elem.name === "Color");
      return <Color arr={arr[index]} setColor={this.setColor} />;
    }
  }
  isCapacity(arr) {
    if (arr.find((obj) => obj.name === "Capacity")) {
      let index = arr.findIndex((elem) => elem.name === "Capacity");
      return <Capacity arr={arr[index]} setCapacity={this.setCapacity} />;
    }
  }
  isPort(arr) {
    if (arr.find((obj) => obj.id === "With USB 3 ports")) {
      let index = arr.findIndex((elem) => elem.name === "With USB 3 ports");
      return <Ports arr={arr[index]} setPort={this.setPort} />;
    }
  }
  isTouchId(arr) {
    if (arr.find((obj) => obj.id === "Touch ID in keyboard")) {
      let index = arr.findIndex((elem) => elem.name === "Touch ID in keyboard");
      return <TouchId arr={arr[index]} setTouch={this.setTouch} />;
    }
  }

  render() {
    return (
      <>
        {this.isSize(this.props.attributes)}
        {this.isColor(this.props.attributes)}
        {this.isCapacity(this.props.attributes)}
        {this.isPort(this.props.attributes)}
        {this.isTouchId(this.props.attributes)}
      </>
    );
  }
}
export default Attributes;

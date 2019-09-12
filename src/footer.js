import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div
        className="blueRect footer"
        style={{
          position: "absolute",
          textAlign: "center",
          bottom: "0",
          textShadow: "1px 1px 5px rgba(0,0,0,00.2)"
        }}
      >
        <p>Country search by Emil, 2019</p>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export class Footer extends Component {
  reset = () => {
    this.props.resetDetails({
      instructor: "",
      duration: "",
      class: "",
      date: "",
    });
  };
  render() {
    return (
      <div style={{ padding: "100px 0 25px 0" }}>
        <Button icon="print" color="green" content="Print" />
        <Button icon="save" color="blue" content="Save" />
        <Button
          onClick={this.reset}
          icon="undo alternate"
          color="red"
          content="Reset"
        />
      </div>
    );
  }
}

export default Footer;

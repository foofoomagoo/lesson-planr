import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: "",
      class: "",
      date: "",
      duration: "",
    };
  }

  handleChange = (e) => {
    const thisId = e.target.id;
    this.setState({ [thisId]: e.target.value });
    this.props.getInfo(e.target.value);
  };
  render() {
    return (
      <div className="details-container">
        <h3>Class Details</h3>
        <div className="detail-box">
          <div className="detail-input">
            <Input
              id="instructor"
              onChange={this.handleChange}
              transparent
              fluid
              placeholder="Instructor"
              value={this.state.instructor}
            />
          </div>
          <div className="detail-input">
            <Input
              id="class"
              onChange={this.handleChange}
              transparent
              fluid
              placeholder="Class Name"
              value={this.state.class}
            />
          </div>
        </div>
        <div className="detail-box" style={{ justifyContent: "flex-start" }}>
          <div
            className="detail-input"
            style={{ width: "auto", marginRight: "20px" }}
          >
            {/* <SemanticDatepicker
              id="date"
              transparent
              placeholder="Date"
              value={this.props.giveDetails.date}
            /> */}
            <Input
              id="date"
              onChange={this.handleChange}
              transparent
              placeholder="DD/MM/YYYY"
              value={this.state.date}
            />
          </div>
          <div className="detail-input" style={{ width: "auto" }}>
            <Input
              id="duration"
              onChange={this.handleChange}
              transparent
              placeholder="Duration"
              value={this.state.duration}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Details;

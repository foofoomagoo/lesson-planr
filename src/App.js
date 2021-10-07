import "./App.css";
import React, { Component } from "react";
import { Input, Button, Popup } from "semantic-ui-react";
import * as htmlToImage from "html-to-image";
import downloadjs from "downloadjs";

import Task from "./components/task";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        instructor: "",
        class: "",
        date: "",
        duration: "",
      },
      firstTask: {
        id: 0,
        rotation: "",
        duration: "",
        tasks: "",
        equipment: "",
      },
      addedTasks: [],
    };
  }

  updateInput = (id, r, e) => {
    this.setState((prevState) => ({
      addedTasks: prevState.addedTasks.map((el) =>
        el.id === id ? { ...el, [r]: e } : el
      ),
    }));
    console.log(this.state.addedTasks);
  };

  handleChange = (e) => {
    const thisId = e.target.id;
    // this.setState({ [thisId]: e.target.value });
    this.setState((prevState) => ({
      details: { ...prevState.details, [thisId]: e.target.value },
    }));
  };

  createTask = () => {
    if (this.state.addedTasks.length <= 10) {
      const joined = this.state.addedTasks.concat({
        id: this.state.addedTasks.length + 1,
        rotation: "",
        duration: "",
        goals: "",
        tasks: "",
        equipment: "",
      });
      this.setState({ addedTasks: joined });
    }
  };

  renderTasks = () => {
    var taskArray = [];
    const tasks = this.state.addedTasks;

    for (var i = 0; i < tasks.length; i++) {
      taskArray.push(
        <Task
          key={i}
          taskId={i + 1}
          taskInfo={this.state.addedTasks[i]}
          updateInfo={this.updateInput}
          onDelete={this.deleteTask}
        />
      );
    }

    return taskArray;
  };

  reset = () => {
    this.setState((prevState) => ({
      details: { instructor: "", class: "", duration: "", date: "" },
      firstTask: {
        rotation: "",
        duration: "",
        tasks: "",
        equipment: "",
        goals: "",
      },
    }));
    this.setState({ addedTasks: [] });
  };

  updateTask = (id, e) => {
    this.setState((prevState) => ({
      firstTask: { ...prevState.firstTask, [id]: e },
    }));
  };

  deleteTask = (e) => {
    const array = [...this.state.addedTasks];
    array.splice(e - 1, 1);
    this.setState({ addedTasks: array });
  };

  saveImage = () => {
    htmlToImage
      .toPng(document.getElementById("planr-container"))
      .then(function (dataUrl) {
        downloadjs(dataUrl, "my-node.png");
      });
  };
  render() {
    return (
      <div className="App">
        <div id="planr-content" className="planr-container">
          {/* DETAILS */}
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
                  value={this.state.details.instructor}
                />
              </div>
              <div className="detail-input">
                <Input
                  id="class"
                  onChange={this.handleChange}
                  transparent
                  fluid
                  placeholder="Class Name"
                  value={this.state.details.class}
                />
              </div>
            </div>
            <div
              className="detail-box"
              style={{ justifyContent: "flex-start" }}
            >
              <div
                className="detail-input"
                style={{ width: "auto", marginRight: "20px" }}
              >
                <Input
                  id="date"
                  onChange={this.handleChange}
                  transparent
                  placeholder="DD/MM/YYYY"
                  value={this.state.details.date}
                />
              </div>
              <div className="detail-input" style={{ width: "auto" }}>
                <Input
                  id="duration"
                  onChange={this.handleChange}
                  transparent
                  placeholder="Duration"
                  value={this.state.details.duration}
                />
              </div>
            </div>
          </div>
          {/* TASKS */}
          <div className="task-container">
            <h3>Tasks</h3>
            <Task
              taskId={0}
              taskInfo={this.state.firstTask}
              updateInfo={this.updateTask}
            />
            {this.renderTasks()}
            <Popup
              content="Add new rotation"
              trigger={
                <Button
                  id="add-task-btn"
                  onClick={this.createTask}
                  icon="plus"
                  color="grey"
                ></Button>
              }
            />
          </div>
          <div className="planr-btns" style={{ padding: "100px 0 25px 0" }}>
            <Button
              onClick={() => window.print()}
              icon="print"
              color="green"
              content="Print"
            />
            <Button
              id="save-img"
              onClick={this.saveImage}
              icon="save"
              color="blue"
              content="Save"
              download
            />
            <Button
              onClick={this.reset}
              icon="undo alternate"
              color="red"
              content="Reset"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

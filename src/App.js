import "./App.css";
import React, { Component } from "react";
import { Input, Button, Popup, Icon } from "semantic-ui-react";
import downloadjs from "downloadjs";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import Task from "./components/task";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: 0,
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

  initialize = (e) => {
    this.setState({ init: 1 });
  };

  updateInput = (id, r, e) => {
    this.setState((prevState) => ({
      addedTasks: prevState.addedTasks.map((el) =>
        el.id === id ? { ...el, [r]: e } : el
      ),
    }));
  };

  handleChange = (e) => {
    const thisId = e.target.id;

    this.setState((prevState) => ({
      details: { ...prevState.details, [thisId]: e.target.value },
    }));
  };

  createTask = () => {
    if (this.state.addedTasks.length < 10) {
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

    let tasks = this.state.addedTasks;

    for (var i = 0; i < tasks.length; i++) {
      taskArray.push(
        <Task
          key={i}
          taskId={i + 1}
          taskInfo={this.state.addedTasks[i]}
          updateInfo={this.updateInput}
          onDelete={this.deleteTask}
          moveTask={this.moveTask}
          taskLength={this.state.addedTasks.length}
          init={this.state.init}
        />
      );
    }

    return taskArray;
  };

  reset = () => {
    this.setState(() => ({
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

  moveTask = (e, d) => {
    let direction = d;

    let taskArray = this.state.addedTasks;
    console.log(taskArray.length);

    let thisId = e - 1;

    let prevId = thisId - 1;
    let nextId = thisId + 1;
    let temp = this.state.addedTasks[thisId];

    if (direction === "up" && prevId !== -1) {
      taskArray[thisId] = taskArray[prevId];
      taskArray[prevId] = temp;
    } else if (direction === "down" && nextId !== taskArray.length) {
      taskArray[thisId] = taskArray[nextId];
      taskArray[nextId] = temp;
    }

    this.setState({ addedTasks: taskArray });
  };

  render() {
    return (
      <div className="App">
        <div className="version">
          <small>Version 1.0.0</small>
        </div>
        <div
          className={
            !this.state.init
              ? "splash-container"
              : "splash-container splash-visible"
          }
        >
          <div className="splash">
            <h1>Lesson Planr</h1>
            <br />
            <Button
              id="get-started-btn"
              disabled={this.props.init && "disabled"}
              inverted
              onClick={this.initialize}
            >
              Start Your Plan
            </Button>
          </div>
        </div>
        <div className="planr-clear"></div>
        <div
          id="planr-content"
          className={
            !this.state.init
              ? "planr-container"
              : "planr-container planr-visible"
          }
        >
          {/* DETAILS */}
          <div className="details-container">
            <h3>Class Details</h3>
            <div className="detail-box">
              <div className="detail-input">
                <Input
                  id="instructor"
                  disabled={!this.state.init && "disabled"}
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
                  disabled={!this.state.init && "disabled"}
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
                <SemanticDatepicker
                  onChange={(event, data) =>
                    this.setState((prevState) => ({
                      details: { ...prevState.details, date: data.value },
                    }))
                  }
                  id="date"
                  disabled={!this.state.init && "disabled"}
                  transparent
                  placeholder="Date"
                  value={this.state.details.date}
                />
              </div>
              <div className="detail-input" style={{ width: "auto" }}>
                <Input
                  id="duration"
                  disabled={!this.state.init && "disabled"}
                  onChange={this.handleChange}
                  transparent
                  placeholder="Class Length"
                  value={this.state.details.duration}
                />
              </div>
            </div>
          </div>
          {/* TASKS */}
          <div className="task-container">
            <h3>Rotations</h3>
            <Task
              taskId={0}
              taskInfo={this.state.firstTask}
              updateInfo={this.updateTask}
              taskLength={0}
              init={this.state.init}
            />
            {this.renderTasks()}

            <Popup
              content="Add new rotation"
              disabled
              trigger={
                <Button
                  icon
                  disabled={!this.state.init && "disabled"}
                  circular
                  onClick={this.createTask}
                  id="add-task-btn"
                >
                  <Icon name="plus" />
                </Button>
              }
            />
          </div>
          <div className="planr-btns" style={{ padding: "100px 0 25px 0" }}>
            <Button
              onClick={() => window.print()}
              icon="print"
              color="green"
              content="Print"
              disabled={!this.state.init && "disabled"}
            />

            <Button
              onClick={this.reset}
              disabled={!this.state.init ? "disabled" : ""}
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

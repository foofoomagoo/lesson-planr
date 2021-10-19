import "./App.css";
import React, { Component } from "react";
import { Input, Button, Popup, Icon } from "semantic-ui-react";
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
      tasks: [
        {
          id: 0,
          goals: "",
          rotation: "",
          duration: "",
          tasks: "",
          equipment: "",
        },
      ],
    };
  }

  // Fires when the 'Get Started' button is clicked.
  // Fades the lesson plan
  initialize = (e) => {
    this.setState({ init: 1 });
  };

  // Updates the state of the tasks
  updateInput = (id, r, e) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((el) =>
        el.id === id ? { ...el, [r]: e } : el
      ),
    }));
  };

  // Updates the details information
  handleChange = (e) => {
    const thisId = e.target.id;

    this.setState((prevState) => ({
      details: { ...prevState.details, [thisId]: e.target.value },
    }));
  };

  // Fires when the user creates a new task
  // Adds a blank task to the 'addedTasks' state
  createTask = () => {
    if (this.state.tasks.length < 10) {
      const joined = this.state.tasks.concat({
        id: this.state.tasks.length,
        rotation: "",
        duration: "",
        goals: "",
        tasks: "",
        equipment: "",
      });
      this.setState({ tasks: joined });
    }
  };

  // Renders out all the added tasks from the state
  renderTasks = () => {
    var taskArray = [];

    let tasks = this.state.tasks;

    for (var i = 0; i < tasks.length; i++) {
      let getIndex = tasks.indexOf(tasks[i]);
      taskArray.push(
        <Task
          key={i}
          taskId={i}
          taskPosition={getIndex}
          taskInfo={this.state.tasks[i]}
          updateInfo={this.updateInput}
          onDelete={this.deleteTask}
          moveTask={this.moveTask}
          taskLength={this.state.tasks.length}
          init={this.state.init}
        />
      );
    }

    return taskArray;
  };

  // Resets the whole app
  reset = () => {
    this.setState(() => ({
      details: { instructor: "", class: "", duration: "", date: "" },
    }));
    this.setState({
      tasks: [{ id: 0, goals: "", rotation: "", tasks: "", equipment: "" }],
    });
  };

  // Updates the first task
  updateTask = (id, e) => {
    this.setState((prevState) => ({
      firstTask: { ...prevState.firstTask, [id]: e },
    }));
  };

  // Deletes selected task
  deleteTask = (e) => {
    const array = [...this.state.tasks];
    array.splice(e, 1);
    this.setState({ tasks: array });
  };

  // Moves selected task either up or down the list
  moveTask = (e, d) => {
    let direction = d;

    let taskArray = this.state.tasks; // Creates an array of the addedTasks state

    let thisId = e;

    let prevId = thisId - 1;
    let nextId = thisId + 1;
    let temp = this.state.tasks[thisId];

    if (direction === "up" && prevId !== -1) {
      taskArray[thisId] = taskArray[prevId];
      taskArray[prevId] = temp;
    } else if (direction === "down" && nextId !== taskArray.length) {
      taskArray[thisId] = taskArray[nextId];
      taskArray[nextId] = temp;
    }

    this.setState({ tasks: taskArray });
  };

  render() {
    return (
      <div className="App">
        <div className="version">
          <small>Version 1.0.1</small>
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
            <Button id="get-started-btn" inverted onClick={this.initialize}>
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
                  disabled={!this.state.init}
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
                  disabled={!this.state.init}
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
                  disabled={!this.state.init}
                  transparent
                  placeholder="Date"
                  value={this.state.details.date}
                />
              </div>
              <div className="detail-input" style={{ width: "auto" }}>
                <Input
                  id="duration"
                  disabled={!this.state.init}
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
            {this.renderTasks()}

            <Popup
              content="Add new rotation"
              disabled
              trigger={
                <Button
                  icon
                  disabled={!this.state.init}
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
              disabled={!this.state.init}
            />

            <Button
              onClick={this.reset}
              disabled={!this.state.init}
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

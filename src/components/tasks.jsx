import React, { Component } from "react";
import { Icon, Popup } from "semantic-ui-react";

import Task from "./task";
// import { Editor, EditorState } from "draft-js";

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      numTasks: 1,
      tasks: [{}],
    };
  }

  removeRotation = (e) => {
    if (this.state.numTasks > 1 && e !== 0) {
      this.setState({ numTasks: this.state.numTasks - 1 });
      this.state.tasks.splice(e, 1);
    }
  };

  createTask = () => {
    const currentTask = this.state.numTasks + 1;
    this.setState({
      numTasks: currentTask,
      tasks: { id: this.state.numTasks - 1 },
    });
  };

  renderTasks = () => {
    var taskArray = [];
    const tasks = this.state.tasks;
    const test = this.props.giveTasks;

    for (var i = 0; i < tasks.length; i++) {
      taskArray.push(
        <Task
          key={i}
          taskId={i}
          taskInfo={test}
          updateInfo={this.updateInput}
          onDelete={this.removeRotation}
        />
      );
    }

    return taskArray;
  };

  render() {
    return (
      <div className="tasks-container">
        <h3>Tasks</h3>
        {this.renderTasks()}
        <div className="task-btn">
          <Popup
            content="Add a new rotation"
            trigger={<Icon onClick={this.createTask} name="plus" size="big" />}
          />
        </div>
      </div>
    );
  }
}

export default Tasks;

import React, { Component } from "react";
import { Form, Input, TextArea, Icon, Divider } from "semantic-ui-react";

export class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGoals: true,
      goals: "",
      rotation: "",
      duration: "",
      tasks: "",
      equipment: "",
      thisrotation: "",
      thisduration: "",
      thisgoals: "",
      thistasks: "",
      thisequipment: "",
    };
  }

  toggleGoal = () => {
    if (this.state.showGoals) {
      this.setState({ showGoals: false });
    } else {
      this.setState({ showGoals: true });
    }
  };

  delete = (e) => {
    this.props.onDelete(this.props.taskId);
  };

  handleInputChange = (e) => {
    const thisValue = "this" + e.target.id;
    this.setState({ [thisValue]: e.target.value });
    this.props.updateInfo(this.props.taskId, e.target.id, e.target.value);
  };

  moveTaskUp = (e) => {
    this.props.moveTask(this.props.taskId, "up");
  };

  moveTaskDown = (e) => {
    this.props.moveTask(this.props.taskId, "down");
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.rows = e.target.rows + 1;
    }
  };

  render() {
    const goals = this.state.showGoals;
    return (
      <div className="task">
        <div className="close-btn">
          {this.props.taskLength != this.props.taskPosition + 1 && (
            <Icon color="grey" name="down arrow" onClick={this.moveTaskDown} />
          )}

          {this.props.taskPosition > 0 && (
            <Icon color="grey" name="up arrow" onClick={this.moveTaskUp} />
          )}

          {this.props.taskLength > 1 && (
            <Icon onClick={this.delete} color="grey" name="close" />
          )}
        </div>
        <div className="task-header">
          <div className="task-input">
            <Input
              id="rotation"
              disabled={!this.props.init}
              transparent
              placeholder="Rotation"
              onChange={this.handleInputChange}
              value={this.props.taskInfo.rotation}
            />
          </div>
          <div className="task-input">
            <Input
              id="duration"
              disabled={!this.props.init}
              transparent
              placeholder="Event duration"
              onChange={this.handleInputChange}
              value={this.props.taskInfo.duration}
            />
          </div>
        </div>
        <div className="task-content">
          <div className="task-goals">
            {/* <div className="close-icon">
              <Icon
                onClick={this.toggleGoal}
                name={goals ? "minus" : "plus"}
                color="grey"
              />
            </div> */}
            {goals ? (
              <Form>
                <TextArea
                  placeholder="Goals and objectives"
                  disabled={!this.props.init}
                  rows="1"
                  id="goals"
                  onChange={this.handleInputChange}
                  value={this.props.taskInfo.goals}
                  onKeyDown={this.handleKeyDown}
                />
              </Form>
            ) : (
              ""
            )}
          </div>
          <div className="task-plan">
            <div className="task-list">
              <Form>
                <TextArea
                  id="tasks"
                  rows="1"
                  disabled={!this.props.init}
                  placeholder="Tasks"
                  onChange={this.handleInputChange}
                  value={this.props.taskInfo.tasks}
                  onKeyDown={this.handleKeyDown}
                />
              </Form>
            </div>
            <div className="task-equipment">
              <Form>
                <TextArea
                  id="equipment"
                  placeholder="Equipment"
                  disabled={!this.props.init}
                  rows="1"
                  onChange={this.handleInputChange}
                  value={this.props.taskInfo.equipment}
                  onKeyDown={this.handleKeyDown}
                />
              </Form>
            </div>
          </div>
        </div>
        <br />
        <Divider />
      </div>
    );
  }
}

export default Task;

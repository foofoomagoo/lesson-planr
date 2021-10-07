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
    if (this.props.taskId === 0) {
      const thisId = e.target.id;
      this.setState({ [thisId]: e.target.value });
      this.props.updateInfo(thisId, e.target.value);
    }

    if (this.props.taskId !== 0) {
      const thisValue = "this" + e.target.id;
      this.setState({ [thisValue]: e.target.value });
      this.props.updateInfo(this.props.taskId, e.target.id, e.target.value);
    }
  };

  render() {
    const goals = this.state.showGoals;
    return (
      <div className="task">
        <div className="close-btn">
          {this.props.taskId !== 0 && (
            <Icon onClick={this.delete} name="close" />
          )}
        </div>
        <div className="task-header">
          <div className="task-input">
            <Input
              id="rotation"
              transparent
              placeholder="Rotation"
              onChange={this.handleInputChange}
              value={this.props.taskInfo.rotation}
            />
          </div>
          <div className="task-input">
            <Input
              id="duration"
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
                  id="goals"
                  rows="2"
                  placeholder="Goals and objectives"
                  onChange={this.handleInputChange}
                  value={this.props.taskInfo.goals}
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
                  rows="2"
                  placeholder="Tasks"
                  onChange={this.handleInputChange}
                  value={this.props.taskInfo.tasks}
                />
              </Form>
            </div>
            <div className="task-equipment">
              <Form>
                <TextArea
                  id="equipment"
                  rows="2"
                  placeholder="Equipement needed"
                  onChange={this.handleInputChange}
                  value={this.props.taskInfo.equipment}
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

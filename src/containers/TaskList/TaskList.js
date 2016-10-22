import React, { Component,  PropTypes } from 'react';
import { connect } from 'react-redux'
import './TaskList.scss'
import Task from '../../components/Task';

class TaskList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("TASK LIST RENDER");
    const newArrayTask = Array.prototype.slice.call(this.props.tasks).reverse();
    const tasks = newArrayTask.map((task, index) => <li key={index}> <Task task={task} /> </li>);
    return (
      <div className = 'taskList'>
        <ul>
          {tasks}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.list
  }
}

export default connect(mapStateToProps)(TaskList)
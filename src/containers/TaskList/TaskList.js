import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaskList.scss';
import Task from '../../components/Task';
import TaskUtils from '../../utils/TaskUtils';
import _ from 'lodash';
class TaskList extends Component {

  render () {
    var reversedTaskList = _.slice(Object.values(this.props.tasks));
    reversedTaskList = _.reverse(reversedTaskList);

    const tasks = reversedTaskList.map((task, index) => {
      var steps = TaskUtils.getStepsByTask(task, this.props.steps);
      return (<li key={index}><Task task={task} steps={steps} /></li>);
    });

    return (
      <div className='taskList'>
        <ul>
          {tasks}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.list,
    steps: state.tasks.steps.list
  };
};

export default connect(mapStateToProps)(TaskList);

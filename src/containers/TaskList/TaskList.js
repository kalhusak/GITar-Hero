import React, { Component } from 'react';
import { connect } from 'react-redux';
import { values, take } from 'lodash';
import './TaskList.scss';
import Task from '../../components/Task';
import Loader from '../../components/Loader';

class TaskList extends Component {

  renderTasks () {
    return take(this.props.tasks, 1).map((task, index) =>
      <Task key={task.id} task={task} active={index === 0 && !this.props.tutorial} />);
  }

  render () {
    return (
      <div className='task-list'>
        <div className='task-list__heading'>
          Upcoming tasks
        </div>
        {this.renderTasks()}
        <div className='task-list__loader'>
          <Loader />
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ tasks, tutorial }) => {
  return {
    tasks: values(tasks.byId),
    tutorial: tutorial.current
  };
};

export default connect(mapStateToProps)(TaskList);

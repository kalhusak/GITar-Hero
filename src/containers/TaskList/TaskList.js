import React, { Component } from 'react';
import { connect } from 'react-redux';
import { values, take } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './TaskList.scss';
import Task from '../../components/Task';

class TaskList extends Component {

  renderTasks () {
    return take(this.props.tasks, 1).map((task, index) => <Task key={task.id} task={task} active={index === 0} />);
  }

  render () {
    return (
      <div className='task-list'>
        <div className='task-list__label'>
          upcoming tasks:
        </div>
        <ReactCSSTransitionGroup
          transitionName='task-list__task'
          transitionEnterTimeout={800}
          transitionLeaveTimeout={400}>
          { this.renderTasks() }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

const mapStateToProps = ({ tasks }) => {
  return {
    tasks: values(tasks.byId)
  };
};

export default connect(mapStateToProps)(TaskList);

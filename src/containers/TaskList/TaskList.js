import React, { Component } from 'react';
import { connect } from 'react-redux';
import { values, take } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
        <div className='task-list__label'>
          Upcoming tasks
        </div>
        <ReactCSSTransitionGroup
          transitionName='task-list__task'
          transitionEnterTimeout={800}
          transitionLeaveTimeout={400}>
          { this.renderTasks() }
        </ReactCSSTransitionGroup>
        <Loader />
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

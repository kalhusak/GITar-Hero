import React, { Component, PropTypes } from 'react';
import Time from '../Time';
import Check from '../Check';
import './Task.scss';

export default class Task extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
  };

  renderSubtasks () {
    const { task } = this.props;

    return task.steps.map((step, index) => {
      const done = index < task.currentStepIndex;

      return <div className='task__step' key={index}>
        <div className='task__step-check'>
          <Check checked={done} />
        </div>
        <div className={'task__step-description' + (done ? ' task__step-description--done' : '')}>
          {step.description}
        </div>
      </div>;
    });
  }

  render () {
    const { task: { title, time }, active } = this.props;

    return (
      <div className='task'>
        <Time label={title} time={time * 1000} active={active} />
        <div className='task__subtasks'>
          {this.renderSubtasks()}
        </div>
      </div>
    );
  }
};

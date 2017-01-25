import React, { Component, PropTypes } from 'react';
import Checkbox from '../Checkbox';
import './Task.scss';

export default class Task extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
  };

  renderSubtasks () {
    const { task, active } = this.props;

    return task.steps.map((step, index) => {
      const done = index < task.currentStepIndex;

      return <div
        className={'task__step' + (active && index === task.currentStepIndex ? ' task__step--current' : '')}
        key={index}>
        <div className='task__step-check'>
          <Checkbox value={done} />
        </div>
        <div className={'task__step-description' + (done ? ' task__step-description--done' : '')}>
          {step.description}
        </div>
      </div>;
    });
  }

  render () {
    const { task: { title, time, description }, active } = this.props;

    return (
      <div className='task'>
        <div className='task__description'>
          {description}
        </div>
        <div className='task__subtasks'>
          {this.renderSubtasks()}
        </div>
      </div>
    );
  }
};

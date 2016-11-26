import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './Task.scss';
import _ from 'lodash';

class Task extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired
  };

  render () {
    const task = this.props.task;
    const steps = task.steps.map((step, index) =>
      <li key={index}>
        <input className='toggle' type='checkbox' checked={index < task.currentStepIndex} />
        <label className={index < task.currentStepIndex ? 'executedTask' : 'notExecutedTask'}>{step.description}</label>
      </li>
    );

    return (
      <div className='task'>
        <label className='title'>{task.title}</label>
        <ul className='steps-list'>
          {steps}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Task);

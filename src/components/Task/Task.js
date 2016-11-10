import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './Task.scss';
import _ from 'lodash';

class Task extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired,
    steps: PropTypes.object.isRequired
  };

  render () {
    const steps = _.values(this.props.steps).map((step, index) =>
      <li key={index}>
        <input className='toggle' type='checkbox' checked={step.executed} />
        <label className={step.executed ? 'executedTask' : 'notExecutedTask'}>{step.description}</label>
      </li>
    );

    return (
      <div className='task'>
        <label className='title'>{this.props.task.title}</label>
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

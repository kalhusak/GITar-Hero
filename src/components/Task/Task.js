import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './Task.scss';

class Task extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired
  };

  render () {
    const steps = this.props.task.steps.map((step, index) =>
      <li key={index} className={step.executed ? 'executedTask' : 'notExecutedTask'}>{step.description}</li>);

    return (
      <div className='task'>
        <h4>{this.props.task.title}</h4>
        <ul>
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

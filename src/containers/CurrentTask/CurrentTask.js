import React, { Component } from 'react';
import ReactCCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { take, reverse } from 'lodash';
import Checkbox from '../../components/Checkbox';
import Loader from '../../components/Loader';
import Panel from '../../components/Panel';
import './CurrentTask.scss';

class CurrentTask extends Component {

  renderSteps () {
    const { task } = this.props;

    const stepsNum = task.currentStepIndex + (task.pending ? 0 : 1);

    return reverse(take(task.steps, stepsNum).map((step, index) => {
      const done = index < task.currentStepIndex;
      const active = index === task.currentStepIndex;

      const reduceOpacity = {
        opacity: 1 - Math.pow((task.currentStepIndex - index) / task.steps.length, 2) * 0.8
      };

      return <div key={index} style={reduceOpacity} className='task__step'>
        <div className='task__step-check'>
          <Checkbox value={done} active={active} />
        </div>
        <div className={'task__step-description' + (done ? ' task__step-description--done' : '')}>
          {step.description}
        </div>
      </div>;
    }));
  }

  renderTask () {
    return <div className='task__steps'>
      {this.renderSteps()}
    </div>;
  }

  renderLoader () {
    if (this.props.task.pending) {
      return <div className='task__loader'>
        <Loader />
      </div>;
    }
  }

  render () {
    return (
      <div className='task'>
        <h2 className='task__heading'>Current task</h2>
        <ReactCCSSTransitionGroup
          transitionName='task__animate'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          <div key={this.props.task.id} className='task__animate'>
            <Panel className='task__description' title={this.props.task.title}>
              {this.props.task.description}
            </Panel>
            {this.renderLoader()}
            {this.renderTask()}
          </div>
        </ReactCCSSTransitionGroup>
      </div>
    );
  }
};

export default connect(({ tasks }) => ({ task: tasks.byId[tasks.current] }))(CurrentTask);

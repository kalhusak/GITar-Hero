import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';
import SpeedMeter from '../../components/SpeedMeter';
import ProgressLines from '../../components/ProgressLines';
import './Points.scss';

class Points extends Component {
  renderSpeedMeter () {
    return <div className='top__speed-meter'>
      <SpeedMeter value={0.4} />
    </div>;
  }

  renderLines () {
    return <div className='top__progress-lines'>
      <ProgressLines value={this.props.progress} />
    </div>;
  }

  renderPoints () {
    return <div className='points-container__points'>
      <Counter value={this.props.points} />
      <div className='points-container__points-label'>
        Score
      </div>
    </div>;
  }

  render () {
    return <div className='points-container'>
      {this.renderLines()}
      {this.renderSpeedMeter()}
      {this.renderPoints()}
    </div>;
  }
};

export default connect(({ points, tasks }) => {
  const task = tasks.byId[tasks.current];
  const progress = task ? task.currentStepIndex / task.steps.length : 0;

  return {
    points: points.value,
    progress,
    time: task.time
  };
})(Points);

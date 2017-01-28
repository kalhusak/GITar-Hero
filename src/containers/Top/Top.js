import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';
import SpeedMeter from '../../components/SpeedMeter';
import ProgressLines from '../../components/ProgressLines';
import './Top.scss';

class Points extends Component {
  constructor (props) {
    super(props);
    this.state = {
      time: 1,
      from: Date.now()
    };
    this.setSpeedMeterValue = ::this.setSpeedMeterValue;
  }

  renderSpeedMeter () {
    return <div className='top__speed-meter'>
      <SpeedMeter value={this.state.time} />
    </div>;
  }

  renderLines () {
    return <div className='top__progress-lines'>
      <ProgressLines value={this.props.progress} />
    </div>;
  }

  renderPoints () {
    return <div className='top__points'>
      <Counter value={this.props.points} />
      <div className='top__points-label'>
        Score
      </div>
    </div>;
  }

  setSpeedMeterValue () {
    const time = Math.max(1 - (Date.now() - this.state.from) / (this.props.time * 1000), 0);

    if (time !== this.state.time) {
      requestAnimationFrame(() => {
        this.setState({ time });
      });
    }
  }

  componentDidMount () {
    this.setTimeInterval = setInterval(this.setSpeedMeterValue, 100);
  }

  componentWillUnmount () {
    clearInterval(this.setTimeInterval);
  }

  componentWillReceiveProps ({ time }) {
    if (time !== this.props.time) {
      this.setState({
        from: Date.now(),
        time: 1
      });
    }
  }

  render () {
    return <div className='top'>
      {this.renderLines()}
      {this.renderSpeedMeter()}
      {this.renderPoints()}
    </div>;
  }
};

export default connect(({ points, tasks }) => {
  const task = tasks.byId[tasks.current];
  const progress = task ? task.currentStepIndex / task.steps.length : 0;
  const time = task ? task.time : 0;

  return {
    points: points.value,
    progress,
    time
  };
})(Points);

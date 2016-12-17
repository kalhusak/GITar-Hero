import React, { Component } from 'react';
import './Time.scss';

const transitionTime = 3000;

export default class Time extends Component {
  constructor (props) {
    super(props);
    this.state = {
      timeValue: 0,
      rewardValue: 0,
      rewardInitialValue: 0
    };
    this.animateBar = ::this.animateBar;
  }

  ease (t) {
    return (--t) * t * t + 1;
  }

  getColor (t) {
    return `hsl(${t * 140}, 70%, 50%)`;
  }

  animateBar () {
    const { start } = this.state;
    const { time } = this.props;
    const now = Date.now();

    if (now < start + time) {
      requestAnimationFrame(this.animateBar);
    }

    this.setState({
      rewardValue: 1 - this.ease((now - start) / transitionTime),
      timeValue:  1 - Math.min((now - start) / time, 1)
    });
  }

  componentWillReceiveProps () {
    this.setState({
      rewardInitialValue: this.state.timeValue,
      timeValue: 1,
      start: Date.now()
    });

    requestAnimationFrame(this.animateBar);
  }

  renderReward () {
    const { rewardValue, rewardInitialValue } = this.state;
    if (rewardValue > 0) {
      const rewardState = rewardValue * rewardInitialValue;
      const styles = {
        transform: `scaleX(${rewardState})`,
        backgroundColor: this.getColor(rewardInitialValue),
        opacity: 0.75 + rewardValue / 4
      };

      return <div className='time-container__bar' style={styles} />;
    }
  }

  renderTime () {
    const { timeValue } = this.state;
    const styles = {
      transform: `scaleX(${timeValue})`,
      backgroundColor: this.getColor(timeValue)
    };

    return <div className='time-container__bar' style={styles} />;
  }

  render () {
    return <div className='time-container'>
      { this.renderTime() }
      { this.renderReward() }
    </div>;
  }
}

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { enterCommand } from '../../actions/ConsoleActions';
import './Console.scss';

class Console extends Component {

  constructor (props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      selectionStart: 0,
      selectionEnd: 0,
      numEntered: 0,
      currentValue: ''
    };
  }

  onChange ({ target: { value, selectionStart } }) {
    this.setState({
      selectionStart,
      currentValue: value
    });
  }

  onKeyDown ({ keyCode, target: { value, selectionStart } }) {
    const PREV_CODE = 37;
    const NEXT_CODE = 39;

    if (keyCode === PREV_CODE) {
      this.setState({ selectionStart: Math.max(selectionStart - 1, 0) });
    } else if (keyCode === NEXT_CODE) {
      this.setState({ selectionStart:  Math.min(selectionStart + 1, value.length) });
    }
  }

  onKeyUp ({ keyCode, target }) {
    const ENTER_CODE = 13;

    if (keyCode === ENTER_CODE) {
      const { numEntered } = this.state;
      const { dispatch } = this.props;
      dispatch(enterCommand(target.value));
      target.value = '';
      this.setState({
        numEntered: numEntered + 1,
        currentValue: ''
      });
    }
  }

  renderFloatingCommand () {
    const { numEntered, currentValue, selectionStart } = this.state;
    const text = currentValue + ' ';
    return (<span className='console__text' key={numEntered}>
      {text.slice(0, selectionStart)}
      <span className='console__cursor'>{ text.slice(selectionStart, selectionStart + 1) }</span>
      {text.slice(selectionStart + 1)}
    </span>);
  }

  render () {
    return (
      <div className='console__wrapper'>
        <input className='console__input' onChange={this.onChange} onKeyUp={this.onKeyUp} onKeyDown={this.onKeyDown} />
        <ReactCSSTransitionGroup
          transitionName='floatingCommand'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={0}>
          { this.renderFloatingCommand() }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

export default connect()(Console);

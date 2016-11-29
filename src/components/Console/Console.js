import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { enterCommand } from '../../actions/ConsoleActions';
import './Console.scss';

class Console extends Component {

  constructor (props) {
    super(props);
    this.onKeyUp = ::this.onKeyUp;
    this.onKeyDown = ::this.onKeyDown;
    this.onChange = ::this.onChange;
    this.onFocus = ::this.onFocus;
    this.onBlur = ::this.onBlur;
    this.state = {
      selectionStart: 0,
      commandId: 0,
      currentValue: '',
      focus: false,
      movingCursor: false
    };
  }

  onFocus ({ target }) {
    const { selectionStart } = this.state;
    this.setState({ focus: true });
    setTimeout(() => {
      target.setSelectionRange(selectionStart, selectionStart);
    });
  }

  onBlur () {
    this.setState({ focus: false });
  }

  onChange ({ target: { value, selectionStart } }) {
    this.setState({
      selectionStart,
      currentValue: value,
      movingCursor: true
    });
    this.setMovingCursorTimeout();
  }

  onKeyDown ({ keyCode, target: { value, selectionStart } }) {
    const PREV_CODE = 37;
    const NEXT_CODE = 39;

    if (keyCode === PREV_CODE) {
      this.setState({ selectionStart: Math.max(selectionStart - 1, 0), movingCursor: true });
    } else if (keyCode === NEXT_CODE) {
      this.setState({ selectionStart:  Math.min(selectionStart + 1, value.length), movingCursor: true });
    } else {
      return;
    }

    this.setMovingCursorTimeout();
  }

  setMovingCursorTimeout () {
    clearTimeout(this.cursorStopTimeout);
    this.cursorStopTimeout = setTimeout(() => {
      this.setState({ movingCursor: false });
    }, 1000);
  }

  enterCommand (command) {
    const { dispatch } = this.props;

    dispatch(enterCommand(command));
  }

  onKeyUp ({ keyCode, target }) {
    const ENTER_CODE = 13;

    if (keyCode === ENTER_CODE) {
      const { commandId } = this.state;

      this.enterCommand(target.value);

      target.value = '';
      this.setState({
        commandId: commandId + 1,
        currentValue: '',
        selectionStart: 0
      });
    }
  }

  renderFloatingCommand () {
    const { commandId, currentValue, selectionStart } = this.state;
    const text = currentValue + ' ';
    const cursorClasses = ['console__cursor'];

    if (this.state.focus) {
      cursorClasses.push('console__cursor--active');
    }

    if (this.state.movingCursor) {
      cursorClasses.push('console__cursor--moving');
    }

    return (<span className='console__text' key={commandId}>
      {text.slice(0, selectionStart)}
      <span className={cursorClasses.join(' ')}>{ text.slice(selectionStart, selectionStart + 1) }</span>
      {text.slice(selectionStart + 1)}
    </span>);
  }

  render () {
    const consoleClasses = ['console__wrapper'];

    if (this.state.focus) {
      consoleClasses.push('console__wrapper--focused');
    }

    return (
      <div className={consoleClasses.join(' ')}>
        <input autoFocus className='console__input' onChange={this.onChange} onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown} onFocus={this.onFocus} onBlur={this.onBlur} />
        <span className='console__prompt-character'>GITar-Hero~$ </span>
        <ReactCSSTransitionGroup
          className='console__text-container'
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

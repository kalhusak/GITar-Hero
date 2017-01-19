import React, { Component, PropTypes } from 'react';
import { isEqual } from 'lodash';
import Config from '../../config';
import * as ConsoleUtils from '../../utils/ConsoleUtils';
import './Console.scss';

export default class Console extends Component {
  static propTypes = {
    enabled: PropTypes.bool,
    files: PropTypes.array.isRequired,
    branches: PropTypes.array.isRequired,
    onCommandEnter: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onKeyDown = ::this.onKeyDown;
    this.onChange = ::this.onChange;
    this.onFocus = ::this.onFocus;
    this.onBlur = ::this.onBlur;
    this.onMouseDown = ::this.onMouseDown;
    this.state = {
      selectionStart: 0,
      commandId: 0,
      currentValue: '',
      previousValues: [],
      history: -1,
      focus: false,
      movingCursor: false
    };
    this.autocompletionTree =
      ConsoleUtils.generateAutocompletionTree(Config.allowedCommands, this.props.branches, this.props.files);
  }

  onFocus () {
    const { selectionStart } = this.state;
    this.setState({ focus: true, selectionStart });
  }

  onBlur () {
    this.setState({ focus: false, showHistory: false });
  }

  onChange () {
    const { consoleInput: { selectionStart, value } } = this.refs;

    this.setState({
      selectionStart,
      currentValue: value,
      movingCursor: true,
      showHistory: false
    });

    this.setMovingCursorTimeout();
  }

  tryToComplete () {
    const { currentValue } = this.state;
    const { consoleInput } = this.refs;
    const hint = ConsoleUtils.searchForHint(currentValue, this.autocompletionTree);

    if (hint) {
      consoleInput.value = hint;
      this.onChange();
    }
  }

  onKeyDown (event) {
    const { consoleInput } = this.refs;
    const { history, previousValues, currentValue, prevCurrentValue, commandId } = this.state;
    const [ TAB_CODE, ENTER_CODE, LEFT_CODE, UP_CODE, RIGHT_CODE, DOWN_CODE ] = [ 9, 13, 37, 38, 39, 40 ];

    event.stopPropagation();
    let index, value;

    switch (event.keyCode) {
      case LEFT_CODE:
        if (consoleInput.selectionStart > 0) {
          this.setState({
            selectionStart: consoleInput.selectionStart - 1,
            movingCursor: true
          });
          this.setMovingCursorTimeout();
        }
        break;

      case RIGHT_CODE:
        if (consoleInput.selectionStart < consoleInput.value.length) {
          this.setState({
            selectionStart: consoleInput.selectionStart + 1,
            movingCursor: true
          });
          this.setMovingCursorTimeout();
        }
        break;

      case UP_CODE:
        index = Math.min(history + 1, Math.max(previousValues.length - 1, 0));
        value = previousValues[index].value;
        this.setState({
          history: index,
          currentValue: value,
          prevCurrentValue: history === -1 ? currentValue : prevCurrentValue,
          selectionStart: value.length,
          showHistory: true
        });
        this.setShowHistoryTimeout();
        break;

      case DOWN_CODE:
        index = Math.max(history - 1, -1);
        value = index >= 0 ? previousValues[index].value : prevCurrentValue;
        this.setState({
          history: index,
          currentValue: value,
          selectionStart: value.length,
          showHistory: true
        });
        this.setShowHistoryTimeout();
        break;

      case TAB_CODE:
        event.preventDefault();
        this.tryToComplete();
        this.setMovingCursorTimeout();
        break;

      case ENTER_CODE:
        if (currentValue !== '' || Config.noCommandValidation) {
          this.enterCommand(currentValue);
          previousValues.unshift({
            id: commandId,
            value: currentValue
          });
          this.setState({
            commandId: commandId + 1,
            history: -1,
            currentValue: '',
            previousValues,
            selectionStart: 0
          });
        }
        break;

      default:
        return;
    }
  }

  setMovingCursorTimeout () {
    clearTimeout(this.cursorStopTimeout);
    this.cursorStopTimeout = setTimeout(() => {
      this.setState({ movingCursor: false });
    }, 500);
  }

  setShowHistoryTimeout () {
    clearTimeout(this.hideHistoryTimeout);
    this.hideHistoryTimeout = setTimeout(() => {
      this.setState({ showHistory: false });
    }, 2000);
  }

  enterCommand (command) {
    this.props.onCommandEnter(command.trim().replace(/\s\s+/g, ' '));
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

    return this.renderHistory().concat(<span className='console__text' key={commandId}>
      {text.slice(0, selectionStart)}
      <span className={cursorClasses.join(' ')}>{ text.slice(selectionStart, selectionStart + 1) }</span>
      {text.slice(selectionStart + 1)}
    </span>);
  }

  renderHistory () {
    const { previousValues, history, showHistory } = this.state;
    const historyTextClasses = ['console__history-text'];

    if (!showHistory) {
      historyTextClasses.push('console__history-text--hidden');
    }

    return previousValues.slice(history + 1, history + 15).map(({ value, id }, index) => {
      index++;
      const commandStyle = {
        transform: `perspective(20px)
          translate3d(0px, ${-index * 50}px, ${-Math.pow(index / 4, 2)}px) rotateX(${index / 6}deg)`,
        opacity: 1 - index * 0.08
      };

      return (<span className={historyTextClasses.join(' ')} key={id} style={commandStyle}>
        {value}
      </span>);
    });
  }

  componentDidUpdate () {
    const { selectionStart } = this.state;
    setTimeout(() => {
      this.refs.consoleInput.setSelectionRange(selectionStart, selectionStart);
    });
  }

  componentWillReceiveProps (newProps) {
    if (!isEqual(newProps.branches, this.props.branches) || !isEqual(newProps.files, this.props.files)) {
      this.autocompletionTree =
        ConsoleUtils.generateAutocompletionTree(
          Config.allowedCommands,
          newProps.branches,
          ConsoleUtils.treeToPathList(newProps.files).concat(['-A'])
        );
    }

    if (!this.props.enabled && newProps.enabled) {
      this.refs.consoleInput.focus();
      this.onFocus();
    }
  }

  onMouseDown (event) {
    if (this.state.focus) {
      event.preventDefault();
    }
  }

  render () {
    const consoleClasses = ['console__wrapper'];

    if (this.state.focus) {
      consoleClasses.push('console__wrapper--focused');
    }

    return (
      <div className={consoleClasses.join(' ')}>
        <input ref='consoleInput' className='console__input'
          onChange={this.onChange} onKeyDown={this.onKeyDown}
          onMouseDown={this.onMouseDown} onFocus={this.onFocus}
          onBlur={this.onBlur} value={this.state.currentValue} />
        <span className='console__prompt-character'>GITar-Hero~$ </span>
        <span className='console__text-container'>
          { this.renderFloatingCommand() }
        </span>
      </div>
    );
  }
};

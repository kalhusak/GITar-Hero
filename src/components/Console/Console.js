import React, { Component } from 'react';
import { identity } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { enterCommand } from '../../actions/ConsoleActions';
import { generateAutocompletionTree } from './utils/Autocompletion.js';
import './Console.scss';

const allowedCommands = ['init', 'add', 'commit', 'branch', 'checkout :branch:', 'rebase :branch: :branch:'];
const branches = ['master', 'develop', 'release/0.1.0', 'hotfix/aaa', 'blabla', 'release',
  'fix/xxx', 'feature/task1', 'feature/task2', 'feature/mlask', 'feat', 'helpers', 'fix/8'];
const autocompleteTree = generateAutocompletionTree(allowedCommands, branches);

// TODO Move to utils directory
// Iterates over elements of collection, returning the element if it's the only one predicate returns truthy for
const searchForTheOnlyOne = (collection = [], predicate = identity) => {
  let match;

  collection.every(item => {
    if (predicate(item)) {
      if (match) {
        match = null;
        return false;
      }
      match = item;
    }
    return true;
  });

  return match;
};

class Console extends Component {

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
  }

  onFocus () {
    const { selectionStart } = this.state;
    this.setState({ focus: true, selectionStart });
  }

  onBlur () {
    this.setState({ focus: false });
  }

  onChange () {
    const { consoleInput: { selectionStart, value } } = this.refs;

    this.setState({
      selectionStart,
      currentValue: value,
      movingCursor: true
    });

    this.setMovingCursorTimeout();
  }

  searchForHint (searchValue, { children }) {
    if (children) {
      let match = searchForTheOnlyOne(children, node =>
        searchValue.startsWith(node.pattern) && node.pattern.length < searchValue.length);
      if (match) {
        return this.searchForHint(searchValue, match);
      }

      match = searchForTheOnlyOne(children, node => node.pattern.startsWith(searchValue));
      if (match) {
        return match.pattern;
      }
    }
  }

  tryToComplete () {
    const { currentValue } = this.state;
    const { consoleInput } = this.refs;
    const hint = this.searchForHint(currentValue, autocompleteTree);

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
        this.setState({
          selectionStart: Math.max(consoleInput.selectionStart - 1, 0),
          movingCursor: true
        });
        break;

      case RIGHT_CODE:
        this.setState({
          selectionStart:  Math.min(consoleInput.selectionStart + 1, consoleInput.value.length),
          movingCursor: true
        });
        break;

      case UP_CODE:
        index = Math.min(history + 1, previousValues.length - 1);
        value = previousValues[index].value;
        this.setState({
          history: index,
          currentValue: value,
          prevCurrentValue: history === -1 ? currentValue : prevCurrentValue,
          selectionStart: value.length
        });
        break;

      case DOWN_CODE:
        index = Math.max(history - 1, -1);
        value = index >= 0 ? previousValues[index].value : prevCurrentValue;
        this.setState({
          history: index,
          currentValue: value,
          selectionStart: value.length
        });
        break;

      case TAB_CODE:
        event.preventDefault();
        this.tryToComplete();
        break;

      case ENTER_CODE:
        this.enterCommand(consoleInput.value);
        previousValues.unshift({
          id: commandId,
          value: currentValue
        });

        consoleInput.value = '';
        this.setState({
          commandId: commandId + 1,
          history: -1,
          currentValue: '',
          previousValues,
          selectionStart: 0
        });
        break;

      default:
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
    dispatch(enterCommand(command.trim().replace(/\s\s+/g, ' ')));
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
    const { previousValues, history } = this.state;
    return previousValues.slice(history + 1, history + 15).map(({ value, id }, index) => {
      index++;
      const commandStyle = {
        transform: `perspective(20px)
          translate3d(0px, ${-index * 50}px, ${-Math.pow(index / 4, 2)}px) rotateX(${index / 6}deg)`,
        opacity: 1 - index * 0.05
      };

      return (<span className='console__history-text' key={id} style={commandStyle}>
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
        <input autoFocus ref='consoleInput' className='console__input'
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

export default connect()(Console);

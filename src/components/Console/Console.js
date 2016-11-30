import React, { Component } from 'react';
import { identity } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { enterCommand } from '../../actions/ConsoleActions';
import { generateAutocompletionTree } from './utils/Autocompletion.js';
import './Console.scss';

const allowedCommands = ['init', 'add', 'commit', 'branch', 'checkout :branch:', 'rebase :branch: :branch:'];
const autocompleteTree = generateAutocompletionTree(allowedCommands);

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
      let match = searchForTheOnlyOne(children, node => searchValue.startsWith(node.pattern));
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

    const PREV_CODE = 37;
    const NEXT_CODE = 39;
    const TAB_CODE = 9;

    switch (event.keyCode) {
      case PREV_CODE:
        this.setState({
          selectionStart: Math.max(consoleInput.selectionStart - 1, 0),
          movingCursor: true
        });
        break;
      case NEXT_CODE:
        this.setState({
          selectionStart:  Math.min(consoleInput.selectionStart + 1, consoleInput.value.length),
          movingCursor: true
        });
        break;
      case TAB_CODE:
        event.preventDefault();
        this.tryToComplete();
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
        <input autoFocus ref='consoleInput' className='console__input' onChange={this.onChange} onKeyUp={this.onKeyUp}
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

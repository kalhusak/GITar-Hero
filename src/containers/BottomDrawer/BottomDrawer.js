import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find, pick } from 'lodash';
import Console from '../../components/Console';
import Checkbox from '../../components/Checkbox';
import { enterCommand } from '../../actions/ConsoleActions';
import { closeHelpDrawer,
  selectHelpDrawerTab,
  nextHelpDrawerTab,
  prevHelpDrawerTab,
  toggleAutoShowHelp } from '../../actions/HelpDrawerActions';
import helpTabs from './helpTabs';
import './BottomDrawer.scss';

class BottomDrawer extends Component {
  constructor (props) {
    super(props);
    this.closeDrawer = ::this.closeDrawer;
    this.handleKeyDown = ::this.handleKeyDown;
    this.selectTab = ::this.selectTab;
    this.toggleAutoShowHelp = ::this.toggleAutoShowHelp;
    this.onConsoleCommandEnter = ::this.onConsoleCommandEnter;
    this.initialRender = true;
  }

  closeDrawer () {
    this.props.dispatch(closeHelpDrawer());
  }

  selectTab (tab) {
    return () => this.props.dispatch(selectHelpDrawerTab(tab));
  }

  renderTabNavigation () {
    return helpTabs.map(({ name }, index) => {
      let className = 'help-container__nav-item';
      if (this.props.helpDrawer.selectedTab === name) {
        className += ' help-container__nav-item--active';
      }
      return <a key={index} className={className} onClick={this.selectTab(name)}>{name}</a>;
    });
  }

  renderCurrentTab () {
    return find(helpTabs, { name: this.props.helpDrawer.selectedTab }).content;
  }

  handleKeyDown ({ target, keyCode }) {
    const { helpDrawer: { isOpen }, dispatch } = this.props;

    if (isOpen) {
      const [CODE_ESC, CODE_LEFT, CODE_RIGHT] = [27, 37, 39];

      switch (event.keyCode) {
        case CODE_ESC:
          this.closeDrawer();
          break;
        case CODE_LEFT:
          if (target.tagName === 'INPUT' && target.selectionStart > 0) {
            return;
          }
          dispatch(prevHelpDrawerTab());
          break;
        case CODE_RIGHT:
          if (target.tagName === 'INPUT' && target.selectionStart < target.value.length) {
            return;
          }
          dispatch(nextHelpDrawerTab());
          break;
      }
    }
  }

  onWheel (event) {
    event.stopPropagation();
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this.handleKeyDown);
    this.refs.drawer.addEventListener('wheel', this.onWheel);
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.handleKeyDown);
    this.refs.drawer.removeEventListener('wheel', this.onWheel);
  }

  toggleAutoShowHelp () {
    this.props.dispatch(toggleAutoShowHelp());
  }

  onConsoleCommandEnter (command) {
    this.props.dispatch(enterCommand(command));
  }

  render () {
    const getClasses = (className) => {
      return this.props.helpDrawer.isOpen ? `${className} ${className}--visible` : className;
    };

    const preventInitialAnimation = this.initialRender ? { transition: 'none' } : null;
    this.initialRender = false;

    return <div ref='drawer'>
      <div className={getClasses('bottom-drawer__overlay')} onClick={this.closeDrawer}
        style={preventInitialAnimation} />
      <div className={getClasses('bottom-drawer__container')}
        style={preventInitialAnimation}>
        <div className={'bottom-drawer__auto-show' + (this.props.helpDrawer.autoShowHelp
          ? ' bottom-drawer__auto-show--active' : '')}
          onClick={this.toggleAutoShowHelp}
          style={preventInitialAnimation}>
          <div className='bottom-drawer__auto-show-checkbox'>
            <Checkbox value={this.props.helpDrawer.autoShowHelp} />
          </div>
          <span>
            auto open help for related task's first occur
          </span>
        </div>
        <Console
          enabled={!this.props.tutorial}
          files={this.props.tree}
          branches={['develop', 'master']}
          onCommandEnter={this.onConsoleCommandEnter} />
        <div className='bottom-drawer__help-container'>
          <nav className='help-container__nav'>
            {this.renderTabNavigation()}
          </nav>
          <div className='help-container__current-tab'>
            <div className='help-container__current-tab-scroller'>
              {this.renderCurrentTab()}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
};

const mapStateToProps = state => pick(state, ['helpDrawer', 'tree', 'tutorial']);

export default connect(mapStateToProps)(BottomDrawer);

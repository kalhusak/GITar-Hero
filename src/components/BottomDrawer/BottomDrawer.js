import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import Console from '../Console';
import Checkbox from '../Checkbox';
import { closeHelpDrawer,
  selectHelpDrawerTab,
  nextHelpDrawerTab,
  prevHelpDrawerTab,
  toggleAutoShowHelp,
  closeInitialInfo } from '../../actions/HelpDrawerActions';
import helpTabs from './helpTabs';
import './BottomDrawer.scss';

class BottomDrawer extends Component {
  constructor (props) {
    super(props);
    this.closeDrawer = ::this.closeDrawer;
    this.handleKeyDown = ::this.handleKeyDown;
    this.selectTab = ::this.selectTab;
    this.toggleAutoShowHelp = ::this.toggleAutoShowHelp;
    this.closeInitialInfo = ::this.closeInitialInfo;
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
      if (this.props.selectedTab === name) {
        className += ' help-container__nav-item--active';
      }
      return <a key={index} className={className} onClick={this.selectTab(name)}>{name}</a>;
    });
  }

  renderCurrentTab () {
    return find(helpTabs, { name: this.props.selectedTab }).content;
  }

  handleKeyDown ({ target, keyCode }) {
    const { isOpen, dispatch } = this.props;

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

  componentDidMount () {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  toggleAutoShowHelp () {
    this.props.dispatch(toggleAutoShowHelp());
  }

  closeInitialInfo () {
    this.props.dispatch(closeInitialInfo());
  }

  render () {
    const getClasses = (className) => {
      return this.props.isOpen ? `${className} ${className}--visible` : className;
    };

    const preventInitialAnimation = this.initialRender ? { transition: 'none' } : null;
    this.initialRender = false;

    return <div>
      <div className={getClasses('bottom-drawer__overlay')} onClick={this.closeDrawer}
        style={preventInitialAnimation} />
      <div className={getClasses('bottom-drawer__container')}
        style={preventInitialAnimation}>
        <div className={'bottom-drawer__initial-info' +
          (this.props.initialInfo ? '' : ' bottom-drawer__initial-info--hidden')}
          style={preventInitialAnimation}>
          <div>type "help" to get some tips</div>
          <button onClick={this.closeInitialInfo} className='bottom-drawer__initial-info-btn'>ok</button>
        </div>
        <div className={'bottom-drawer__auto-show' + (this.props.autoShowHelp
          ? ' bottom-drawer__auto-show--active' : '')}
          onClick={this.toggleAutoShowHelp}
          style={preventInitialAnimation}>
          <div className='bottom-drawer__auto-show-checkbox'>
            <Checkbox value={this.props.autoShowHelp} />
          </div>
          <span>
            auto open help for related task's first occur
          </span>
        </div>
        <Console />
        <div className='bottom-drawer__help-container'>
          <nav className='help-container__nav'>
            {this.renderTabNavigation()}
          </nav>
          <div className='help-container__current-tab'>
            {this.renderCurrentTab()}
          </div>
        </div>
      </div>
    </div>;
  }
};

export default connect(({ helpDrawer }) => {
  return helpDrawer;
})(BottomDrawer);

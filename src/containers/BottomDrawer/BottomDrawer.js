import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find, pick } from 'lodash';
import Console from '../../components/Console';
import { enterCommand } from '../../actions/ConsoleActions';
import { closeHelpDrawer,
  openHelpDrawer,
  selectHelpDrawerTab,
  nextHelpDrawerTab,
  prevHelpDrawerTab } from '../../actions/HelpDrawerActions';
import helpTabs from './helpTabs';
import './BottomDrawer.scss';
import bulbIcon from '../../static/bulb.svg';

class BottomDrawer extends Component {
  constructor (props) {
    super(props);
    this.closeDrawer = ::this.closeDrawer;
    this.openDrawer = ::this.openDrawer;
    this.handleKeyDown = ::this.handleKeyDown;
    this.selectTab = ::this.selectTab;
    this.onConsoleCommandEnter = ::this.onConsoleCommandEnter;
    this.initialRender = true;
  }

  closeDrawer () {
    if (this.props.helpDrawer.isOpen) {
      this.props.dispatch(closeHelpDrawer());
    }
  }

  openDrawer () {
    if (!this.props.helpDrawer.isOpen) {
      this.props.dispatch(openHelpDrawer());
    }
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
    const current = find(helpTabs, { name: this.props.helpDrawer.selectedTab });

    if (this.prevTab && this.prevTab !== this.props.helpDrawer.selectedTab) {
      const prev = find(helpTabs, { name: this.prevTab });

      setTimeout(() => {
        this.prevTab = null;
        requestAnimationFrame(() => this.forceUpdate());
      }, 350);

      if (helpTabs.indexOf(prev) < helpTabs.indexOf(current)) {
        return <div className='help-container__tab-wrapper help-container__tab-wrapper--swipe-left'>
          {prev.content}
          {current.content}
        </div>;
      } else {
        return <div className='help-container__tab-wrapper help-container__tab-wrapper--swipe-right'>
          {current.content}
          {prev.content}
        </div>;
      }
    }

    return <div className='help-container__tab-wrapper'>
      {current.content}
    </div>;
  }

  handleKeyDown ({ target, keyCode }) {
    const { helpDrawer: { isOpen }, dispatch } = this.props;

    if (isOpen) {
      const [CODE_ESC, CODE_ENTER, CODE_LEFT, CODE_RIGHT] = [27, 13, 37, 39];

      switch (event.keyCode) {
        case CODE_ESC:
          this.closeDrawer();
          break;
        case CODE_ENTER:
          if (this.props.helpDrawer.isOpen) {
            this.closeDrawer();
          }
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

  onConsoleCommandEnter (command) {
    this.props.dispatch(enterCommand(command));
  }

  componentWillReceiveProps ({ helpDrawer }) {
    if (this.props.helpDrawer.isOpen && this.props.helpDrawer.selectedTab !== helpDrawer.selectedTab) {
      this.prevTab = this.props.helpDrawer.selectedTab;
    }
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

        <div className={'bottom-drawer__info' + (this.props.helpDrawer.info ? ' bottom-drawer__info--active' : '')}
          onClick={this.openDrawer}>
          <div className='bottom-drawer__info-icon-container'>
            <img src={bulbIcon} className='bottom-drawer__info-icon' />
          </div>
          Need help with <span className='bottom-drawer__info-command'>{this.props.helpDrawer.selectedTab}</span>?
          Click here or type <span className='bottom-drawer__info-command'>help</span> in console!
        </div>

        <div onClick={this.closeDrawer}>
          <Console
            enabled={!this.props.tutorial.current}
            files={this.props.tree}
            branches={['develop', 'master']}
            onCommandEnter={this.onConsoleCommandEnter} />
        </div>

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

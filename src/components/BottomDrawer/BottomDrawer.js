import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import Console from '../Console';
import { closeHelpDrawer, selectHelpDrawerTab } from '../../actions/HelpDrawerActions';
import helpTabs from './helpTabs';
import './BottomDrawer.scss';

class BottomDrawer extends Component {
  constructor (props) {
    super(props);
    this.closeDrawer = ::this.closeDrawer;
  }

  closeDrawer () {
    this.props.dispatch(closeHelpDrawer());
  }

  selectTab (tab) {
    return () => this.props.dispatch(selectHelpDrawerTab(tab));
  }

  renderTabNavigation () {
    return helpTabs.map(({ name }) => {
      let className = 'help-container__nav-item';
      if (this.props.selectedTab === name) {
        className += ' help-container__nav-item--active';
      }
      return <a className={className} onClick={this.selectTab(name)}>{name}</a>;
    });
  }

  renderCurrentTab () {
    return find(helpTabs, { name: this.props.selectedTab }).content;
  }

  render () {
    const getClasses = (className) => {
      return this.props.isOpen ? `${className} ${className}--visible` : className;
    };

    return <div>
      <div className={getClasses('bottom-drawer__overlay')} onClick={this.closeDrawer} />
      <div className={getClasses('bottom-drawer__container')}>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Console from '../Console';
import { closeHelpDrawer } from '../../actions/HelpDrawerActions';
import './BottomDrawer.scss';

class BottomDrawer extends Component {
  constructor (props) {
    super(props);
    this.closeDrawer = ::this.closeDrawer;
  }

  closeDrawer () {
    this.props.dispatch(closeHelpDrawer());
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
          aaaa
        </div>
      </div>
    </div>;
  }
};

export default connect(({ helpDrawer: { isOpen } }) => {
  return { isOpen };
})(BottomDrawer);

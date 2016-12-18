import React, { Component } from 'react';
import { connect } from 'react-redux';
import Console from '../Console';
import './BottomDrawer.scss';

class BottomDrawer extends Component {
  render () {
    let classes = 'bottom-drawer';

    if (this.props.isOpen) {
      classes += ' bottom-drawer--visible';
    }

    return <div className={classes}>
      <Console />
      <div className='bottom-drawer__help-container'>
        aaaa
      </div>
    </div>;
  }
};

export default connect(({ helpDrawer: { isOpen } }) => {
  return { isOpen };
})(BottomDrawer);

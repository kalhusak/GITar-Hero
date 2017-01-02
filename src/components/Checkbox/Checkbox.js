import React, { Component, PropTypes } from 'react';
import Check from '../Check';
import './Checkbox.scss';

export default class Checkbox extends Component {

  static propTypes = {
    value: PropTypes.bool.isRequired
  };

  render () {
    return (
      <div className='checkbox'>
        <div className='checkbox__check'>
          <Check checked={this.props.value} size={20} colorInactive='transparent' colorActive='white' />
        </div>
      </div>
    );
  }
};

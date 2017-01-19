import React, { Component, PropTypes } from 'react';

export default class TutorialItem extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired
  };

  render () {
    return <div className={this.props.enabled ? 'tutorial__active-item' : ''}>
      {this.props.children}
    </div>;
  }
}

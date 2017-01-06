import React, { Component, PropTypes } from 'react';
import './File.scss';
import modifiedIcon from '../../static/modified.svg';
import addedIcon from '../../static/added.svg';
import removedIcon from '../../static/removed.svg';

export default class File extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string,
    changeType: PropTypes.string
  };

  renderIcon (changeType = 'modified') {
    const iconMap = {
      modified: modifiedIcon,
      added: addedIcon,
      removed: removedIcon
    };

    return <img src={iconMap[changeType]} className='file__icon' />;
  }

  render () {
    const classNames = ['file'];

    if (this.props.status === 'unstaged') {
      classNames.push('file--red');
    } else if (this.props.status === 'staged') {
      classNames.push('file--green');
    }

    return (
      <div className={classNames.join(' ')}>
        {this.props.status !== 'unmodified' ? this.renderIcon(this.props.changeType) : ''}
        <span>{this.props.name}</span>
      </div>
    );
  }

}

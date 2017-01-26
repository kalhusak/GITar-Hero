import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import File from '../../components/File';
import { hasFilesToShow, itemsCount } from '../../utils/TreeUtils';
import dropdownIcon from '../../static/dropdown.svg';
import './Tree.scss';

class Tree extends Component {
  renderFile ({ name, status, removed, changeType }) {
    return <div className='tree__item-inner'>
      <div className='tree__file-branch' />
      <div className='tree__item-name'>
        <File name={name} status={status} changeType={changeType} />
      </div>
    </div>;
  }

  renderDirectory ({ name, children }) {
    const showDirectoryContent = hasFilesToShow(children);
    const wrapperStyle = {
      maxHeight: `${itemsCount(children) * 23}px`
    };
    const wrapperClass = 'tree__directory-content-wrapper' +
      (showDirectoryContent ? '' : ' tree__directory-content-wrapper--wrapped');

    return <div>
      <div className='tree__item-inner'>
        <div className={'tree__directory-branch' + (showDirectoryContent ? '' : ' tree__directory-branch--hidden')} />
        <div className='tree__item-name'>
          <img src={dropdownIcon}
            className={'tree__dropdown-icon' + (showDirectoryContent ? '' : ' tree__dropdown-icon--closed')} />
          {name}
        </div>
      </div>
      <div className={wrapperClass} style={wrapperStyle}>
        {this.renderRecursively(children)}
      </div>
    </div>;
  }

  renderRecursively (items = []) {
    return items.map((item, index) => {
      return <div key={index} className='tree__item'>
        {item.children ? this.renderDirectory(item) : this.renderFile(item)}
      </div>;
    });
  }

  renderItems () {
    return <div className='tree__items'>
      {this.renderRecursively(this.props.tree)}
    </div>;
  }

  renderEmptyState () {
    return <div className='tree__empty-state'>directory is empty :-(</div>;
  }

  renderTree () {
    return <div className='tree__scroller'>
      <div className='tree__inner'>
        { this.renderItems() }
      </div>
    </div>;
  }

  onWheel (event) {
    event.stopPropagation();
  }

  componentDidMount () {
    this.refs.tree.addEventListener('wheel', this.onWheel);
  }

  componentWillUnmount () {
    this.refs.tree.removeEventListener('wheel', this.onWheel);
  }

  render () {
    return (
      <div ref='tree' className='tree'>
        <h2 className='tree__heading'>working tree</h2>
        { this.props.tree.length === 0 ? this.renderEmptyState() : this.renderTree() }
      </div>
    );
  }
}

export default connect(state => pick(state, ['tree']))(Tree);

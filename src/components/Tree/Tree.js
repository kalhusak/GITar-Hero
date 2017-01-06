import React, { Component } from 'react';
import { connect } from 'react-redux';
import File from '../File';
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

  renderDirectory ({ name, children }, nestLevel) {
    return <div>
      <div className='tree__item-inner'>
        <div className='tree__directory-branch' />
        <div className='tree__item-name'>
          {name}
        </div>
      </div>
      {this.renderRecursively(children, nestLevel + 1)}
    </div>;
  }

  renderRecursively (items = [], nestLevel = 0) {
    return items.map((item, index) => {
      return <div key={index} className='tree__item'>
        {item.children ? this.renderDirectory(item, nestLevel) : this.renderFile(item)}
      </div>;
    });
  }

  renderEmptyState () {
    return <div className='tree__empty-state'>directory is empty :-(</div>;
  }

  render () {
    return (
      <div className='tree'>
        <h2 className='tree__heading'>working tree</h2>
        { this.props.tree.length > 0 ? this.renderRecursively(this.props.tree) : this.renderEmptyState() }
      </div>
    );
  }
}

export default connect(({ tree }) => {
  return { tree };
})(Tree);

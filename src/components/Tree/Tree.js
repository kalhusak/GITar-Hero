import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import File from '../File';
import './Tree.scss';

class Tree extends Component {

  static propTypes = {
    items: PropTypes.object.isRequired
  };

  renderRecursively (items = [], nestLevel = 0) {
    return items.map((item, index) => {
      if (item.type === 'directory') {
        return <div key={index} className='tree_directory'>
          {this.renderRecursively(item.children, nestLevel + 1)}
        </div>;
      } else {
        const fileStyle = {
          paddingLeft: `${nestLevel * 20}px`
        };

        return <div className='tree__file' style={fileStyle}>
          <File key={index} name={item.name} status={item.status} />
        </div>;
      }
    });
  }

  render () {
    return (
      <div className='tree'>
        {this.renderRecursively(this.props.tree)}
      </div>
    );
  }
}

export default connect(({ tree }) => {
  return { tree };
})(Tree);

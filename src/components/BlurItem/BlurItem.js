import React, { PropTypes } from 'react';

export default function BlurItem (props) {
  return <div className={props.noBlur ? 'tutorial__active-item' : ''} style={props.style}>
    {props.children}
  </div>;
}

BlurItem.propTypes = {
  noBlur: PropTypes.bool.isRequired,
  style: PropTypes.object
};

import React, { PropTypes } from 'react';
import './BlurItem.scss';

export default function BlurItem (props) {
  const classes = ['blur-item'];

  if (props.blur) {
    classes.push('blur-item--blur');
  }

  if (!props.active) {
    classes.push('blur-item--inactive');
  }

  return <section className={classes.join(' ')} style={props.style}>
    {props.children}
  </section>;
}

BlurItem.propTypes = {
  blur: PropTypes.bool.isRequired,
  active: PropTypes.bool,
  style: PropTypes.object
};

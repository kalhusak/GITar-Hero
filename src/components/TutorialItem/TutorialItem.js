import React, { PropTypes } from 'react';

export default function TutorialItem (props) {
  return <div className={props.enabled ? 'tutorial__active-item' : ''} style={props.style}>
    {props.children}
  </div>;
}

TutorialItem.propTypes = {
  enabled: PropTypes.bool.isRequired,
  style: PropTypes.object
};

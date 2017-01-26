import React from 'react';
import './Panel.scss';

export default function Panel (props) {
  const renderTitle = () => {
    if (props.title) {
      return <div className='panel__title'>
        {props.title}
      </div>;
    }
  };

  return <div className={'panel' + (props.className ? ` ${props.className}` : '')}>
    {renderTitle()}
    <div className={'panel__inner' + (props.title ? ' panel__inner--with-title' : '')}>
      {props.children}
    </div>
  </div>;
}

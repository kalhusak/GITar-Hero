import React from 'react';
import File from '../File';

export const taskList = {
  template: <div>
    <p>On the right, you can see your current task.</p>
    <p>Every task consists of some steps you need to complete in specified order.
    Try to finish the task as quick as you can to get higher score!</p>
  </div>,
  button: 'Ok, get it!',
  style: {
    top: '100px',
    right: '390px'
  }
};

export const tree = {
  template: <div><p>And finally - directory tree.
    You can see the state of your project's files here.
    Take a look at the explaination for colors and icons below:</p>
    <File name='unmodified' status='unmodified' /><br />
    <File name='modified (changed)' status='unstaged' changeType='modified' /><br />
    <File name='modified (added)' status='unstaged' changeType='added' /><br />
    <File name='modified (removed)' status='unstaged' changeType='removed' /><br />
    <File name='staged (changed)' status='staged' changeType='modified' /><br />
    <File name='staged (added)' status='staged' changeType='added' /><br />
    <File name='staged (removed)' status='staged' changeType='removed' /></div>,
  button: 'Ok, get it!',
  style: {
    top: '100px',
    left: '290px'
  }
};

export const console = {
  template: <div>
    <p>At the bottom you can see a console. Type commands in to complete your tasks.</p>
    <p>Tip: you can use autocompletion and history.</p>
  </div>,
  button: 'Ok, get it!',
  style: {
    bottom: '120px',
    left: '50%',
    transform: 'translateX(-50%)'
  }
};

export const intro = {
  template: <div>Welcome to GITar-Hero, first game that will teach you the basics and good practices of Git!</div>,
  button: 'Ok!',
  style: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

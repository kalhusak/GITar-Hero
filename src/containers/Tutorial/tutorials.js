import React from 'react';
import File from '../../components/File';

export const taskList = {
  title: 'On the right, you will see your tasks',
  template: <div>
    <p>Every task consists of some steps you need to complete in specified order.
    Try to finish the task as quick as you can to get higher score!</p>
  </div>,
  button: 'Ok, get it!',
  style: {
    top: '230px',
    left: 'calc(81.25% - 40px)',
    transform: 'translateX(-100%)'
  }
};

export const tree = {
  title: 'And finally - directory tree on the right',
  template: <div><p>You can see the state of your project's files here.
    Take a look at the explaination for colors and icons below:</p>
    <table style={{ margin: '0 auto' }}>
      <tr>
        <th />
        <th>added</th>
        <th>modified</th>
        <th>removed</th>
      </tr>
      <tr>
        <th>unstaged</th>
        <td><File name='file.txt' status='unstaged' changeType='added' /></td>
        <td><File name='file.txt' status='unstaged' changeType='modified' /></td>
        <td><File name='file.txt' status='unstaged' changeType='removed' /></td>
      </tr>
      <tr>
        <th>staged</th>
        <td><File name='file.txt' status='staged' changeType='added' /></td>
        <td><File name='file.txt' status='staged' changeType='modified' /></td>
        <td><File name='file.txt' status='staged' changeType='removed' /></td>
      </tr>
      <tr>
        <th style={{ paddingTop: '20px' }}>unmodified file</th>
        <td colSpan='3' style={{ paddingTop: '20px' }}><File name='file.txt' status='unmodified' /></td>
      </tr>
    </table>
  </div>,
  button: 'Ok, let\'s start!',
  style: {
    top: '216px',
    left: 'calc(6.25% + 160px)'
  }
};

export const console = {
  title: 'At the bottom you can see a console',
  template: <div>
    <p>Type commands in to complete your tasks.<br />
      Use <File name='Tab' status='unmodified' /> for autocompletion
      and <File name='&uarr;' status='unmodified' /> for history.</p>
  </div>,
  button: 'Alright!',
  style: {
    top: 'calc(100% - 120px)',
    left: '50%',
    transform: 'translate(-50%, -100%)'
  }
};

export const intro = {
  title: 'Welcome to GITar-Hero',
  template: <div>The first game that will teach you the basics and good practices of Git!</div>,
  button: 'Ok, I\'m in',
  style: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

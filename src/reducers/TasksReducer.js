import * as actions from '../actions/CommandActions';
import _ from 'lodash';
import TaskUtils from '../utils/TaskUtils';

const defaultState = {
  current: '1',
  list: {
    '1': {
      id: '1',
      title: 'Commit modified files',
      steps: ['1', '2']
    },
    '2': {
      id: '2',
      title: 'Create branch and download from remote',
      steps: ['3', '4']
    }
  },
  steps: {
    current: '1',
    list: {
      '1': {
        id: '1',
        description: 'stage files',
        executed: false,
        allowedCommands: [
          'git add -u',
          'git add'
        ]
      },
      '2': {
        id: '2',
        description: 'make a commit',
        executed: false,
        allowedCommands: [
          'git commit'
        ]
      },
      '3': {
        id: '3',
        description: 'create branch',
        executed: false,
        allowedCommands: [
          'git branch',
          'git checkout -b'
        ]
      },
      '4': {
        id: '4',
        description: 'download changes from origin',
        executed: false,
        allowedCommands: [
          'git pull'
        ]
      }
    }
  },
  // TODO pimosa remove it. its only for test
  i: 3
};

export default function tasksReducers (state = defaultState, action) {
  switch (action.type) {
    case actions.NEW_VALID_COMMAND:
      var newState = _.cloneDeep(state);
      return onNewValidCommand(newState);
    default:
      return state;
  }
}

function onNewValidCommand (state) {
  TaskUtils.setCurrentStepExecuted(state);
  TaskUtils.deleteCurrentTaskAndStepsIfCompleted(state);
  return state;
}

import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import TaskUtils from '../utils/TaskUtils';
import _ from 'lodash';

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
    case commandActions.NEW_VALID_COMMAND:
      var newState = _.cloneDeep(state);
      return onNewValidCommand(newState);
    case taskActions.LAST_STEP_EXECUTED:
      var newState = _.cloneDeep(state);
      return onLastStepExecuted(newState);
    default:
      return state;
  }
}

function onNewValidCommand (state) {
  TaskUtils.setCurrentStepExecuted(state.steps);
  TaskUtils.setCurrentStepOnNext(state);
  return state;
}

function onLastStepExecuted (state) {
  TaskUtils.deleteCurrentTask(state);
  TaskUtils.setCurrentTaskOnNext(state);
  return state;
}

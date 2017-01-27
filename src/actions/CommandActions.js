import * as TaskUtils from '../utils/TaskUtils';
import * as taskActions from '../actions/TaskActions';
import * as treeActions from '../actions/TreeActions';
import * as helpDrawerActions from '../actions/HelpDrawerActions';
import { createAction } from '../utils';
import StatisticsUtils from '../utils/StatisticsUtils';
import TagUtils from '../utils/TagUtils';

export const NEW_VALID_COMMAND = 'NEW_VALID_COMMAND';
export const NEW_INVALID_COMMAND = 'NEW_INVALID_COMMAND';
export const ACTIVATE_STEP = 'ACTIVATE_STEP';

export const newValidCommand = (command, step) => (dispatch, getState) => {
  const doneStep = TaskUtils.getCurrentStep(getState().tasks);
  if (doneStep.data && doneStep.data.after) {
    dispatch(treeActions.modifyTree(doneStep.data.after));
  }

  dispatch(createAction(NEW_VALID_COMMAND, { command, step }));

  const currentTask = TaskUtils.getCurrentTask(getState().tasks);
  if (currentTask.currentStepIndex === currentTask.steps.length) {
    const timeElapsed = (Date.now() - getState().tasks.startTime) / 1000;
    const reward = StatisticsUtils.calculateTaskReward(currentTask, timeElapsed);
    dispatch(taskActions.lastStepExecuted(reward));
  }

  const nextStep = TaskUtils.getCurrentStep(getState().tasks);
  let modifyTree = false;
  if (nextStep.data && nextStep.data.before) {
    if (nextStep.type === 'ADD' && nextStep.data.before.removeFiles) {
      nextStep.data.before.unstagedRemoveFiles = nextStep.data.before.removeFiles;
      nextStep.data.before.removeFiles = [];
      modifyTree = true;
    }
  }

  if (modifyTree) {
    setTimeout(() => {
      dispatch(createAction(ACTIVATE_STEP));
      dispatch(treeActions.modifyTree(nextStep.data.before));
    }, 1000);
  } else {
    dispatch(createAction(ACTIVATE_STEP));
  }

  const newTag = TagUtils.getNewTag(getState().tasks);
  if (newTag && TagUtils.isHelpTabForTag(newTag)) {
    dispatch(helpDrawerActions.showHelpDrawerInfo(newTag));
  }
};

export const newInvalidCommand = command => createAction(NEW_INVALID_COMMAND, { command });

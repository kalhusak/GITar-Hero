import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import * as treeActions from '../actions/TreeActions';
import { autoOpenHelpDrawerTab } from '../actions/HelpDrawerActions';
import * as TaskUtils from '../utils/TaskUtils';
import TagUtils from '../utils/TagUtils';
import StatisticsUtils from '../utils/StatisticsUtils';

export default ({ getState }) => (next) => (action) => {
  if (action.type === commandActions.NEW_VALID_COMMAND) {
    const doneStep = TaskUtils.getCurrentStep(getState().tasks);
    next(action);
    const nextStep = TaskUtils.getCurrentStep(getState().tasks);

    if (doneStep.data && doneStep.data.after) {
      next(treeActions.modifyTree(doneStep.data.after));
    }

    if (nextStep.data && nextStep.data.before) {
      if (nextStep.type === 'ADD' && nextStep.data.before.removeFiles) {
        nextStep.data.before.unstagedRemoveFiles = nextStep.data.before.removeFiles;
        nextStep.data.before.removeFiles = [];
      }
      next(treeActions.modifyTree(nextStep.data.before));
    }

    const currentTask = TaskUtils.getCurrentTask(getState().tasks);
    if (currentTask.currentStepIndex === currentTask.steps.length) {
      const timeElapsed = (Date.now() - getState().tasks.startTime) / 1000;
      const reward = StatisticsUtils.calculateTaskReward(currentTask, timeElapsed);
      next(taskActions.lastStepExecuted(reward));
    }

    const newTag = TagUtils.getNewTag(getState().tasks);
    if (newTag && TagUtils.isHelpTabForTag(newTag)) {
      next(autoOpenHelpDrawerTab(newTag));
    }
  } else {
    next(action);
  }
};

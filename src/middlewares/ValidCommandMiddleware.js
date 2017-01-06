import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import * as treeActions from '../actions/TreeActions';
import { autoOpenHelpDrawerTab } from '../actions/HelpDrawerActions';
import { pick } from 'lodash';
import * as TaskUtils from '../utils/TaskUtils';
import TagUtils from '../utils/TagUtils';
import StatisticsUtils from '../utils/StatisticsUtils';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === commandActions.NEW_VALID_COMMAND) {
    const currentStep = TaskUtils.getCurrentStep(getState().tasks);
    if (currentStep && currentStep.data) {
      if (currentStep.data.newFiles || currentStep.data.modifyFiles || currentStep.data.removeFiles) {
        next(treeActions.modifyTree(pick(currentStep.data, ['newFiles', 'modifyFiles', 'removeFiles'])));
      }
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
  }
};

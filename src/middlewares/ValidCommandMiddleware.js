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
    const state = getState();
    const currentStep = TaskUtils.getCurrentStep(state.tasks);

    if (currentStep && currentStep.data) {
      if (currentStep.data.newFiles || currentStep.data.modifyFiles || currentStep.data.removeFiles) {
        next(treeActions.modifyTree(pick(currentStep.data, ['newFiles', 'modifyFiles', 'removeFiles'])));
      }
    }

    action = getNextAction(state);
    if (action) {
      next(action);
    }
    var newTag = TagUtils.getNewTag(getState().tasks);
    if (newTag && TagUtils.isHelpTabForTag(newTag)) {
      next(autoOpenHelpDrawerTab(newTag));
    }
  }
};

function getNextAction (state) {
  var currentStep = TaskUtils.getCurrentStep(state.tasks);
  if (!currentStep) {
    var currentTask = TaskUtils.getCurrentTask(state.tasks);
    var taskTimeElapsed = (Date.now() - state.tasks.startTime) / 1000;
    var reward = StatisticsUtils.calculateTaskReward(currentTask, taskTimeElapsed);
    return taskActions.lastStepExecuted(reward);
  }
  return null;
}

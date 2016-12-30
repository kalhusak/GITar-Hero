import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import { selectHelpDrawerTab } from '../actions/HelpDrawerActions';
import TaskUtils from '../utils/TaskUtils';
import TagUtils from '../utils/TagUtils';
import StatisticsUtils from '../utils/StatisticsUtils';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === commandActions.NEW_VALID_COMMAND) {
    action = getNextAction(getState());
    if (action) {
      next(action);
    }
    var newTag = TagUtils.getNewTag(getState().tasks);
    if (newTag && TagUtils.isHelpTabForTag(newTag)) {
      next(selectHelpDrawerTab(newTag));
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

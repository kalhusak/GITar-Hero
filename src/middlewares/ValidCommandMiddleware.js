import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import { autoOpenHelpDrawerTab } from '../actions/HelpDrawerActions';
import TaskUtils from '../utils/TaskUtils';
import TagUtils from '../utils/TagUtils';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === commandActions.NEW_VALID_COMMAND) {
    action = getNextAction(getState());
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
  return !currentStep ? taskActions.lastStepExecuted() : null;
}

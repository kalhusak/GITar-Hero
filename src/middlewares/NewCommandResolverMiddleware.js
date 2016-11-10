import commandResolver from '../resolvers/CommandResolver';
import * as consoleActions from '../actions/ConsoleActions';
import TaskUtils from '../utils/TaskUtils';

export default ({ getState }) => (next) => (action) => {
  if (action.type === consoleActions.NEW_COMMAND) {
    next(action);
    action = getNextActionFromCommandResolver(action, getState());
  }
  next(action);
};

function getNextActionFromCommandResolver (oldAction, state) {
  var currentStep = TaskUtils.getCurrentStep(state.tasks.steps);
  return commandResolver(oldAction.payload.command, currentStep.allowedCommands);
}

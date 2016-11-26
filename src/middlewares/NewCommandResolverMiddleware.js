import commandResolver from '../resolvers/CommandResolver';
import * as commandActions from '../actions/CommandActions';
import * as consoleActions from '../actions/ConsoleActions';
import TaskUtils from '../utils/TaskUtils';

export default ({ getState }) => (next) => (action) => {
  if (action.type === consoleActions.NEW_COMMAND) {
    next(action);
    action = getNextAction(action, getState());
  }
  next(action);
};

function getNextAction (oldAction, state) {
  var currentStep = TaskUtils.getCurrentStep(state.tasks);
  var command = oldAction.payload.command;
  var isValid = commandResolver(command, currentStep.command);
  return isValid ? commandActions.newValidCommand(command) : commandActions.newInvalidCommand(command);
}

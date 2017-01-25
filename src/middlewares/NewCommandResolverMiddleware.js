import CommandResolver from '../resolvers/CommandResolver';
import * as commandActions from '../actions/CommandActions';
import * as consoleActions from '../actions/ConsoleActions';
import * as helpDrawerActions from '../actions/HelpDrawerActions';
import * as TaskUtils from '../utils/TaskUtils';
import Config from '../config';

export default ({ getState }) => (next) => (action) => {
  if (action.type === consoleActions.ENTER_COMMAND) {
    if (action.payload.command === 'help') {
      action = helpDrawerActions.toggleHelpDrawer();
    } else {
      const currentStep = TaskUtils.getCurrentStep(getState().tasks);
      const isValid = CommandResolver.checkIsCommandAllowed(action.payload.command, currentStep.commands);

      if (isValid || Config.noCommandValidation) {
        action = commandActions.newValidCommand(action.payload.command, currentStep);
      } else {
        action = commandActions.newInvalidCommand(action.payload.command);
      }
    }
  }
  next(action);
};

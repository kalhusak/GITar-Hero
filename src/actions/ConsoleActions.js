import CommandResolver from '../resolvers/CommandResolver';
import * as commandActions from '../actions/CommandActions';
import * as helpDrawerActions from '../actions/HelpDrawerActions';
import * as TaskUtils from '../utils/TaskUtils';
import Config from '../config';

export const enterCommand = command => (dispatch, getState) => {
  if (command === 'help' && !getState().helpDrawer.isOpen) {
    dispatch(helpDrawerActions.openHelpDrawer());
  } else {
    const currentStep = TaskUtils.getCurrentStep(getState().tasks);

    if (currentStep) {
      const isValid = CommandResolver.checkIsCommandAllowed(command, currentStep.commands);

      if (isValid || Config.noCommandValidation) {
        dispatch(commandActions.newValidCommand(command, currentStep));
      } else {
        dispatch(commandActions.newInvalidCommand(command));
      }
    }
  }
};

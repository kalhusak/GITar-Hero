import commandResolver from '../resolvers/CommandResolver';
import * as consoleActions from '../actions/ConsoleActions';

export default ({ getState }) => (next) => (action) => {
  if (action.type === consoleActions.NEW_COMMAND) {
    next(action);
    var tasks = getState().tasks;
    var currentTask = tasks.list[0];
    var step = currentTask.steps.find(({ executed }) => !executed);
    console.log('STEP', step);
    action = commandResolver(action.payload.command, step.allowedCommands);
  }
  return next(action);
};

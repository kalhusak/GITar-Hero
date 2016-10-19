import commandResolver from '../resolvers/CommandResolver'
import * as consoleActions from '../actions/ConsoleActions';

export default ({ getState }) => {
  return (next) => {
    return (action) => {
      if(action.type == consoleActions.NEW_COMMAND){
        next(action);
        action = commandResolver(action.payload.command,  "allowedCommandsFromTasks");
      }
      return next(action);
    }
  }
}

import * as actions from '../actions/CommandActions'

export default (command, allowedCommands) => {
  return command.indexOf('git') !== -1 ?
      actions.newValidCommand(command) :
      actions.newInvalidCommand(command);
}

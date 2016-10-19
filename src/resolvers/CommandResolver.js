import * as actions from '../actions/consoleActions'

export default (command, allowedCommands) => {
  return command.indexOf('git') !== -1 ?
      actions.newValidCommand() :
      actions.newInvalidCommand();
}

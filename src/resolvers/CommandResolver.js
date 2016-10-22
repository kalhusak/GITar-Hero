import * as actions from '../actions/CommandActions'

export default (command, allowedCommands) => {
      return allowedCommands.indexOf(command) !== -1 ?
      actions.newValidCommand(command) :
      actions.newInvalidCommand(command);
}

class CommandResolver {
  constructor () {
    this.checkIsCommandAllowed = this.checkIsCommandAllowed.bind(this);
  }

  // TODO write something more smart
  checkIsCommandAllowed (command, allowedCommands) {
    return allowedCommands.indexOf(command) > -1;
  }
}

export default new CommandResolver();

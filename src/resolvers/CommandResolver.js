class CommandResolver {
  constructor () {
    this.checkIsCommandAllowed = this.checkIsCommandAllowed.bind(this);
  }

  checkIsCommandAllowed (command, allowedCommand) {
    // TODO write something more smart
    return command === allowedCommand;
  }

  getCommandType (command) {
    // TODO write something more smart
    if (command.contains('commit'))
      return this._getCos('commit', {
        message: 'jakas wiadomosc'
      });
  }

  _getCos(type, payload){
    return {
      type,
      payload
    };
  }
}

export default new CommandResolver();

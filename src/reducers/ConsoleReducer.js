import * as actions from '../actions/ConsoleActions';

export default function consoleReducer (state = {}, action) {
  switch (action.type) {
    case actions.ENTER_COMMAND:
      return Object.assign({}, state, {
        commands: state.commands.concat(action.payload.command)
      });
    default:
      return state;
  }
}

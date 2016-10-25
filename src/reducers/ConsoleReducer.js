import * as actions from '../actions/ConsoleActions';

const defaultState = {
  commands: []
};

export default function consoleReducer (state = defaultState, action) {
  switch (action.type) {
    case actions.NEW_COMMAND:
      return Object.assign({}, state, {
        commands: state.commands.concat(action.payload.command)
      });
    default:
      return state;
  }
}

import * as actions from '../actions/ConsoleActions';

const initialState = {
  commands: []
};

export default function consoleReducer (state = initialState, action) {
  switch (action.type) {
    case actions.ENTER_COMMAND:
      return Object.assign({}, state, {
        commands: state.commands.concat(action.payload.command)
      });
    default:
      return state;
  }
}

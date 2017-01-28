import * as consoleActions from '../actions/ConsoleActions';
import * as commandActions from '../actions/CommandActions';
import { assign } from 'lodash';

const initialState = {
  commands: [],
  branches: []
};

export default function consoleReducer (state = initialState, { type, payload }) {
  switch (type) {
    case consoleActions.ENTER_COMMAND:
      return assign({}, state, {
        commands: state.commands.concat(payload.command)
      });

    case commandActions.NEW_VALID_COMMAND:
      if (payload.step.type === 'BRANCH' || payload.step.type === 'CHECKOUT') {
        return assign({}, state, {
          branches: state.branches.concat(payload.step.data.name)
        });
      }
      return state;

    default:
      return state;
  }
}

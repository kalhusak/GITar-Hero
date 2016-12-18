import { cloneDeep } from 'lodash';
import * as commandActions from '../actions/CommandActions';
import * as helpDrawerActions from '../actions/HelpDrawerActions';

const initialState = {
  isOpen: false
};

export default function helpDrawerReducer (state = initialState, { type, payload }) {
  switch (type) {
    case helpDrawerActions.CLOSE_HELP_DRAWER:
      const newState = cloneDeep(state);
      newState.isOpen = false;
      return newState;

    case commandActions.NEW_INVALID_COMMAND:
      if (payload.command === 'help') {
        const newState = cloneDeep(state);
        newState.isOpen = !newState.isOpen;
        return newState;
      }
      return state;

    default:
      return state;
  }
}

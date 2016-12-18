import { cloneDeep } from 'lodash';
import * as commandActions from '../actions/CommandActions';

const initialState = {
  isOpen: false
};

export default function helpDrawerReducer (state = initialState, { type, payload }) {
  switch (type) {
    case commandActions.NEW_INVALID_COMMAND:
      if (payload.command === 'help') {
        const newState = cloneDeep(state);
        newState.isOpen = !newState.isOpen;
        return newState;
      }
      break;
    default:
      return state;
  }
}

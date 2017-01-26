import * as taskActions from '../actions/TaskActions';
import { cloneDeep } from 'lodash';

export default function summaryReducer (state = {}, action) {
  switch (action.type) {
    case taskActions.LAST_TASK_EXECUTED:
      return showSummary(cloneDeep(state));
    default:
      return state;
  }
}

function showSummary (state) {
  state.show = true;
  return state;
}


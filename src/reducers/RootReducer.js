import { combineReducers } from 'redux';
import consoleReducer from './ConsoleReducer';
import tasksReducer from './TasksReducer';
import initReducer from './InitReducer';

const combine = combineReducers({
  console: consoleReducer,
  tasks: tasksReducer
});

export default (state, action) => {
  var newState = initReducer(state, action);
  return combine(newState, action);
};

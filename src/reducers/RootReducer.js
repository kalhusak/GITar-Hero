import { combineReducers } from 'redux';
import consoleReducer from './ConsoleReducer';
import taskContainerReducer from './TaskContainerReducer';

export default combineReducers({
  console: consoleReducer,
  tasks: taskContainerReducer
});

import { combineReducers } from 'redux';
import consoleReducer from './ConsoleReducer';
import tasksReducer from './TasksReducer';

export default combineReducers({
  console: consoleReducer,
  tasks: tasksReducer
});

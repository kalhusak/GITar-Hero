import { combineReducers } from 'redux';
import consoleReducer from './ConsoleReducer';
import tasksReducer from './TasksReducer';
import initReducer from './InitReducer';
import lastActionReducer from './LastActionReducer';
import helpDrawerReducer from './helpDrawerReducer';
import pointsReducer from './PointsReducer';

const combine = combineReducers({
  console: consoleReducer,
  tasks: tasksReducer,
  lastAction: lastActionReducer,
  helpDrawer: helpDrawerReducer,
  points: pointsReducer
});

export default (state, action) => {
  var newState = initReducer(state, action);
  return combine(newState, action);
};

import { cloneDeep } from 'lodash';
import * as treeActions from '../actions/TreeActions';
import * as commandActions from '../actions/CommandActions';
import * as TreeUtils from '../utils/TreeUtils';

const initialState = [];

export default function treeReducer (state = initialState, { type, payload }) {
  switch (type) {
    case commandActions.NEW_VALID_COMMAND:
      switch (payload.step.type) {
        case 'ADD':
          const newState = cloneDeep(state);
          const [, target] = payload.command.match(/^git add ([a-zA-Z.-]*)/);

          if (target === '-A') {
            TreeUtils.addAll(newState);
          } else {
            TreeUtils.addPath(newState, target);
          }

          return newState;

        default:
          return state;
      }

    case treeActions.MODIFY_TREE:
      const newState = cloneDeep(state);
      const { newFiles, modifyFiles, removeFiles } = payload.changes;

      newFiles
        .concat(modifyFiles)
        .concat(removeFiles)
        .forEach(path => TreeUtils.pushNode(newState, path.split('/'), 'modified'));

      return newState;

    default:
      return state;
  }
}

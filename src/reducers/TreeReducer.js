import { cloneDeep } from 'lodash';
import * as treeActions from '../actions/TreeActions';
import * as commandActions from '../actions/CommandActions';
import * as TreeUtils from '../utils/TreeUtils';

const initialState = [];

export default function treeReducer (state = initialState, { type, payload }) {
  let newState;

  switch (type) {
    case commandActions.NEW_VALID_COMMAND:
      switch (payload.step.type) {
        case 'ADD':
          newState = cloneDeep(state);
          const [, target] = payload.command.match(/^git add ([a-zA-Z.-]*)/);

          if (target === '-A') {
            TreeUtils.addAll(newState);
          } else {
            TreeUtils.addPath(newState, target);
          }

          return newState;

        case 'COMMIT':
          newState = cloneDeep(state);

          TreeUtils.commit(newState);
          return newState;

        default:
          return state;
      }

    case treeActions.MODIFY_TREE:
      newState = cloneDeep(state);
      const { newFiles, modifyFiles, removeFiles } = payload.changes;

      newFiles
        .concat(modifyFiles)
        .forEach(path => TreeUtils.pushNode(newState, path.split('/'), 'modified'));

      removeFiles
        .forEach(path => TreeUtils.pushNode(newState, path.split('/'), 'removed'));

      return newState;

    default:
      return state;
  }
}

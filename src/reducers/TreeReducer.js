import { cloneDeep, first } from 'lodash';
import * as treeActions from '../actions/TreeActions';

const initialState = [];

const pushToTree = (subtree, path, status) => {
  if (path.length === 1) {
    subtree.push({
      name: first(path),
      status
    });
  } else {
    const name = first(path);
    let dir = find(subtree, { name });

    if (!dir) {
      dir = {
        name,
        children: []
      };
      subtree.push(dir);
    }

    pushToTree(dir.children, path.slice(1), status);
  }
};

export default function treeReducer (state = initialState, { type, payload }) {
  switch (type) {
    case treeActions.MODIFY_TREE:
      const newState = cloneDeep(state);

      payload.changes.newFiles.forEach(path => pushToTree(newState, path.split('/'), 'added'));
      payload.changes.modifyFiles.forEach(path => pushToTree(newState, path.split('/'), 'modified'));
      payload.changes.removeFiles.forEach(path => pushToTree(newState, path.split('/'), 'removed'));

      return newState;

    default:
      return state;
  }
}

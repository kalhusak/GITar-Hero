import { get } from 'lodash';
import * as treeActions from '../actions/TreeActions';

const initialState = [
  {
    name: 'readme.txt',
    status: 'modified'
  },
  {
    name: 'components',
    children: [
      {
        name: 'app.js',
        status: 'staged'
      }
    ]
  },
  {
    name: 'app.js',
    status: 'tracked'
  },
  {
    name: 'containers',
    children: [
      {
        name: 'hehe.js',
        status: 'added'
      },
      {
        name: 'static',
        children: [
          {
            name: 'app.js',
            status: 'tracked'
          }
        ]
      }
    ]
  }
];

export default function treeReducer (state = initialState, { type, payload }) {
  switch (type) {
    case treeActions.MODIFY_TREE:
      if (payload.changes) {
        debugger;
      }
      return state;

    default:
      return state;
  }
}

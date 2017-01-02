const initialState = [
  {
    name: 'readme.txt',
    status: 'tracked'
  },
  {
    name: 'components',
    type: 'directory',
    children: [
      {
        name: 'app.js',
        status: 'tracked'
      }
    ]
  }
];

export default function treeReducer (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

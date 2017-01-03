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

export default function treeReducer (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialState = [
  {
    name: 'readme.txt',
    status: 'tracked'
  },
  {
    name: 'components',
    children: [
      {
        name: 'app.js',
        status: 'tracked'
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
        status: 'tracked'
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

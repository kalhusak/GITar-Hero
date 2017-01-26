const config = {
  noCommandValidation: false, // option to debug whole tasks path just by pressing enter
  taskListSize: 1,
  allowedCommands: [
    'init ',
    'add :file: ',
    'merge :branch: ',
    'push ',
    'commit ',
    'branch ',
    'checkout :branch: ',
    'rebase :branch: :branch: ',
    'reset ']
};

export default config;

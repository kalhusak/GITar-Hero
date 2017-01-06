const config = {
  noCommandValidation: true, // option to debug whole tasks path just by pressing enter
  taskListSize: 2,
  allowedCommands: [
    'init',
    'add :file:',
    'merge :branch:',
    'push',
    'commit',
    'branch',
    'checkout :branch:',
    'rebase :branch: :branch:']
};

export default config;

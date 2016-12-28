var refSequence = 0;

function addCommitStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('commit', 'COMMIT');
    step.name = getNextRef();
    step.message = '';
    task.steps.push(step);
  }
  createCommitStepElement(step, index, 'Commit').insertBefore('#addNewStepProperty');
}

function addInitStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('init', 'INIT');
    task.steps.push(step);
  }
  createStepElement(step, index, 'Init').insertBefore('#addNewStepProperty');
}

function addCheckoutStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('checkout', 'CHECKOUT');
    step.toCommitOrBranch = 'branch';
    step.name = '';
    task.steps.push(step);
  }
  createCheckoutStepElement(step, index, 'Checkout').insertBefore('#addNewStepProperty');
}

function addPushStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('push', 'PUSH');
    task.steps.push(step);
  }
  createStepElement(step, index, 'Push').insertBefore('#addNewStepProperty');
}

function addPullStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('pull', 'PULL');
    task.steps.push(step);
  }
  createStepElement(step, index, 'Pull').insertBefore('#addNewStepProperty');
}

function addBranchStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('branch', 'BRANCH');
    step.name = '';
    task.steps.push(step);
  }
  createBranchStepElement(step, index, 'Branch').insertBefore('#addNewStepProperty');
}

function addMergeStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('merge', 'MERGE');
    step.sourceBranch = '';
    step.targetBranch = '';
    task.steps.push(step);
  }
  createMergeStepElement(step, index, 'Merge').insertBefore('#addNewStepProperty');
}

function addResetStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('reset', 'RESET');
    step.commitOrNumber = 'number';
    step.value = '1';
    task.steps.push(step);
  }
  createResetStepElement(step, index, 'Reset').insertBefore('#addNewStepProperty');
}

function createStep (command, type) {
  return {
    description: '',
    commands: 'git ' + command,
    tags: command,
    type: type
  };
}

function getNextRef (){
  refSequence++;
  return refSequence - 1;
}

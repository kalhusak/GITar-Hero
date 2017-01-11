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
    step = createStep('init', 'INIT', 'repo');
    task.steps.push(step);
  }
  createStepElement(step, index, 'Init').insertBefore('#addNewStepProperty');
}

function addRemoteStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('remote', 'REMOTE', 'remote repos');
    task.steps.push(step);
  }
  createStepElement(step, index, 'Remote').insertBefore('#addNewStepProperty');
}

function addCheckoutStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('checkout', 'CHECKOUT');
    step.toCommitOrBranch = 'branch';
    step.name = '';
    step.newFiles = "";
    step.removeFiles = "";
    task.steps.push(step);
  }
  createCheckoutStepElement(step, index, 'Checkout').insertBefore('#addNewStepProperty');
}

function addAddStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('add', 'ADD', 'stage');
    step.modifyFiles = "";
    step.removeFiles = "";
    task.steps.push(step);
  }
  createAddStepElement(step, index, 'Add').insertBefore('#addNewStepProperty');
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
    step.commitName1 = getNextRef();
    step.commitMessage1 = '';
    step.newFiles1 = "";
    step.removeFiles1 = "";
    step.commitName2 = getNextRef();
    step.commitMessage2 = '';
    step.newFiles2 = "";
    step.removeFiles2 = "";
    step.commitName3 = getNextRef();
    step.commitMessage3 = '';
    step.newFiles3 = "";
    step.removeFiles3 = "";
    task.steps.push(step);
  }
  for (var i=1; i<=3; i++) {
    if (!step['commitMessage' + i] && !step['commitName' + i]) {
      step['commitName' + i] = getNextRef();
      step['commitMessage' + i] = '';
    }
  }
  createPullStepElement(step, index, 'Pull').insertBefore('#addNewStepProperty');
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
    step.newFiles = "";
    step.removeFiles = "";
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
    step.newFiles = "";
    step.removeFiles = "";
    task.steps.push(step);
  }
  createResetStepElement(step, index, 'Reset').insertBefore('#addNewStepProperty');
}

function addTagStep (index, task) {
  var step = task.steps[index];
  if (!step) {
    step = createStep('tag', 'TAG');
    step.name = '';
    step.message = '';
    task.steps.push(step);
  }
  createTagStepElement(step, index, 'TAG').insertBefore('#addNewStepProperty');
}

function createStep (command, type, tags) {
  return {
    description: '',
    commands: 'git ' + command,
    tags: tags ? tags : command,
    type: type
  };
}

function getNextRef (){
  refSequence++;
  return refSequence - 1;
}

var selectedNode;
var titleInput;
var descriptionInput;
var timeInput;
init();

function onSelectNode (node) {
  console.log('Select', node);
  if (selectedNode !== node) {
    selectedNode = node;
    clearSteps();
    disable(false);
    fillEditor();
    fillSteps();
  }
}

function onAddStepClick (stepType) {
  if (!selectedNode.steps) {
    selectedNode.steps = [];
  }
  var index = selectedNode.steps.length;
  addStep(index, stepType);
}

function onDeleteStepClick (index) {
  selectedNode.steps.splice(index, 1);
  $('.step[index="'+index+'"]').remove();
}

function fillEditor () {
  titleInput.value = selectedNode.title || '';
  descriptionInput.value = selectedNode.description || '';
  timeInput.value = selectedNode.time || '';
}

function fillSteps () {
  if (selectedNode.steps) {
    for (var i=0; i<selectedNode.steps.length; i++) {
      addStep(i, selectedNode.steps[i].type);
    }
  }
}

function addStep (index, type) {
  switch (type) {
    case 'COMMIT':
      addCommitStep(index, selectedNode);
      break;
    case 'INIT':
      addInitStep(index, selectedNode);
      break;
    case 'REMOTE':
      addRemoteStep(index, selectedNode);
      break;
    case 'CHECKOUT':
      addCheckoutStep(index, selectedNode);
      break;
    case 'ADD':
      addAddStep(index, selectedNode);
      break;
    case 'PUSH':
      addPushStep(index, selectedNode);
      break;
    case 'PULL':
      addPullStep(index, selectedNode);
      break;
    case 'BRANCH':
      addBranchStep(index, selectedNode);
      break;
    case 'MERGE':
      addMergeStep(index, selectedNode);
      break;
    case 'RESET':
      addResetStep(index, selectedNode);
      break;
    case 'TAG':
      addTagStep(index, selectedNode);
      break;
    default:
      console.log('WARNING - Unknown step type!');;
      break;
  }
}

function onTitleChange () {
  selectedNode.title = titleInput.value;
  $('g .selected tspan').text(selectedNode.title);
}

function onDescriptionChange () {
  selectedNode.description = descriptionInput.value;
}

function onTimeChange () {
  selectedNode.time = parseInt(timeInput.value);
}

function init () {
  selectedNode = null;
  titleInput = document.getElementById('titleInput');
  descriptionInput = document.getElementById('descriptionInput');
  timeInput = document.getElementById('timeInput');

  titleInput.addEventListener('input', onTitleChange);
  descriptionInput.addEventListener('input', onDescriptionChange);
  timeInput.addEventListener('input', onTimeChange);

  clear();
  clearSteps();
  disable(true);
}

function clearSteps () {
  $('#steps').children(':not(#addNewStepProperty)').remove();
}

function disable (isDisable) {
  titleInput.disabled = isDisable;
  descriptionInput.disabled = isDisable;
  timeInput.disabled = isDisable;
  document.getElementById('addStepButton').disabled = isDisable;
}

function clear () {
  titleInput.value = '';
  descriptionInput.value = '';
  timeInput.value = '';
}

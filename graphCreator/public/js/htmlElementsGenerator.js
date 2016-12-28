function createCommitStepElement (step, index, label) {
  var additionalProperties = [];
  additionalProperties.push(createPropertyElement('nameInput' + index, 'Name', step, 'name'));
  additionalProperties.push(createPropertyElement('messageInput' + index, 'Message', step, 'message'));
  return createStepElement(step, index, label, additionalProperties);
}

function createCheckoutStepElement (step, index, label) {
  var additionalProperties = [];
  additionalProperties.push(createPropertyElement('toCommitOrBranchInput' + index, 'Commit/Branch', step, 'toCommitOrBranch'));
  additionalProperties.push(createPropertyElement('nameInput' + index, 'Name', step, 'name'));
  return createStepElement(step, index, label, additionalProperties);
}

function createBranchStepElement (step, index, label) {
  var additionalProperties = [];
  additionalProperties.push(createPropertyElement('nameInput' + index, 'Name', step, 'name'));
  return createStepElement(step, index, label, additionalProperties);
}

function createMergeStepElement (step, index, label) {
  var additionalProperties = [];
  additionalProperties.push(createPropertyElement('sourceBranchInput' + index, 'Source', step, 'sourceBranch'));
  additionalProperties.push(createPropertyElement('targetBranchInput' + index, 'Target', step, 'targetBranch'));
  return createStepElement(step, index, label, additionalProperties);
}

function createResetStepElement (step, index, label) {
  var additionalProperties = [];
  additionalProperties.push(createPropertyElement('commitNumberInput' + index, 'Commit/Number', step, 'commitOrNumber'));
  additionalProperties.push(createPropertyElement('valueInput' + index, 'Value', step, 'value'));
  return createStepElement(step, index, label, additionalProperties);
}

function createStepElement (step, index, label, additionalProperties) {
  var div = $('<div class="step" index="'+ index +'"></div>');
  createStepHeaderElement(div, label, index);
  div.append(createPropertyElement('descriptionInput' + index, 'Description', step, 'description'));
  div.append(createPropertyElement('commandsInput' + index, 'Commands', step, 'commands'));
  div.append(createPropertyElement('tagsInput' + index, 'Tags', step, 'tags'));
  if (additionalProperties) {
    for (var i=0; i<additionalProperties.length; i++) {
      div.append(additionalProperties[i]);
    }
  }
  div.append('<hr>');
  return div;
}

function createPropertyElement (id, label, object, variable) {
  var content =
  "<div class='property'>" +
    "<label class='label'>"+ label +":</label>" +
    "<input type='text' id='"+ id +"' value='"+ object[variable] +"'>" +
  "</div>";
  var property = $(content);
  property[0].getElementsByTagName('input')[0].addEventListener('input', function () {
    object[variable] = this.value;
  });
  return property;
}

function createStepHeaderElement (div, label, index) {
  var content =
      "<div class='property step-header'>" +
        "<label class='label'>"+ label +":</label>" +
        "<button index='"+ index +"' onclick='onDeleteStepClick(this.getAttribute(\"index\"))' style='float: right;'>Del</button>"
      "</div>";
  div.append(content);
}

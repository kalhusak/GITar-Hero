function convertFromTaskGraphToOldFormat(taskGraph){
  var nodes = [];
  var edges = [];

  var ids = Object.keys(taskGraph.byId);
  ids.forEach(function(id){
    var taskNode = taskGraph.byId[id];
    taskNode.task.id = id;
    taskNode.task.steps = convertSteps(taskNode.task.steps);
    nodes.push(taskNode.task);
    taskNode.children.forEach(function(child){
      edges.push({
    		"source": id,
    		"target": child
    	});
    });
  });

  return {
    "nodes": nodes,
    "edges": edges
  }
}

function convertSteps(steps) {
  var newSteps = [];
  if (steps) {
    steps.forEach((step, index) => {
      var newStep = {};
      newStep.description = step.description;
      newStep.commands = step.commands.join(';');
      newStep.tags = step.tags.join(';');
      newStep.type = step.type;
      switch (step.type) {
        case 'COMMIT':
          newStep.name = step.data.name;
          newStep.message = step.data.message;
          break;
        case 'CHECKOUT':
          newStep.toCommitOrBranch = step.data.type;
          newStep.name = step.data.name;
          break;
        case 'PULL':
          // TODO
          break;
        case 'BRANCH':
          newStep.name = step.data.name;
          break;
        case 'MERGE':
          newStep.sourceBranch = step.data.sourceBranch;
          newStep.targetBranch = step.data.targetBranch;
          break;
        case 'RESET':
          newStep.commitOrNumber = step.data.type;
          newStep.value = step.data.name;
          break;
      }
      newSteps.push(newStep);
    });
  }
  return newSteps;
}

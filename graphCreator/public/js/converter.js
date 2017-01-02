function convertFromTaskGraphToOldFormat(taskGraph){
  var nodes = [];
  var edges = [];

  var ids = Object.keys(taskGraph.byId);
  ids.forEach(function(id){
    var taskNode = taskGraph.byId[id];
    taskNode.task.id = parseInt(id);
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
          if (!isNaN(step.data.name) && step.data.name >= refSequence) {
            refSequence = parseInt(step.data.name) + 1;
          }
          break;
        case 'CHECKOUT':
          newStep.toCommitOrBranch = step.data.type;
          newStep.name = step.data.name;
          break;
        case 'ADD':
          newStep.newFiles = step.data.newFiles.length !== 0 ? step.data.newFiles.join(';') : "";
          newStep.modifyFiles = step.data.modifyFiles.length !== 0 ? step.data.modifyFiles.join(';') : "";
          newStep.removeFiles = step.data.removeFiles.length !== 0 ? step.data.removeFiles.join(';') : "";
          break;
        case 'PULL':
          for (var i=0; i<step.data.newCommits.length; i++) {
            var commit = step.data.newCommits[i];
            newStep['commitName' + (i+1)] = commit.name;
            newStep['commitMessage' + (i+1)] = commit.message;
            if (!isNaN(commit.name) && commit.name >= refSequence) {
              refSequence = parseInt(commit.name) + 1;
            }
          }
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
        case 'TAG':
          newStep.name = step.data.name;
          newStep.message = step.data.message;
          break;
      }
      newSteps.push(newStep);
    });
  }
  return newSteps;
}

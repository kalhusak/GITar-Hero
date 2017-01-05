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
          newStep.newFiles = step.data.newFiles.length !== 0 ? step.data.newFiles.join(';') : "";
          newStep.removeFiles = step.data.removeFiles.length !== 0 ? step.data.removeFiles.join(';') : "";
          break;
        case 'ADD':
          newStep.modifyFiles = step.data.modifyFiles.length !== 0 ? step.data.modifyFiles.join(';') : "";
          newStep.removeFiles = step.data.removeFiles.length !== 0 ? step.data.removeFiles.join(';') : "";
          break;
        case 'PULL':
          for (var i=0; i<3; i++) {
            var commit = step.data.newCommits[i];
            if (commit) {
              newStep['commitName' + (i+1)] = commit.name;
              newStep['commitMessage' + (i+1)] = commit.message;
              newStep['newFiles' + (i+1)] = commit.newFiles.length !== 0 ? commit.newFiles.join(';') : "";
              newStep['removeFiles' + (i+1)] = commit.removeFiles.length !== 0 ? commit.removeFiles.join(';') : "";
              if (!isNaN(commit.name) && commit.name >= refSequence) {
                refSequence = parseInt(commit.name) + 1;
              }
            } else {
              newStep['commitName' + (i+1)] = "";
              newStep['commitMessage' + (i+1)] = "";
              newStep['newFiles' + (i+1)] = "";
              newStep['removeFiles' + (i+1)] = "";
            }
          }
          break;
        case 'BRANCH':
          newStep.name = step.data.name;
          break;
        case 'MERGE':
          newStep.sourceBranch = step.data.sourceBranch;
          newStep.targetBranch = step.data.targetBranch;
          newStep.newFiles = step.data.newFiles.length !== 0 ? step.data.newFiles.join(';') : "";
          newStep.removeFiles = step.data.removeFiles.length !== 0 ? step.data.removeFiles.join(';') : "";
          break;
        case 'RESET':
          newStep.commitOrNumber = step.data.type;
          newStep.value = step.data.name;
          newStep.newFiles = step.data.newFiles.length !== 0 ? step.data.newFiles.join(';') : "";
          newStep.removeFiles = step.data.removeFiles.length !== 0 ? step.data.removeFiles.join(';') : "";
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

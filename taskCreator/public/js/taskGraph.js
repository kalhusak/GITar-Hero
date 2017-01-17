function saveAsTaskGraph (nodes, edges, Blob, saveAs) {
  var newNodes = {};
  var steps = {};
  nodes.forEach(function (node) {
    newNodes[node.id] = {
      children: getChildren(node.id, edges),
      task: {
          title: node.title,
          description: node.description,
          minTime: node.minTime,
          defaultTime: node.defaultTime,
          steps: prepareSteps(node.steps),
          x: node.x,
          y: node.y
      }
    };
  });

  var blob = new Blob([window.JSON.stringify({
    'root': getRootId(nodes, edges),
    'byId': newNodes
  })], {
    type: 'text/plain;charset=utf-8'
  });
  saveAs(blob, 'taskGraph.json');
}

function prepareSteps(steps) {
  var newSteps = [];
  if (steps) {
    steps.forEach((step, index) => {
      var newStep = {};
      newStep.description = step.description;
      newStep.commands = step.commands.split(";");
      newStep.tags = step.tags.split(";");
      newStep.type = step.type;
      switch (step.type) {
        case 'COMMIT':
          newStep.data = {
            name: step.name.toString(),
            message: step.message
          }
          break;
        case 'CHECKOUT':
          newStep.data = {
            type: step.toCommitOrBranch,
            name: step.name,
            after: {
              newFiles: stringToArray(step.newFiles),
              removeFiles: stringToArray(step.removeFiles)
            }
          }
          break;
        case 'ADD':
          newStep.data = {
            before: {
                modifyFiles: stringToArray(step.modifyFiles),
                removeFiles: stringToArray(step.removeFiles)
            }
          }
          break;
        case 'PULL':
          var newCommits = [];
          for (var i=1; i<=3; i++) {
            if (step['commitMessage' + i]) {
              newCommits.push({
                name: step['commitName' + i],
                message: step['commitMessage' + i],
                after: {
                  newFiles: stringToArray(step['newFiles' + i]),
                  removeFiles: stringToArray(step['removeFiles' + i])
                }
              });
            }
          }
          newStep.data = {
            newCommits,
            commonParentName: step.commonParentName
          }
          break;
        case 'BRANCH':
          newStep.data = {
            name: step.name
          }
          break;
        case 'MERGE':
          newStep.data = {
            sourceBranch: step.sourceBranch,
            targetBranch: step.targetBranch,
            after: {
              newFiles: stringToArray(step.newFiles),
              removeFiles: stringToArray(step.removeFiles)
            }
          }
          break;
        case 'RESET':
          newStep.data = {
            type: step.commitOrNumber,
            name: step.value,
            after: {
              newFiles: stringToArray(step.newFiles),
              removeFiles: stringToArray(step.removeFiles)
            }
          }
          break;
        case 'TAG':
          newStep.data = {
            name: step.name.toString(),
            message: step.message
          }
          break;
      }
      newSteps.push(newStep);
    });
  }
  return newSteps;
}

function getChildren (nodeId, edges) {
  var children = [];
  edges.forEach(function (edge) {
    if (edge.source === nodeId) {
      children.push(edge.target);
    }
  });
  return children;
}

function getRootId (nodes, edges) {
  var ids = nodes.map(function (node) {
    return node.id;
  });

  var targets = edges.map(function (edge) {
    return edge.target;
  });

  for (var i = 0; i < ids.length; i++) {
    if (targets.indexOf(ids[i]) === -1) {
      return ids[i];
    }
  }
  return null;
}

function stringToArray(string) {
  return string ? string.split(";") : [];
}

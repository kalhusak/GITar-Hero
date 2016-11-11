function saveAsTaskGraph (nodes, edges, Blob, saveAs) {
  var newNodes = {};
  nodes.forEach(function (node) {
    newNodes[node.id] = {
      'file': node.title,
      'children': getChildren(node.id, edges)
    };
  });

  var blob = new Blob([window.JSON.stringify({
    'root': getRootId(nodes, edges),
    'byId': newNodes
  })], {
    type: 'text/plain;charset=utf-8'
  });
  saveAs(blob, 'tasksNamesGraph.json');
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

function convertFromTaskGraphToOldFormat(tasks){
  var nodes = [];
  var edges = [];
  var seq = 1;
  var initX = window.innerWidth * 0.5;
  var initY = window.innerHeight - 100;

  var rootNode = tasks.byId[tasks.root];

  var lev = 0;
  var addedNodes = [];
  var children = [tasks.root];
  while(children.length > 0){
    console.log("CHILDREN", children);
    addNodes(nodes, tasks, children, lev);
    addedNodes = addedNodes.concat(children);
    var newChildren = [];
    children.forEach(function(childId){
      newChildren = newChildren.concat(tasks.byId[childId].children);
    });
    children = newChildren.filter(function(item, pos) {
      return addedNodes.indexOf( item ) < 0 && newChildren.indexOf(item) == pos;
    })
    lev++;
  }

  var ids = Object.keys(tasks.byId);
  ids.forEach(function(id){
    tasks.byId[id].children.forEach(function(child){
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

function addNodes(nodeList, tasks, nodeIds, level){
  var initX = window.innerWidth * 0.5 - (nodeIds.length%2 === 0 ? (75 + (Math.floor(nodeIds.length/2) - 1) * 150) : Math.floor(nodeIds.length/2) * 150 );
  var initY = window.innerHeight - 100;

  nodeIds.forEach(function(nodeId, i){
    nodeList.push({
      "id": nodeId,
      "title": tasks.byId[nodeId].file,
      "x": initX + (i * 150),
      "y": initY - (level * 150)
    });
  });
}

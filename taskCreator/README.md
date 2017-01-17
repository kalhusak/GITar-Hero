Interactive tool for creating directed graphs, created using d3.js.

Operation:

* drag/scroll to translate/zoom the graph
* shift-click on graph to create a node
* shift-click on a node and then drag to another node to connect them with a directed edge
* click on node or edge and press delete button to delete
* click on node to edit it

1.  Commands and tags are arrays. Separate them using ';'
    e.g 'git add .;git add -A'

2.  If some property has name like Something1/Something2 then it's enum values
    e.g property name: 'Commit/Branch'. Type in only 'commit' or 'branch'

3.  Pull can have three new commits. Filled message means that there is
    a new commit with this name in upstream.

4. To do pull with rebase commonParentName property must be set to common parent commit name.

5.  In merge step target branch is merged to source branch.
    e.g 'git merge feature/menu develop' - source: develop, target: feature/menu

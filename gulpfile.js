const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const fs = require('fs');
const jsonlint = require('jsonlint');
const _ = require('lodash');

gulp.task('createTasksGraph', function () {
  var taskNameGraph = getJSON(config.tasks_names_graph);
  if (taskNameGraph !== null) {
    var tasks = taskNameGraph.byId;

    console.log('\tCreating graph for ' + Object.keys(tasks).length + ' tasks');
    for (var id in tasks) {
      if (tasks.hasOwnProperty(id)) {
        var taskFilePath = path.resolve(config.tasks_folder, tasks[id].file + '.json');
        console.log('\tAdding task from file: ' + taskFilePath);
        var task = getJSON(taskFilePath);
        if (task !== null) {
          _.unset(taskNameGraph.byId[id], 'file');
          taskNameGraph.byId[id]['task'] = task;
        } else {
          return;
        }
      }
    }
    fs.writeFileSync(config.tasks_graph, JSON.stringify(taskNameGraph));
    console.log('\tGraph of tasks saved in ' + config.tasks_graph);
    console.log('\tDone');
  }
});

function getJSON (path) {
  try {
    var tasksNamesGraphFile = fs.readFileSync(path, 'utf8');
    return jsonlint.parse(tasksNamesGraphFile);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('\tERROR: Can not find file: ' + path);
    } else {
      console.log('\tERROR: Error in file: ' + path);
      console.log(e);
    }
    return null;
  }
}

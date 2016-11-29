import tasksGraph from '../tasksGraph.json';
import stepProvider from './StepProvider';
import statisticsUtils from '../utils/StatisticsUtils';
import rwc from 'random-weighted-choice';
import _ from 'lodash';

class TaskProvider {
  constructor () {
    this.next = this.next.bind(this);
    this.hasNext = this.hasNext.bind(this);
    this.getTasksCount = this.getTasksCount.bind(this);

    this.tasksCount = 0;
    this.nextId = tasksGraph.root;
  }

  next (tags) {
    if (this.nextId === undefined || this.nextId === null) {
      return null;
    }

    var taskNode = this.getTaskNodeById(this.nextId);
    this.nextId = this._getNextId(tags, taskNode.children);

    this.tasksCount++;
    return _.cloneDeep(taskNode.task);
  }

  hasNext () {
    return tasksGraph.byId.hasOwnProperty(this.nextId);
  }

  _getNextId (tags, childrenIds) {
    var weightedList = [];
    childrenIds.forEach((id) => {
      var taskNode = this.getTaskNodeById(id);
      var taskTags = this.getTaskTags(taskNode.task);
      var weight = statisticsUtils.calculateWeight(tags, taskTags);
      weightedList.push({ weight: weight, id: id });
    });
    return rwc(weightedList);
  }

  getTaskNodeById (id) {
    return tasksGraph.byId[id];
  }

  getTaskTags (task) {
    var steps = stepProvider.getSteps(task.steps);
    return _.flattenDeep(_.map(steps, 'tags'));
  }

  getTasksCount () {
    return this.tasksCount;
  }

}

export default new TaskProvider();

import tasksGraph from '../tasksGraph.json';
import statisticsUtils from '../utils/StatisticsUtils';
import rwc from 'random-weighted-choice';
import _ from 'lodash';

class TaskProvider {
  constructor () {
    this.next = ::this.next;
    this.hasNext = ::this.hasNext;
    this.getTasksCount = ::this.getTasksCount;
    this.chooseNextId = ::this.chooseNextId;

    this.tasksCount = 0;
    this.nextPossibleIds = [tasksGraph.root];
  }

  next (tags) {
    if (this.nextPossibleIds === undefined || this.nextPossibleIds === null || this.nextPossibleIds.length === 0) {
      return null;
    }

    let nextId = this.chooseNextId(tags);
    let taskNode = this.getTaskNodeById(nextId);
    this.nextPossibleIds = taskNode.children;

    this.tasksCount++;
    return _.cloneDeep(taskNode.task);
  }

  hasNext () {
    for (const id of this.nextPossibleIds) {
      if (tasksGraph.byId.hasOwnProperty(id)) {
        return true;
      }
    }
    return false;
  }

  chooseNextId (tags) {
    let weightedList = [];
    this.nextPossibleIds.forEach((id) => {
      let taskNode = this.getTaskNodeById(id);
      let taskTags = this.getTaskTags(taskNode.task);
      let weight = statisticsUtils.calculateWeight(tags, taskTags);
      weightedList.push({ weight: weight, id: id });
    });
    return rwc(weightedList);
  }

  getTaskNodeById (id) {
    return tasksGraph.byId[id];
  }

  getTaskTags (task) {
    return _.flattenDeep(_.map(task.steps, 'tags'));
  }

  getTasksCount () {
    return this.tasksCount;
  }

}

export default new TaskProvider();

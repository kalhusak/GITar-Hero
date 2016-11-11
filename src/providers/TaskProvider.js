import tasksGraph from '../tasksGraph.json';
import _ from 'lodash';

class TaskProvider {
  constructor () {
    this.next = this.next.bind(this);
    this.hasNext = this.hasNext.bind(this);
    this.nextId = tasksGraph.root;
  }

  next () {
    if (this.nextId === undefined || this.nextId === null) {
      return null;
    }

    var taskNode = tasksGraph.byId[this.nextId];
    this.nextId = _.sample(taskNode.children);
    return _.cloneDeep(taskNode.task);
  }

  hasNext () {
    return tasksGraph.byId.hasOwnProperty(this.nextId);
  }
}

export default new TaskProvider();

import taskSequence from '../utils/TaskSequence';
import taskProvider from '../providers/TaskProvider';
import { first } from 'lodash';

const pointsPerStep = 100;

class TaskFactory {
  constructor () {
    this.next = ::this.next;
  }

  next (tags) {
    let newTask = null;
    if (taskProvider.hasNext()) {
      newTask = taskProvider.next(tags);
      newTask.currentStepIndex = 0;
      newTask.reward = pointsPerStep * newTask.steps.length;
      newTask.id = taskSequence.nextTask();
      newTask.pending = first(newTask.steps).type === 'ADD';
    }
    return newTask;
  }

}

export default new TaskFactory();

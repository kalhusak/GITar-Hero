import taskSequence from '../utils/TaskSequence';
import statisticsUtils from '../utils/StatisticsUtils';
import taskProvider from '../providers/TaskProvider';

const pointsMultiplier = 2;

class TaskFactory {

  constructor () {
    this.next = this.next.bind(this);
  }

  next (tags) {
    let newTask = null;
    if (taskProvider.hasNext()) {
      newTask = taskProvider.next(tags);
      newTask.currentStepIndex = 0;
      newTask.time = statisticsUtils.calculateTaskTime(newTask.time, taskProvider.getTasksCount());
      newTask.reward = pointsMultiplier * newTask.steps.length;
      newTask.id = taskSequence.nextTask();
    }
    return newTask;
  }

}

export default new TaskFactory();

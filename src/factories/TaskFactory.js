import taskSequence from '../utils/TaskSequence';
import statisticsUtils from '../utils/StatisticsUtils';
import taskProvider from '../providers/TaskProvider';

class TaskFactory {

  constructor () {
    this.next = this.next.bind(this);
  }

  next (tags) {
    let newTask = null;
    if (taskProvider.hasNext()) {
      newTask = taskProvider.next(tags);
      newTask.currentStepIndex = 0;
      newTask.time = statisticsUtils.calculateTaskTime(newTask.minTime,
      newTask.defaultTime, taskProvider.getTasksCount());
      newTask.reward = newTask.minTime * taskProvider.getTasksCount() * 10;
      newTask.id = taskSequence.nextTask();
    }
    return newTask;
  }

}

export default new TaskFactory();

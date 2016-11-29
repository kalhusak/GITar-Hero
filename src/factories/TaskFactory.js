import taskSequence from '../utils/TaskSequence';
import statisticsUtils from '../utils/StatisticsUtils';
import taskProvider from '../providers/TaskProvider';
import stepProvider from '../providers/StepProvider';

class TaskFactory {

  constructor () {
    this.next = this.next.bind(this);
  }

  next (tags) {
    let newTask = null;
    if (taskProvider.hasNext()) {
      newTask = taskProvider.next(tags);
      newTask.steps = stepProvider.getSteps(newTask.steps);
      newTask.currentStepIndex = 0;
      newTask.time = statisticsUtils.calculateTaskTime(newTask.minTime,
        newTask.defaultTime, taskProvider.getTasksCount());
      newTask.id = taskSequence.nextTask();
    }
    return newTask;
  }

}

export default new TaskFactory();

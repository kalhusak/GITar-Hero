import _ from 'lodash';

function calculateWeight (tagsMap, taskTags) {
  return _.reduce(taskTags, (sum, taskTag) => {
    return tagsMap[taskTag] ? sum + countTaskTagWeight(tagsMap[taskTag].ratio) : sum;
  }, 1) * 100;
}

function calculateTagRatio (probes, valid) {
  return (valid || 0) / probes;
}

function countTaskTagWeight (ratio) {
  return Math.pow(1 / (ratio || 1), 2);
}

function calculateTaskReward (task, elapsedTime) {
  let timeLeftPercentage = (task.time - elapsedTime) / task.time;
  return timeLeftPercentage > 0 ? timeLeftPercentage * task.reward : 0;
}

export default {
  calculateWeight,
  calculateTagRatio,
  calculateTaskReward
};

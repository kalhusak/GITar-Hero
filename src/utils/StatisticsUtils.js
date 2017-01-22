import _ from 'lodash';

function calculateWeight (tagsMap, taskTags) {
  let weight = 0;
  let knownTags = 0;

  for (let taskTag of taskTags) {
    if (tagsMap[taskTag] && (tagsMap[taskTag].ratio === 1)) {
      knownTags++;
    }
    weight += countTaskTagWeight(tagsMap, taskTag);
  }

  weight = weight * 100 / Math.max(1, (taskTags.length - knownTags));
  return Math.max(weight, 1);
}

function calculateTagRatio (probes, valid) {
  return (valid || 0) / probes;
}

/**
 * Returns tag weight:
 *  - new tag           : 1
 *  - tag ratio  0-25%  : 16
 *  - tag ratio 26-99%  : (1,16)
 *  - tag ratio   100%  : 0
 */
function countTaskTagWeight (tagsMap, tag) {
  if (tagsMap[tag]) {
    const ratio = tagsMap[tag].ratio;
    return ratio >= 1 ? 0 : Math.pow(1 / Math.max(ratio, 0.25), 2);
  } else {
    return 1;
  }
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

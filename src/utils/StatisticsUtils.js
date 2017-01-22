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

function calculateTagRatio (tag) {
  const { probes, valid, recent } = tag;
  let sum = 0;
  let weightSum = 0;
  let recentProbes = Math.min(8, probes);

  for (let i = recentProbes; i > 0; i--) {
    let weight = i + (recentProbes > 8 ? 1 : 0);
    sum += ((recent >> (recentProbes - i)) & 0x01) * weight;
    weightSum += weight;
  }
  if (recentProbes > 8) {
    sum += (valid || 0) / probes;
    weightSum += 1;
  }

  return sum / weightSum;
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

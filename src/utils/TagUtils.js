import * as TaskUtils from '../utils/TaskUtils';
import StatisticsUtils from './StatisticsUtils';
import helpTabs from '../containers/BottomDrawer/helpTabs';

export function onValidCommand (state) {
  onCommand(state, (tags, tag) => {
    addRecentTagProbe(tags, tag, 1);
    incrementTagProbes(tags, tag);
    incrementTagValid(tags, tag);
    calculateTagKnowledgeRatio(tags, tag);
  });
}

export function onInvalidCommand (state) {
  onCommand(state, (tags, tag) => {
    addRecentTagProbe(tags, tag, 0);
    incrementTagProbes(tags, tag);
    calculateTagKnowledgeRatio(tags, tag);
  });
}

export function getNewTag (state) {
  var step = TaskUtils.getCurrentStep(state);
  for (var i=0; i<step.tags.length; i++) {
    if (!state.tags[step.tags[i]]) {
      return step.tags[i];
    }
  }
  return null;
}

export function isHelpTabForTag (tag) {
  if (tag) {
    for (var i=0; i<helpTabs.length; i++) {
      if (helpTabs[i].name === tag) {
        return true;
      }
    }
  }
  return false;
}

function onCommand (state, execute) {
  let tags = state.tags;
  let step = TaskUtils.getCurrentStep(state);
  step.tags.forEach((tag) => {
    if (!tags[tag]) {
      tags[tag] = {};
    }
    execute(tags, tag);
  });
}

function addRecentTagProbe (tags, tag, probe) {
  tags[tag].recent = (((tags[tag].recent || 0) << 1) | probe);
}

function incrementTagProbes (tags, tag) {
  tags[tag].probes = (tags[tag].probes || 0) + 1;
}

function incrementTagValid (tags, tag) {
  tags[tag].valid = (tags[tag].valid || 0) + 1;
}

function calculateTagKnowledgeRatio (tags, tag) {
  tags[tag].ratio = StatisticsUtils.calculateTagRatio(tags[tag]);
}

export default {
  onValidCommand,
  onInvalidCommand,
  getNewTag,
  isHelpTabForTag
};

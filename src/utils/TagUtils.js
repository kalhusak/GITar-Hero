import TaskUtils from './TaskUtils';

export function onValidCommand (state) {
  onCommand(state, (tags, tag) => {
    incrementTagProbes(tags, tag);
    incrementTagValid(tags, tag);
    calculateTagKnowledgeRation(tags, tag);
  });
}

export function onInvalidCommand (state) {
  onCommand(state, (tags, tag) => {
    incrementTagProbes(tags, tag);
    calculateTagKnowledgeRatio(tags, tag);
  });
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

function incrementTagProbes (tags, tag) {
  tags[tag].probes = (tags[tag].probes || 0) + 1;
}

function incrementTagValid (tags, tag) {
  tags[tag].valid = (tags[tag].valid || 0) + 1;
}

function calculateTagKnowledgeRatio (tags, tag) {
  tags[tag].ratio = (tags[tag].valid || 0) / tags[tag].probes;
}

export default {
  onValidCommand,
  onInvalidCommand
};

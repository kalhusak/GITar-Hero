import stepsList from '../../tasks/Steps.json';

class StepProvider {
  constructor () {
    this.fillCommands = this.getSteps.bind(this);
  }

  getSteps (stepIds) {
    let steps = [];
    stepIds.forEach((stepId) => {
      let step = stepsList.byId[stepId];
      step['id'] = stepId;
      steps.push(step);
    });
    return steps;
  }
}

export default new StepProvider();

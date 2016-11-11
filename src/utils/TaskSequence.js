class TaskSequence {
  constructor () {
    this.nextTask = this.nextTask.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.nextIdForTask = 0;
    this.nextIdForStep = 0;
  }

  nextTask () {
    this.nextIdForTask++;
    return (this.nextIdForTask - 1).toString();
  }

  nextStep () {
    this.nextIdForStep++;
    return (this.nextIdForStep - 1).toString();
  }
}

export default new TaskSequence();

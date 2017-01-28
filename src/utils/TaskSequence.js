class TaskSequence {
  constructor () {
    this.nextTask = this.nextTask.bind(this);
    this.nextIdForTask = 0;
  }

  nextTask () {
    return this.nextIdForTask++;
  }
}

export default new TaskSequence();

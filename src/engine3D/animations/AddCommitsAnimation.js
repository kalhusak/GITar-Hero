import Commit from '../objects/Commit';

class AddCommitsAnimation {
  constructor (commits, branch, scene) {
    this._animate = ::this._animate;
    this._addCommit = ::this._addCommit;
    this.commits = commits;
    this.branch = branch;
    this.scene = scene;
    this.index = 0;
    this._animate();
  }

  _animate () {
    if (this.commits && this.commits.length > 0) {
      this._addCommit(this.index);
      this.index++;
    }
  }

  _addCommit (index) {
    var commitData = this.commits[index];
    var commit = new Commit(commitData.name, commitData.message, this.branch.getPosition(), this.branch.material, this.scene);
    if (index + 1 < this.commits.length) {
      this.branch.addCommit(commit, this._animate);
    } else {
      this.branch.addCommit(commit);
    }
  }
}

export default AddCommitsAnimation;

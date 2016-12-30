import Branch from './objects/Branch';
import Commit from './objects/Commit';
import Head from './Head';
import CommitUtils from './utils/CommitUtils';
import _ from 'lodash';

// TODO remove
let commitSeq = 0;

export var branches;

class Repo3D {
  constructor (scene) {
    this.onNewValidCommand = ::this.onNewValidCommand;

    this.scene = scene;
    this.HEAD = new Head(this.scene);
    this.branches = {};
    branches = this.branches;
  }

  onNewValidCommand (type, data) {
    switch (type) {
      case 'INIT':
        this.onInit();
        break;
      case 'COMMIT':
        this.onCommit(data);
        break;
      case 'BRANCH':
        this.onBranch(data);
        break;
      case 'CHECKOUT':
        this.onCheckout(data);
        break;
      case 'MERGE':
        this.onMerge(data);
        break;
      case 'RESET':
        this.onReset(data);
        break;
      case 'PUSH':
        this.onPush(data);
        break;
      case 'PULL':
        this.onPull(data);
        break;
    }
  }

  onInit () {
    var master = new Branch('master', null, this.scene);
    this.branches['master'] = master;
    this.HEAD.pointTo(master);
  }

  onCommit (data) {
    if (this.HEAD.isPointingToBranch()) {
      var activeBranch = this.HEAD.getObject();
      var commit = new Commit(data.name, data.message, activeBranch.getPosition(),
          activeBranch.material, this.scene);
      activeBranch.addCommit(commit);
    } else {
      // TODO what if is detached or pointing to commit?
      console.log('WARNING - create commit (-m ' + data.message + ') on detached HEAD');
    }
  }

  onBranch (data) {
    if (this.HEAD.isDetached()) {
      console.log('WARNING - create branch (' + data.name + ') on detached HEAD');
      return;
    }

    if (this.HEAD.isPointingToCommit()) {
      var activeCommit = this.HEAD.getObject();
      this.branches[data.name] = new Branch(data.name, activeCommit.getPosition(), this.scene);
    } else if (this.HEAD.isPointingToBranch()) {
      var activeBranch = this.HEAD.getObject();
      var activeCommit = _.last(activeBranch.commits);
      this.branches[data.name] = new Branch(data.name, activeCommit ? activeCommit.getPosition() : activeBranch.getPosition(), this.scene);
    }
  }

  onCheckout (data) {
    if (data.type === 'branch') {
      if (!this.branches[data.name]) {
        this.onBranch(data);
      }
      this.HEAD.pointTo(this.branches[data.name]);
    } else if (data.type === 'commit') {
      var commit = CommitUtils.findByNameInBranches(data.name, this.branches);
      if (commit) {
        this.HEAD.pointTo(commit);
      } else {
        console.log('WARNING - can not find commit with name: ' + data.name);
      }
    }
  }

  onMerge (data) {
    var sourceBranch = data.sourceBranch ? this.branches[data.sourceBranch] : this.HEAD.getObject();
    var targetBranch = this.branches[data.targetBranch];
    sourceBranch.merge(targetBranch);
  }

  onReset (data) {
    if (data.type === 'commit') {
      if (this.HEAD.isPointingToBranch()) {
        this.HEAD.getObject().resetToCommit(data.name);
      } else if (this.HEAD.isPointingToCommit()) {
        var activeBranch = CommitUtils.getBranchForCommit(this.HEAD.getObject(), this.branches);
        if (!activeBranch) {
          console.log('WARNING - can not find branch for commit: ' + this.HEAD.getObject().name);
          return;
        }
        activeBranch.resetToCommit(data.name);
      }
    } else if (data.type === 'number') {
      this.activeBranch.resetOf(data.count);
    }
  }

  onPush (data) {
    if (this.HEAD.isPointingToBranch()) {
      this.HEAD.getObject().push();
    } else if (this.HEAD.isPointingToCommit()) {
      var activeBranch = CommitUtils.getBranchForCommit(this.HEAD.getObject(), this.branches);
      if (!activeBranch) {
        console.log('WARNING - can not find branch for commit: ' + this.HEAD.getObject().name);
        return;
      }
      activeBranch.push();
    } else {
      console.log('WARNING - execute push on detached HEAD');
    }
  }

  onPull (data) {
    if (this.HEAD.isPointingToBranch()) {
      this.HEAD.getObject().pull(data.newCommits);
    } else if (this.HEAD.isPointingToCommit()) {
      var activeBranch = CommitUtils.getBranchForCommit(this.HEAD.getObject(), this.branches);
      if (!activeBranch) {
        console.log('WARNING - can not find branch for commit: ' + this.HEAD.getObject().name);
        return;
      }
      activeBranch.pull(data.newCommits);
    } else {
      console.log('WARNING - execute push on detached HEAD');
    }
  }
}

export default Repo3D;

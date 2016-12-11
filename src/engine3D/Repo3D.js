import Branch from './objects/Branch';
import Commit from './objects/Commit';
import Head from './Head';
import _ from 'lodash';

// TODO remove
let branchSeq = 0;
let commitSeq = 0;

class Repo3D {
  constructor (scene) {
    this.onNewValidCommand = ::this.onNewValidCommand;

    this.scene = scene;
    this.HEAD = new Head(this.scene);
    this.branches = {};
  }

  renderLoop () {
    let scene = this.scene;
    this.runRenderLoop(function () {
      scene.render();
    });
  }

  onNewValidCommand (type, data) {
    switch (type) {
      case 'INIT':
        this.onInit();
        break;
      case 'COMMIT':
        commitSeq++;
        this.onCommit(data);
        break;
      case 'BRANCH':
        this.onBranch(data);
        break;
      case 'CHECKOUT':
        if (data.name === 'feature/new-task') {
          data.name = 'master';
        }
        this.onCheckout(data);
        break;
      case 'MERGE':
        this.onMerge(data);
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
      var commit = new Commit(commitSeq, data.message, this.scene);
      var activeBranch = this.HEAD.getObject();
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

    var activeCommit = null;
    if (this.HEAD.isPointingToCommit()) {
      activeCommit = this.HEAD.getObject();
    } else if (this.HEAD.isPointingToBranch()) {
      var activeBranch = this.HEAD.getObject();
      activeCommit = _.last(activeBranch.commits);
    }
    this.branches[data.name] = new Branch(data.name, activeCommit, this.scene);
  }

  onCheckout (data) {
    if (data.type === 'branch') {
      if (!this.branches[data.name]) {
        this.onBranch(data);
      }
      this.HEAD.pointTo(this.branches[data.name]);
    } else if (data.type === 'commit') {
      // TODO find commit by ref
      var master = this.branches['master'];
      var lastCommit = _.last(master.commits);
      this.HEAD.pointTo(lastCommit);
    }
  }

  onMerge (data) {
    var sourceBranch = null;
    if (!data.sourceBranch && this.HEAD.isPointingToBranch()) {
      sourceBranch = this.HEAD.getObject();
    }
    var targetBranch = this.branches[data.targetBranch];
    sourceBranch.merge(targetBranch);
  }

}

export default Repo3D;

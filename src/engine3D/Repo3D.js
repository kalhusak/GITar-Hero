import Branch from './Branch';
import Commit from './Commit';
import _ from 'lodash';

let branchSeq = 0;

class Repo3D {
  constructor (camera, scene) {
    this.camera = camera;
    this.scene = scene;

    this.onNewValidCommand = ::this.onNewValidCommand;

    this.commitId = 0;
    this.branches = {};
    this.activeBranch = null;
    this.activeCommit = null;
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
        this.onCommit(data);
        break;
      case 'BRANCH':
        data.name = data.name + branchSeq;
        branchSeq++;
        this.onBranch(data);
        break;
      case 'CHECKOUT':
        data.name = data.name + branchSeq;
        branchSeq++;
        this.onCheckout(data);
        break;
    }
  }

  onInit () {
    this.activeBranch = new Branch('master', null, this.scene);
    this.branches['master'] = this.activeBranch;
    this.camera.lockedTarget = this.activeBranch.cameraTarget;
  }

  onCommit (data) {
    var commit = new Commit(this.commitId, data.message, this.scene);
    this.commitId++;
    this.activeCommit = commit;
    this.activeBranch.addCommit(commit);
  }

  onBranch (data) {
    var branch = new Branch(data.name, this.activeCommit, this.scene);
    this.branches[data.name] = branch;
  }

  // TODO implement and set active commit
  onCheckout (data) {
    // TODO change it
    if (data.name === '1232') {
      this.activeBranch = this.branches['master'];
      this.activeCommit = _.last(this.activeBranch.commits);
      this.camera.lockedTarget = this.activeCommit.cameraTarget;
    } else {
      if (!this.branches[data.name]) {
        this.onBranch(data);
      }
      this.activeBranch = this.branches[data.name];
      this.camera.lockedTarget = this.activeBranch.cameraTarget;
    }
  }

}

export default Repo3D;

import BABYLON from 'babylonjs';
import _ from 'lodash';
import Abstract3DObject from './Abstract3DObject';
import BranchConnector from './BranchConnector';
import ColorFactory from '../ColorFactory';
import Commit from './Commit';
import Tube from './Tube';
import Text from './Text';
import { branch as branchStyle } from '../style';
import PushAnimation from '../animations/PushAnimation';
import PullAnimation from '../animations/PullAnimation';
import BranchUtils from '../utils/BranchUtils';

const config = {
  partLength: 30,
  distanceBetweenBranches: 30,
  initPosition: new BABYLON.Vector3(0, 0, 0)
};

class Branch extends Abstract3DObject {

  constructor (name, startPosition, scene) {
    super(name, scene);
    this._createStartConnector = ::this._createStartConnector;
    this.getPositionRef = ::this.getPositionRef;
    this._createTube = ::this._createTube;
    this.addCommit = ::this.addCommit;
    this.merge = ::this.merge;
    this.removeLastCommit = ::this.removeLastCommit;
    this.removeEndConnector = ::this.removeEndConnector;
    this.resetToCommit = ::this.resetToCommit;
    this._resetToCommitRecursive = ::this._resetToCommitRecursive;
    this.push = ::this.push;
    this.pull = ::this.pull;

    this.scene = scene;
    this.startPosition = startPosition;
    this.material = new BABYLON.StandardMaterial(name + '_material', scene);
    this.material.diffuseColor = ColorFactory.next();
    this.material.specularColor = branchStyle.specularColor;
    this.material.specularPower = branchStyle.specularPower;

    this.tube = this._createTube();
    this.commits = [];

    if (this.startPosition) {
      this.startConnector = this._createStartConnector();
    }

    this.text = new Text(name, this.tube.getLastPointPositionRef(), scene, branchStyle.textStyle);
  }

  addCommit (commit, onEndEvent) {
    this.commits.push(commit);
    this.tube.addParts(1, onEndEvent);
  }

  removeLastCommit () {
    var lastCommit = this.commits.pop();
    if (lastCommit) {
      lastCommit.disappear();
    }
    return lastCommit;
  }

  getPositionRef () {
    return this.tube.getLastPointPositionRef();
  }

  merge (branch) {
    var mergeEvent = () => {
      var name = 'mergeCommit_' + branch.name + '_' + this.name;
      var message = 'Merge ' + branch.name + ' to ' + this.name;
      var commit = new Commit(name, message, this.getPosition(), this.material, this.scene);
      commit.isMergeCommit = true;
      this.addCommit(commit);
      branch.commits.push(commit);
    };

    var adjustEvent = () => {
      if (deltaParts <= 0) {
        this.tube.addParts(1, mergeEvent);
      } else {
        branch.tube.addParts(0, mergeEvent);
      }
      branch.addEndConnector(endConnectorEndPosition);
    };

    var deltaZ = this.tube.getLastPointPosition().z - branch.tube.getLastPointPosition().z;
    var deltaParts = deltaZ / config.partLength;
    var endConnectorEndPosition = this.getPosition();
    endConnectorEndPosition.z += deltaParts > 0 ? 0 : Math.abs(deltaZ) + config.partLength;
    if (deltaParts > 0) {
      branch.tube.addParts(deltaParts - 1, adjustEvent);
    } else if (deltaParts <= 0) {
      this.tube.addParts(Math.abs(deltaParts), adjustEvent);
    }
  }

  addEndConnector (endPosition, endEvent) {
    var name = this.name + '_endConnector';
    var startPosition = this.tube.getLastPointPosition();
    this.endConnector = new BranchConnector(name, startPosition, endPosition,
      endEvent, this.material, this.scene);
  }

  removeEndConnector () {
    this.endConnector.disappear();
    this.endConnector = null;
  }

  resetToCommit (commitName) {
    var commit = this.getCommit(commitName);
    if (commit) {
      var deltaZ = _.last(this.commits).getPosition().z - commit.getPosition().z;
      var deltaParts = deltaZ / config.partLength;
      this._resetToCommitRecursive(deltaParts + 1);
    } else {
      console.log('WARNING - trying to reset to commit that not exists');
    }
  }

  push () {
    var pushAnimation = new PushAnimation(this, this.scene);
  }

  pull (newCommits) {
    var pullAnimation = new PullAnimation(this, this.scene, newCommits);
  }

  hideCommitsNames () {
    this.commits.forEach(c => c.hideName());
  }

  showCommitsNames () {
    this.commits.forEach(c => c.showName());
  }

  _resetToCommitRecursive (commitsCount) {
    var rec = () => {
      if (commitsCount === 0) {
        return;
      } else {
        commitsCount--;
        var removedCommit = this.removeLastCommit();
        this.tube.shorten(_.last(this.commits), rec);

        if (removedCommit && removedCommit.isMergeCommit) {
          var secondBranch = BranchUtils.getSecondBranchForMergeCommit(removedCommit, this);
          secondBranch.removeEndConnector();
          secondBranch.removeLastCommit();
        }
      }
    };
    rec();
  }

  getCommit (name) {
    return _.find(this.commits, { name });
  }

  _createTube () {
    var position = null;
    var parts = 0;
    if (this.startPosition) {
      position = _.cloneDeep(this.startPosition);
      position.x += config.distanceBetweenBranches;
      position.x *= this.name.includes('hotfix') ? -1 : 1;
      position.z += config.partLength;
    } else {  // master branch
      position = config.initPosition.clone();
      parts = 1;
    }
    return new Tube(this.name + '_tube', position, config.partLength, parts, this.material, this.scene);
  }

  _createStartConnector () {
    var name = this.name + '_startConnector';
    var startPosition = _.cloneDeep(this.startPosition);
    var endPosition = this.tube.getFirstPointPosition();
    return new BranchConnector(name, startPosition, endPosition, null, this.material, this.scene);
  }
}

export default Branch;

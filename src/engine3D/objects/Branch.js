import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';
import BranchConnector from './BranchConnector';
import Tube from './Tube';
import Commit from './Commit';
import Text from './Text';
import _ from 'lodash';
import SimpleColorMaterial from '../materials/SimpleColorMaterial';

const config = {
  partLength: 30,
  distanceBetweenBranches: 30,
  initPosition: new BABYLON.Vector3(0, 0, 0)
};

class Branch extends Abstract3DObject {

  constructor (name, parentCommit, scene) {
    super(name, scene);
    this._createStartConnector = ::this._createStartConnector;
    this.getPositionRef = ::this.getPositionRef;
    this._createTube = ::this._createTube;
    this.addCommit = ::this.addCommit;
    this.merge = ::this.merge;
    this.removeLastCommit = ::this.removeLastCommit;
    this.resetToCommit = ::this.resetToCommit;
    this._resetToCommitRecursive = ::this._resetToCommitRecursive;

    this.renderTextureMaterial = new SimpleColorMaterial(scene,
      new BABYLON.Color3(Math.random(), Math.random(), Math.random()));

    this.parentCommit = parentCommit;
    this.tube = this._createTube();
    this.commits = [];

    if (this.parentCommit) {
      this.startConnector = this._createStartConnector();
    }

    this.text = new Text(name, this.tube.getLastPointPositionRef(), scene);
  }

  addCommit (commit) {
    this.commits.push(commit);
    this.tube.addParts(1);
  }

  removeLastCommit () {
    var lastCommit = this.commits.pop();
    if (lastCommit) {
      lastCommit.disappear();
    }
  }

  getPositionRef () {
    return this.tube.getLastPointPositionRef();
  }

  merge (branch) {
    var mergeEvent = () => {
      var name = 'mergeCommit_' + branch.name + '_' + this.name;
      var message = 'Merge ' + branch.name + ' to ' + this.name;
      var commit = new Commit(name, message, this.getPosition(), this.scene);
      this.addCommit(commit);
      branch.commits.push(commit);
    };

    var adjustEvent = () => {
      if (deltaParts <= 0) {
        this.tube.addParts(1);
      }
      branch.addEndConnector(endConnectorEndPosition, mergeEvent);
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
    if (!this.endConnector) {
      var name = this.name + '_endConnector';
      var startPosition = this.tube.getLastPointPosition();
      this.endConnector = new BranchConnector(name, startPosition, endPosition, this.scene, endEvent, this.renderTextureMaterial);
    } else {
      console.log('WARNING - trying to add second end connector');
    }
  }

  resetToCommit (commitName) {
    var commit = this.getCommit(commitName);
    if (commit) {
      var deltaZ = _.last(this.commits).getPosition().z - commit.getPosition().z;
      var deltaParts = deltaZ / config.partLength;
      this._resetToCommitRecursive(deltaParts);
    } else {
      console.log('WARNING - trying to reset to commit that not exists');
    }
  }

  _resetToCommitRecursive (commitsCount) {
    var rec = () => {
      if (commitsCount === 0) {
        return;
      } else {
        commitsCount--;
        this.removeLastCommit();
        this.tube.removeParts(1, rec);
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
    if (this.parentCommit) {
      position = this.parentCommit.getPosition();
      position.x += config.distanceBetweenBranches;
      position.z += config.partLength;
    } else {  // master branch
      position = config.initPosition.clone();
      parts = 1;
    }
    return new Tube(this.name + '_tube', position, config.partLength, this.scene, parts, this.renderTextureMaterial);
  }

  _createStartConnector () {
    var name = this.name + '_startConnector';
    var startPosition = this.parentCommit.getPosition();
    var endPosition = this.tube.getFirstPointPosition();
    return new BranchConnector(name, startPosition, endPosition, this.scene, null, this.renderTextureMaterial);
  }
}

export default Branch;

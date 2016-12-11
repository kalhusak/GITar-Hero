import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';
import BranchConnector from './BranchConnector';
import ObjectTypes from './../ObjectTypes';
import Tube from './Tube';
import Commit from './Commit';

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

    this.parentCommit = parentCommit;
    this.tube = this._createTube();
    this.commits = [];

    if (this.parentCommit) {
      this.startConnector = this._createStartConnector();
    }
  }

  addCommit (commit) {
    commit.setPosition(this.tube.getLastPointPosition());
    this.commits.push(commit);
    this.tube.addParts(1);
  }

  getPositionRef () {
    return this.tube.getLastPointPositionRef();
  }

  getType () {
    return this.parentCommit ? ObjectTypes.BRANCH : ObjectTypes.MASTER;
  }

  merge (branch) {
    var mergeEvent = () => {
      var commit = new Commit('mergeCommit', 'Merge develop to master', this.scene);
      this.addCommit(commit);
      branch.addCommit(commit);
    };

    var adjustEvent = () => {
      if (deltaParts <= 0) {
        this.tube.addParts(1, mergeEvent);
      }
      branch.addEndConnector(endConnectorEndPosition);
    };

    var deltaZ = this.tube.getLastPointPosition().z - branch.tube.getLastPointPosition().z;
    var deltaParts = deltaZ / config.partLength;
    var endConnectorEndPosition = this.getPosition();
    endConnectorEndPosition.z += Math.abs(deltaZ) + config.partLength;
    if (deltaParts > 0) {
      branch.tube.addParts(deltaParts - 1, adjustEvent);
    } else if (deltaParts <= 0) {
      this.tube.addParts(Math.abs(deltaParts), adjustEvent);
    }
  }

  addEndConnector (endPosition) {
    if (!this.endConnector) {
      var name = this.name + '_endConnector';
      var startPosition = this.tube.getLastPointPosition();
      this.endConnector = new BranchConnector(name, startPosition, endPosition, this.scene);
    } else {
      console.log('WARNING - traing to add second end connector');
    }
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
    return new Tube(this.name + '_tube', position, config.partLength, this.scene, parts);
  }

  _createStartConnector () {
    var name = this.name + '_startConnector';
    var startPosition = this.parentCommit.getPosition();
    var endPosition = this.tube.getFirstPointPosition();
    return new BranchConnector(name, startPosition, endPosition, this.scene);
  }
}

export default Branch;

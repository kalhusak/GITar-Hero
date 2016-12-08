import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';
import BranchConnector from './BranchConnector';
import ObjectTypes from './../ObjectTypes';
import Tube from './Tube';

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

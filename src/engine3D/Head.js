import ObjectTypes from './ObjectTypes';
import FollowObject from './FollowObject';

export default class Head extends FollowObject {
  constructor (scene) {
    super(scene);
    this.isPointingToCommit = ::this.isPointingToCommit;
    this.isPointingToBranch = ::this.isPointingToBranch;
    this.isDetached = ::this.isDetached;
    this.pointTo = ::this.pointTo;

    this.scene = scene;
  }

  pointTo (object3D) {
    this.object3D = object3D;
  }

  isPointingToCommit () {
    return !this.isDetached() && this.object3D.getType() === ObjectTypes.COMMIT;
  }

  isPointingToBranch () {
    return !this.isDetached() && this.object3D.getType() === ObjectTypes.MASTER ||
           this.object3D.getType() === ObjectTypes.BRANCH;
  }

  isDetached () {
    return this.object3D === null;
  }

  getObject () {
    return this.object3D;
  }
}

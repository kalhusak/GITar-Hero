import FollowObject from './FollowObject';
import Branch from './objects/Branch';
import Commit from './objects/Commit';

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
    return !this.isDetached() && this.object3D instanceof Commit;
  }

  isPointingToBranch () {
    return !this.isDetached() && this.object3D instanceof Branch;
  }

  isDetached () {
    return this.object3D === null;
  }

  getObject () {
    return this.object3D;
  }
}

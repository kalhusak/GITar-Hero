import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';
import CommitAppear from '../animations/CommitAppear';
import CommitDisappear from '../animations/CommitDisappear';

let commitConfig = {
  segments: 16,
  diameter: 10
};

export default class Commit extends Abstract3DObject {

  constructor (ref, message, position, scene) {
    super(ref, scene);
    this._createSphere = ::this._createSphere;
    this.disappear = ::this.disappear;

    this.ref = ref;
    this.message = message;
    this.mesh = this._createSphere();
    this.setPosition(position);
    var commitAppearAnimation = new CommitAppear(this, scene);
    // TODO remove wireframe mat
    // var mat = new BABYLON.StandardMaterial("commitMat", scene);
    // mat.wireframe = true;
    // this.mesh.material = mat;
  }

  disappear () {
    var commitDisappearAnimation = new CommitDisappear(this, this.scene);
  }

  _createSphere () {
    return BABYLON.Mesh.CreateSphere(this.ref, commitConfig.segments, commitConfig.diameter, this.scene);
  }

}

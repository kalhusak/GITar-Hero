import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';

let commitConfig = {
  segments: 16,
  diameter: 10,
  animation: {
    fps: 30,
    duration: 0.4 // seconds
  }
};

export default class Commit extends Abstract3DObject {

  constructor (ref, message, scene) {
    super(ref, scene);
    this._createSphere = ::this._createSphere;
    this._appearAnimate = ::this._appearAnimate;
    this.ref = ref;
    this.message = message;
    this.mesh = this._createSphere();
    this._appearAnimate();
    // TODO remove mat
    var mat = new BABYLON.StandardMaterial("commitMat", scene);
    mat.wireframe = true;
    this.mesh.material = mat;
  }

  _createSphere () {
    return BABYLON.Mesh.CreateSphere(this.ref, commitConfig.segments, commitConfig.diameter, this.scene);
  }

  _appearAnimate () {
    const { fps, duration } = commitConfig.animation;
    var scaleAnimation = new BABYLON.Animation('commitScaleAnimation', 'scaling', fps, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(0, 0, 0) });
    keys.push({ frame: duration * fps, value: new BABYLON.Vector3(1, 1, 1) });
    scaleAnimation.setKeys(keys);
    var bezierEase = new BABYLON.BezierCurveEase(0.32, 1.49, 0.84, 1.34); // http://cubic-bezier.com/
    scaleAnimation.setEasingFunction(bezierEase);
    this.mesh.animations.push(scaleAnimation);
    this.scene.beginAnimation(this.mesh, 0, duration * fps, true);
  }

}

import BABYLON from 'babylonjs';
import { cloneDeep } from 'lodash';

const config = {
  shakeAmount: 0.2,
  duration: 300 // ms
};

class CameraShakeAnimation {
  constructor (camera, scene) {
    this._animate = ::this._animate;
    this._stop = ::this._stop;
    this.camera = camera;
    this.scene = scene;
    this.originCameraPosition = cloneDeep(camera.position);

    setTimeout(this._stop, config.duration);
    this.scene.registerBeforeRender(this._animate);
  }

  _animate () {
    var randomValue = ((Math.random() * 2) - 1) * config.shakeAmount;
    var xOffset = this.originCameraPosition.x - randomValue;
    this.camera.position.x = xOffset;
    this.camera.followObject.offset.x = randomValue;
  }

  _stop () {
    this.scene.unregisterBeforeRender(this._animate);
    this.camera.position.x = this.originCameraPosition.x;
    this.camera.followObject.offset.x = 0.0;
  }
}

export default CameraShakeAnimation;

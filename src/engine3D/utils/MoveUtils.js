import BABYLON from 'babylonjs';

export function getXZTranslationVector (translatedObject, targetObject, speed, offset) {
  var dx = targetObject.getPosition().x - translatedObject.getPosition().x;
  var dz = targetObject.getPosition().z - translatedObject.getPosition().z;
  if (offset) {
    dx -= offset.x;
    dz -= offset.z;
  }
  if (Math.abs(dx) <= speed && Math.abs(dz) <= speed) {
    return new BABYLON.Vector3(dx, 0, dz);
  } else {
    var angle = Math.atan2(dx, dz);
    var dVx = Math.sin(angle) * speed;
    var dVz = Math.cos(angle) * speed;
    return new BABYLON.Vector3(dVx, 0, dVz);
  }
}

export function moveTo (translatedObject, targetObject, speed, scene, offset) {
  var moveToAnimation = () => {
    var translation = getXZTranslationVector(translatedObject, targetObject, speed, offset);
    translatedObject.getPositionRef().addInPlace(translation);
    if (translation.equals(new BABYLON.Vector3.Zero())) {
      scene.unregisterBeforeRender(moveToAnimation);
    }
  };
  scene.registerBeforeRender(moveToAnimation);
}

export default {
  getXZTranslationVector,
  moveTo
};

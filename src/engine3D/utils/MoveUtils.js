import BABYLON from 'babylonjs';

export function getXZTranslationVector (translatedObject, targetObject, speed) {
  var dx = targetObject.getPosition().x - translatedObject.getPosition().x;
  var dz = targetObject.getPosition().z - translatedObject.getPosition().z;
  if (Math.abs(dx) <= speed && Math.abs(dz) <= speed) {
    return new BABYLON.Vector3(dx, 0, dz);
  } else {
    var angle = Math.atan2(dx, dz);
    var dVx = Math.sin(angle) * speed;
    var dVz = Math.cos(angle) * speed;
    return new BABYLON.Vector3(dVx, 0, dVz);
  }
}

export function moveTo (translatedObject, targetObject, speed, scene) {
  var moveToAnimation = () => {
    var translation = getXZTranslationVector(translatedObject, targetObject, speed);
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

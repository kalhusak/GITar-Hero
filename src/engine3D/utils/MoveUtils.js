import BABYLON from 'babylonjs';

export function getXZTranslationVector (translatedPosition, targetPosition, speed, offset) {
  var dx = targetPosition.x - translatedPosition.x;
  var dz = targetPosition.z - translatedPosition.z;
  if (offset) {
    dx += offset.x;
    dz += offset.z;
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

export function moveTo (translatedObject, targetObject, speed, scene, offset, endEvent) {
  var moveToAnimation = () => {
    var translation = getXZTranslationVector(translatedObject.getPosition(), targetObject.getPosition(), speed, offset);
    translatedObject.getPositionRef().addInPlace(translation);
    if (translation.equals(new BABYLON.Vector3.Zero())) {
      scene.unregisterBeforeRender(moveToAnimation);
      if (endEvent) {
        endEvent();
      }
    }
  };
  scene.registerBeforeRender(moveToAnimation);
}

export default {
  getXZTranslationVector,
  moveTo
};

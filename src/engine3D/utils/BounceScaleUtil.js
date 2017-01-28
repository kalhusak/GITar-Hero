import BABYLON from 'babylonjs';

export function bounceScaleAnimation (fps, duration, startScale, endScale) {
  const name = 'bounceScaleAnimation';
  const animType = BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
  const loopMode = BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
  var scaleAnimation = new BABYLON.Animation(name, 'scaling', fps, animType, loopMode);

  var keys = [];
  keys.push({ frame: 0, value: startScale });
  keys.push({ frame: duration * fps, value: endScale });
  scaleAnimation.setKeys(keys);

  var bezierEase = new BABYLON.BezierCurveEase(0.32, 1.49, 0.84, 1.34); // http://cubic-bezier.com/
  scaleAnimation.setEasingFunction(bezierEase);
  return scaleAnimation;
}

export default {
  bounceScaleAnimation
};

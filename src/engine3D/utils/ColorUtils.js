import BABYLON from 'babylonjs';

export function addColors (color1, color2) {
  var r = Math.min(1, color1.r + color2.r);
  var g = Math.min(1, color1.g + color2.g);
  var b = Math.min(1, color1.b + color2.b);
  return new BABYLON.Color3(r, g, b);
}

export default {
  addColors
};

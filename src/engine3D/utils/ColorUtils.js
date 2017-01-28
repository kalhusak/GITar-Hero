import BABYLON from 'babylonjs';

export const addColors = (color1, color2) => {
  const r = Math.min(1, color1.r + color2.r);
  const g = Math.min(1, color1.g + color2.g);
  const b = Math.min(1, color1.b + color2.b);
  return new BABYLON.Color3(r, g, b);
};

export const hexToBabylonColor = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);

  return result ? new BABYLON.Color3(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ) : BABYLON.Color3.White();
};

export default {
  addColors,
  hexToBabylonColor
};

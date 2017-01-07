import BABYLON from 'babylonjs';

export const outline = {
  enable: true,
  color: new BABYLON.Color3(0, 0, 0),
  width: 0.3
};

export const branch = {
  specularColor: new BABYLON.Color3(0.2, 0.2, 0.2),
  specularPower: 8,
  textStyle: {
    color: '#408040'
  }
};

// Text style can have specularColor(color3), emissiveColor(color3), specularPower(float), color(rgb string)
export const commit = {
  textStyle: {
    color: '#92409e'
  }
};

export const tag = {
  textStyle: {
    color: '#e2e756'
  }
};

export const ground = {
  flat: false,
  wavy: true,
  hideWhenScroll: true,
  maxHeight: 10,
  speed: 0.0003,
  fogDensity: 0.7, // from 0.0 to 1.0
  heightMap: 'heightMap.png',
  texture: 'codeTexture.png'
};

export default {
  outline,
  branch,
  ground,
  commit,
  tag
};

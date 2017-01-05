import BABYLON from 'babylonjs';

export const outline = {
  enable: true,
  color: new BABYLON.Color3(0, 0, 0),
  width: 0.3
};

// Text style can have specularColor(color3), emissiveColor(color3), specularPower(float), color(rgb string)

export const branch = {
  specularColor: new BABYLON.Color3(0.2, 0.2, 0.2),
  specularPower: 8,
  textStyle: {
    color: '#408040'
  }
};

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

export default {
  outline,
  branch,
  commit,
  tag
};

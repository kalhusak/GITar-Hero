import BABYLON from 'babylonjs';

export const outline = {
  enable: true,
  color: new BABYLON.Color3(0, 0, 0),
  width: 0.3
};

export const branch = {
  specularColor: new BABYLON.Color3(0.2, 0.2, 0.2),
  specularPower: 8,
  nameTextColor: new BABYLON.Color3(0, 1, 0)
};

export const commit = {
  nameTextColor: new BABYLON.Color3(1, 0, 0)
};

export const tag = {
  nameTextColor: new BABYLON.Color3(0, 0, 1)
};

export default {
  outline,
  branch
};

import BABYLON from 'babylonjs';

export const outline = {
  enable: true,
  color: new BABYLON.Color3(0, 0, 0),
  width: 0.3
};

export const branch = {
  specularColor: new BABYLON.Color3(0.2, 0.2, 0.2),
  specularPower: 8
};

export default {
  outline
};

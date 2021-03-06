import BABYLON from 'babylonjs';
import palettes from './colorPalettes';

export const scene = {
  color: '#212f3e',
  fog: false,
  fogDensity: 0.002
};

export const outline = {
  enable: false,
  color: new BABYLON.Color3(0, 0, 0),
  width: 0.3
};

export const branch = {
  colors:  palettes.cold05,
  specularColor: new BABYLON.Color3(0.2, 0.2, 0.2),
  specularPower: 8,
  textStyle: {
    color: '#FFFFFF'
  }
};

// Text style can have specularColor(color3), emissiveColor(color3), specularPower(float), color(rgb string)
export const commit = {
  brightningColor: new BABYLON.Color3(0.1, 0.1, 0.1)
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
  speed: 0.0006,
  fogDensity: 0.7, // from 0.0 to 1.0
  heightMap: 'heightMap.png',
  texture: 'codeTexture.png'
};

// all from 0.0 to 1.0
export const vignette = {
  innerRing: 0.6,
  outerRing: 1.0,
  power: 1.0,
  showConfiguration: false
};

export default {
  scene,
  outline,
  branch,
  ground,
  commit,
  tag,
  vignette
};

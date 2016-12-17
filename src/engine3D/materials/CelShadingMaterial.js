import BABYLON from 'babylonjs';
var vertextShader = require('raw-loader!../shaders/celShading.vert');
var fragmentShader = require('raw-loader!../shaders/celShading.frag');

const config = {
  name: 'celShading'
};

const shaderPath = {
  vertexElement: config.name + 'VertexShader',
  fragmentElement: config.name + 'PixelShader'
};

const options = {
  attributes: ['position', 'normal'],
  uniforms: ['worldViewProjection', 'worldView', 'diffuseColor']
};

BABYLON.Effect.ShadersStore[shaderPath.vertexElement] = vertextShader;
BABYLON.Effect.ShadersStore[shaderPath.fragmentElement] = fragmentShader;

class CelShadingMaterial extends BABYLON.ShaderMaterial {
  constructor (scene) {
    super(config.name + '_material', scene, config.name, options);
  }
}

export default CelShadingMaterial;

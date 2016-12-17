import BABYLON from 'babylonjs';
var vertextShader = require('raw-loader!../shaders/normal.vert');
var fragmentShader = require('raw-loader!../shaders/normal.frag');

const config = {
  name: 'normal'
};

const shaderPath = {
  vertexElement: config.name + 'VertexShader',
  fragmentElement: config.name + 'PixelShader'
};

const options = {
  attributes: ['position', 'normal'],
  uniforms: ['worldViewProjection', 'worldView']
};

BABYLON.Effect.ShadersStore[shaderPath.vertexElement] = vertextShader;
BABYLON.Effect.ShadersStore[shaderPath.fragmentElement] = fragmentShader;

class NormalMaterial extends BABYLON.ShaderMaterial {
  constructor (scene) {
    super(config.name + '_material', scene, config.name, options);
  }
}

export default NormalMaterial;

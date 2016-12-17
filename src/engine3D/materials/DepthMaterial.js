import BABYLON from 'babylonjs';
var vertextShader = require('raw-loader!../shaders/depth.vert');
var fragmentShader = require('raw-loader!../shaders/depth.frag');

const config = {
  name: 'depth'
};

const shaderPath = {
  vertexElement: config.name + 'VertexShader',
  fragmentElement: config.name + 'PixelShader'
};

const options = {
  attributes: ['position'],
  uniforms: ['worldViewProjection']
};

BABYLON.Effect.ShadersStore[shaderPath.vertexElement] = vertextShader;
BABYLON.Effect.ShadersStore[shaderPath.fragmentElement] = fragmentShader;

class DepthMaterial extends BABYLON.ShaderMaterial {
  constructor (scene) {
    super(config.name + '_material', scene, config.name, options);
  }
}

export default DepthMaterial;

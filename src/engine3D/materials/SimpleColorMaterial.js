import BABYLON from 'babylonjs';
var vertextShader = require('raw-loader!../shaders/simpleColor.vert');
var fragmentShader = require('raw-loader!../shaders/simpleColor.frag');

const config = {
  name: 'simpleColor'
};

const shaderPath = {
  vertexElement: config.name + 'VertexShader',
  fragmentElement: config.name + 'PixelShader'
};

const options = {
  attributes: ['position'],
  uniforms: ['worldViewProjection', 'diffuseColor']
};

BABYLON.Effect.ShadersStore[shaderPath.vertexElement] = vertextShader;
BABYLON.Effect.ShadersStore[shaderPath.fragmentElement] = fragmentShader;

class SimpleColorMaterial extends BABYLON.ShaderMaterial {
  constructor (scene, color) {
    super(config.name + '_material', scene, config.name, options);
    this.color = color;
    this.setColor3('diffuseColor', color);
  }
}

export default SimpleColorMaterial;

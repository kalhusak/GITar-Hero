import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';
import GroundMaterial from '../materials/GroundMaterial';

let config = {
  width: 200.0,
  length: 500.0,
  subdivisions: 100
};

export default class Ground extends Abstract3DObject {
  constructor (camera, scene) {
    super('ground', scene);
    this.update = ::this.update;
    this.camera = camera;
    this.scene = scene;

    this.mesh = BABYLON.Mesh.CreateGround('ground', config.width, config.length, config.subdivisions, scene);
    this.mesh.position = new BABYLON.Vector3(0, 0, 250);
    this.mesh.rotation.x = 1.7 * Math.PI; //(-10 * Math.PI)/180;
    this.mesh.material = new GroundMaterial(config.length, scene);
    //this.mesh.material = new BABYLON.StandardMaterial('simp', scene);
    //this.mesh.material.diffuseTexture = new BABYLON.Texture('textures/codeTexture.png', scene);
    //this.mesh.material.wireframe = true;
    this.scene.registerBeforeRender(this.update);
  }

  update () {
    var cameraPosition = this.camera.getPosition();
      this.mesh.position.z = cameraPosition.z + 250;
  }
}

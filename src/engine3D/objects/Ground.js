import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';
import GroundMaterial from '../materials/GroundMaterial';

let config = {
  width: 400,
  length: 400,
  subdivisions: 50
};

export default class Ground extends Abstract3DObject {
  constructor (camera, scene) {
    super('ground', scene);
    this.update = ::this.update;
    this.camera = camera;
    this.scene = scene;

    this.mesh = BABYLON.Mesh.CreateGround('ground', config.width, config.length, config.subdivisions, scene);
    this.mesh.position = new BABYLON.Vector3(0, -10, 0);
    this.mesh.material = new GroundMaterial(scene);
    // this.mesh.material = new BABYLON.StandardMaterial('simp', scene);
    // this.mesh.material.wireframe = true;
    this.scene.registerBeforeRender(this.update);
  }

  update () {
    var cameraPosition = this.camera.getPosition();
    this.mesh.position.x = cameraPosition.x;
    this.mesh.position.y = -15;
    this.mesh.position.z = cameraPosition.z + 100;
  }
}

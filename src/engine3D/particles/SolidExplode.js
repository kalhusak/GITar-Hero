import BABYLON from 'babylonjs';

let particleSeq = 0;
class SolidExplode extends BABYLON.SolidParticleSystem {

  constructor (scene, initPosition) {
    super('solidParticleSystem' + particleSeq, scene);
    this._initParticles = ::this._initParticles;
    this._recycleParticle = ::this._recycleParticle;
    this._updateParticle = ::this._updateParticle;

    this.scene = scene;
    this.initPosition = initPosition;

    this.radius = 1;
    this.scale = new BABYLON.Vector3(1, 1, 1);
    this.particle = BABYLON.Mesh.CreateSphere(this.name + 'particle', 3, 1, scene);

    this.addShape(this.particle, 500);
    this.mesh = this.buildMesh();
    this.mesh.position = this.initPosition;
    this.particle.dispose();

    this.initParticles = this._initParticles;
    this.recycleParticle = this._recycleParticle;
    this.updateParticle = this._updateParticle;

    this.computeParticleColor = false;
    this.computeParticleTexture = false;

    this.initParticles();
    this.setParticles();

    var updateParticles = () => {
      console.log(this.particles[0].scale);
      if (this.particles[0].scale.x <= 0) {
        this.scene.unregisterBeforeRender(updateParticles);
        this.dispose();
      } else {
        this.setParticles();
        this.scale.x -= 0.04;
        this.scale.y -= 0.04;
        this.scale.z -= 0.04;
      }
    };

    this.scene.registerBeforeRender(updateParticles);
  }

  _initParticles () {
    for (var p = 0; p < this.nbParticles; p++) {
      this.recycleParticle(this.particles[p]);
    }
  }

  _recycleParticle (particle) {
    particle.position = new BABYLON.Vector3.Zero();
    particle.scale = this.scale;

    var alfa = Math.random() * Math.PI;
    var beta = Math.random() * Math.PI * 2;
    particle.velocity.x = this.radius * Math.sin(alfa) * Math.cos(beta) / 2;
    particle.velocity.y = this.radius * Math.sin(alfa) * Math.sin(beta) / 2;
    particle.velocity.z = this.radius * Math.cos(alfa) / 2;
  }

  _updateParticle (particle) {
    particle.position.addInPlace(particle.velocity);
  }

}

export default SolidExplode;

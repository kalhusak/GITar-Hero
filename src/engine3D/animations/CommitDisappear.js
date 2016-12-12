import BABYLON from 'babylonjs';
import BounceScaleUtil from '../utils/BounceScaleUtil';
import AbstractCommitAnimation from './AbstractCommitAnimation';
import SolidExplodeParticles from '../particles/SolidExplodeParticles';

const config = {
  fps: 30,
  duration: 3
};

class CommitDisappear extends AbstractCommitAnimation {

  constructor (commit, scene) {
    super(commit, scene);

    this._animate();
  }

  _animate () {
    const { fps, duration } = config;
    var startScale = new BABYLON.Vector3(1, 1, 1);
    var endScale = new BABYLON.Vector3(0, 0, 0);
    var bounceScaleAnimation = BounceScaleUtil.bounceScaleAnimation(fps, duration, startScale, endScale);
    this.commit.mesh.animations.push(bounceScaleAnimation);
    this.scene.beginAnimation(this.commit.mesh, 0, duration * fps, true);
    var particles = new SolidExplodeParticles(this.scene, this.commit.getPosition());
  }
}

export default CommitDisappear;

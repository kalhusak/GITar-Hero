import BABYLON from 'babylonjs';
import BounceScaleUtil from '../utils/BounceScaleUtil'; // TODO remove or change anim
import AbstractCommitAnimation from './AbstractCommitAnimation';
import SolidExplodeParticles from '../particles/SolidExplode';

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
    var particles = new SolidExplodeParticles(this.scene, this.commit.getPosition());
    this.scene.removeMesh(this.commit.mesh);
  }
}

export default CommitDisappear;

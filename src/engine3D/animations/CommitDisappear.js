import AbstractCommitAnimation from './AbstractCommitAnimation';
import SolidExplodeParticles from '../particles/SolidExplode';

class CommitDisappear extends AbstractCommitAnimation {

  constructor (commit, scene) {
    super(commit, scene);

    this._animate();
  }

  _animate () {
    var particles = new SolidExplodeParticles(this.scene, this.commit.getPosition());
    this.scene.removeMesh(this.commit.mesh);
    this.scene.removeMesh(this.commit.text.textPlane);
  }
}

export default CommitDisappear;

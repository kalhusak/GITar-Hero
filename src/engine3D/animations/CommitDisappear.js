import AbstractCommitAnimation from './AbstractCommitAnimation';
import SolidExplodeParticles from '../particles/SolidExplode';

class CommitDisappear extends AbstractCommitAnimation {

  constructor (commit, scene) {
    super(commit, scene);

    this._animate();
  }

  _animate () {
    var particles = new SolidExplodeParticles(this.scene, this.commit.getPosition(), this.commit.mesh.material);

    this.commit.hideName(() => {
      this.commit.text.textPlane.dispose();
      this.commit.mesh = null;
      this.commit.text.textPlane = null;
      this.commit = null;
    });
    this.commit.mesh.dispose();
  }
}

export default CommitDisappear;

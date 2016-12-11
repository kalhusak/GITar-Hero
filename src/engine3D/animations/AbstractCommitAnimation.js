class AbstractCommitAnimation {

  constructor (commit, scene) {
    this._animate = ::this._animate;
    this.commit = commit;
    this.scene = scene;
  }

  _animate () {}

}

export default AbstractCommitAnimation;

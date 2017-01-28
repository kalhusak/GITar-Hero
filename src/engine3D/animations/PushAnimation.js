import AbstractPushPullAnimation from './AbstractPushPullAnimation';

const config = {
  duration: 0.6,
  height: 25.0
};

class PushAnimation extends AbstractPushPullAnimation {

  _animate () {
    var gradient = this.passedTime / config.duration;
    var easeValue = this.bezierEase.ease(gradient);
    this.branch.position.y = easeValue * config.height;
    this.commits.forEach((commit) => {
      commit.position.y = easeValue * config.height;
    });
    this.material.alpha = 1.0 - (easeValue > 0 ? easeValue : 0);

    if (this.branch.position.y >= config.height) {
      this.scene.unregisterBeforeRender(this._animate);
      this.branch.dispose();
      this.commits.forEach((commit) => {
        commit.dispose();
      });
    }
    this.passedTime += this.scene.elapsedTime / 1000;
  }
}

export default PushAnimation;

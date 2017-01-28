import AbstractPushPullAnimation from './AbstractPushPullAnimation';
import AddCommitsAnimation from './AddCommitsAnimation';

const config = {
  duration: 0.6,
  height: 25.0
};

class PullAnimation extends AbstractPushPullAnimation {

  _animate () {
    var gradient = this.passedTime / config.duration;
    var easeValue = this.bezierEase.ease(gradient);
    this.branch.position.y = config.height - (easeValue * config.height);
    this.commits.forEach((commit) => {
      commit.position.y = config.height - (easeValue * config.height);
    });
    this.material.alpha = 0.0 + (easeValue > 0 ? easeValue : 0);

    if (this.branch.position.y <= 0) {
      this.scene.unregisterBeforeRender(this._animate);
      this.branch.dispose();
      this.commits.forEach((commit) => {
        commit.dispose();
      });
      if (this.newCommits && this.newCommits.length > 0) {
        var addCommitsAnimation = new AddCommitsAnimation(this.newCommits, this.activeBranch, this.scene, this.endEvent);
      } else if (this.endEvent) {
        this.endEvent();
      }
    }
    this.passedTime += this.scene.elapsedTime / 1000;
  }
}

export default PullAnimation;

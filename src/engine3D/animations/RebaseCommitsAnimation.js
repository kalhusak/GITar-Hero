import BABYLON from 'babylonjs';

const config = {
  duration: 2.0,
  yOffset: 15.0,
  xOffset: 10.0
};

class RebaseCommitsAnimation {
  constructor (commits, newCommitsCount, scene) {
    if(commits && commits.length > 0) {
      this._animate = ::this._animate;
      this.newCommitsCount = newCommitsCount;
      this.commits = commits;
      this.scene = scene;
      this.bezierEase = new BABYLON.BezierCurveEase(1.0, 1.0, 0.25, 0.25);
      this.duration = config.duration + commits.length * 0.4 + newCommitsCount * 0.2;
      this.passedTime = 0.0;

      this.commits.forEach((commit) => {
        commit.initialPosition = commit.getPosition();
      });

      this.scene.registerBeforeRender(this._animate);
    }
  }

  _animate () {
    var gradient = this.passedTime / this.duration;
    var easeValue = this.bezierEase.ease(gradient);
    this.commits.forEach((commit) => {
      var xOffset = config.xOffset * Math.sin(Math.PI * easeValue);;
      var yOffset = config.yOffset * Math.sin(Math.PI * easeValue);;
      var zOffset = this.newCommitsCount * 30  * easeValue;
      var offset = new BABYLON.Vector3(xOffset, yOffset, zOffset);
      var newPosition = commit.initialPosition.add(offset);
      commit.setPosition(newPosition);
    });
    this.passedTime += this.scene.elapsedTime / 1000;

    if (gradient >= 1.0) {
      this.scene.unregisterBeforeRender(this._animate);
      this.commits.forEach((commit) => {
        commit.initialPosition = null;
      });
    }
  }
}

export default RebaseCommitsAnimation;

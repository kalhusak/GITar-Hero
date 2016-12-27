import BABYLON from 'babylonjs';

const config = {
  duration: 0.6,
  height: 25.0
};

class AbstractPushPullAnimation {
  constructor (branch, scene, newCommits) {
    this._animate = ::this._animate;
    this._cloneBranch = ::this._cloneBranch;
    this._cloneCommits = ::this._cloneCommits;
    this.scene = scene;
    this.newCommits = newCommits;
    this.passedTime = 0.0;
    this.activeBranch = branch;
    this.material = this._cloneMaterial(branch, this.scene);
    this.branch = this._cloneBranch(branch, this.material);
    this.commits = this._cloneCommits(branch, this.material);
    this.bezierEase = new BABYLON.BezierCurveEase(1, 1, 0.25, 0.25);
    this.scene.registerBeforeRender(this._animate);
  }

  _cloneBranch (branch, material) {
    this.branchPath = this._getPath(branch);
    var mesh = BABYLON.Mesh.CreateTube(branch.name + '_push_pull', this.branchPath, 2, 16, null,
                                        BABYLON.Mesh.CAP_ALL, this.scene);
    mesh.material = material;
    mesh.alwaysSelectAsActiveMesh = true;
    mesh.position.y = config.height;
    return mesh;
  }

  _cloneCommits (branch, material) {
    var commits = [];
    branch.commits.forEach((commit) => {
      var mesh = BABYLON.Mesh.CreateSphere(commit.ref + '_push_pull', 16, 10, this.scene);
      mesh.position = commit.getPosition();
      mesh.material = material;
      mesh.position.y = config.height;
      commits.push(mesh);
    });
    if (this.newCommits) {
      this.newCommits.forEach((newCommit, index) => {
        var point = this.branchPath[this.branchPath.length - (index + 2)];
        var mesh = BABYLON.Mesh.CreateSphere(newCommit.name + '_push_pull', 16, 10, this.scene);
        mesh.position = new BABYLON.Vector3(point.x, point.y, point.z);
        mesh.material = material;
        mesh.position.y = config.height;
        commits.push(mesh);
      });
    }
    return commits;
  }

  _cloneMaterial (branch, scene) {
    var material = new BABYLON.StandardMaterial(branch.name + '_material_clone', scene);
    material.diffuseColor = branch.material.diffuseColor;
    material.specularColor = branch.material.specularColor;
    material.specularPower = branch.material.specularPower;
    return material;
  }

  _getPath (branch) {
    var path = [];
    if (branch.startConnector) {
      path.push(...branch.startConnector.path);
    }
    if (branch.tube) {
      path.push(...branch.tube.path);
    }
    if (branch.endConnector) {
      path.push(...branch.endConnector.path);
    }
    if (this.newCommits && !branch.endConnector) {
      this.newCommits.forEach((newCommit) => {
        var last = path[path.length - 1];
        path.push(new BABYLON.Vector3(last.x, last.y, last.z + 30));
      });
    }
    return path;
  }
}

export default AbstractPushPullAnimation;

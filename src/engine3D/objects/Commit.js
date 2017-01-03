import BABYLON from 'babylonjs';
import CommitDisappear from '../animations/CommitDisappear';
import CommitAppear from '../animations/CommitAppear';
import Abstract3DObject from './Abstract3DObject';
import Text from './Text';
import { outline as outlineStyle, commit as commitStyle } from '../style';

let commitConfig = {
  segments: 16,
  diameter: 10
};

export default class Commit extends Abstract3DObject {

  constructor (ref, message, position, material, scene) {
    super(ref, scene);
    this._createSphere = ::this._createSphere;
    this.disappear = ::this.disappear;

    this.ref = ref;
    this.message = message;
    this.mesh = this._createSphere();
    this.setPosition(position);

    this.commitAppearAnimation = new CommitAppear(this, scene);
    var textPosition = position.clone();
    textPosition.y += 1;
    this.mesh.renderOutline = outlineStyle.enable;
    this.mesh.outlineColor = outlineStyle.color;
    this.mesh.outlineWidth = outlineStyle.width;
    this.mesh.material = material;
    this.text = new Text(message, textPosition, scene, { color: commitStyle.nameTextColor });
    this.isMergeCommit = false;
  }

  disappear () {
    var commitDisappearAnimation = new CommitDisappear(this, this.scene);
  }

  _createSphere () {
    return BABYLON.Mesh.CreateSphere(this.ref, commitConfig.segments, commitConfig.diameter, this.scene);
  }

}

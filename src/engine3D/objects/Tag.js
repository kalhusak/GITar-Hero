import Text from './Text';
import { tag as tagStyle } from '../style';

export default class Tag extends Text {

  constructor (version, commit, scene) {
    super('version: ' + version, commit.getPosition(), scene, { color: tagStyle.nameTextColor, hasAlpha: true, offset: 4 });
  }

}

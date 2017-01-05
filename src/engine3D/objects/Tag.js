import Text from './Text';
import { tag as tagStyle } from '../style';

export default class Tag extends Text {

  constructor (version, commit, scene) {
    super('version: ' + version, commit.getPosition(), scene, { ...tagStyle.textStyle, offset: 4 });
  }

}

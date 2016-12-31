import Text from './Text';

export default class Tag extends Text {

  constructor (version, commit, scene) {
    super('version: ' + version, commit.getPosition(), scene, { color: 'blue', hasAlpha: true, offset: 4 });
  }

}

import { branch as branchStyle } from './style';
import { flatMap } from 'lodash';
import { hexToBabylonColor } from './utils/ColorUtils';

class ColorFactory {
  constructor () {
    this.next = ::this.next;
    this.initColors = ::this.initColors;
    this.index = 0;

    this.initColors();
  }

  next (tags) {
    if (this.index === this.colors.length) {
      // index set to 2 (not 0), to avoid reusing colors of branches 'master' and 'develop'
      this.index = 2;
    }
    this.index++;
    return this.colors[this.index - 1];
  }

  initColors () {
    const { colors } = branchStyle;
    this.colors = flatMap(colors, hexToBabylonColor);
  }

}

export default new ColorFactory();

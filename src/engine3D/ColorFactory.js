import BABYLON from 'babylonjs';

var colors = [
  new BABYLON.Color3(0.64, 0.81, 0.37),
  new BABYLON.Color3(0.99, 0.86, 0.38),
  new BABYLON.Color3(0.99, 0.56, 0.59)
];

class ColorFactory {
  constructor () {
    this.next = this.next.bind(this);
    this.index = 0;
  }

  next (tags) {
    if (this.index === colors.length) {
      this.index = 0;
    }
    this.index++;
    return colors[this.index - 1];
  }

}

export default new ColorFactory();

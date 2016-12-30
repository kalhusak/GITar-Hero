import BABYLON from 'babylonjs';

var colors = [
  new BABYLON.Color3(0.545, 0.764, 0.290),
  new BABYLON.Color3(1.000, 0.756, 0.027),
  new BABYLON.Color3(0.956, 0.262, 0.211),
  new BABYLON.Color3(0.611, 0.152, 0.690),
  new BABYLON.Color3(0.129, 0.588, 0.952),
  new BABYLON.Color3(0.913, 0.117, 0.388),
  new BABYLON.Color3(0.803, 0.862, 0.223),
  new BABYLON.Color3(1.000, 0.341, 0.133),
  new BABYLON.Color3(0.474, 0.333, 0.282)
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

import BABYLON from 'babylonjs';
import config from './config';
import Branch from './Branch';
import Commit from './Commit';

let index = 0;

class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);

    // TODO move camera to separate class

    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this);
    let master = new Branch('master', null, this);
    var commit = new Commit('asd' + index, 'asda' + index, master.scene);
    master.addCommit(commit);
    let develop = new Branch('develop', commit, this);
  //  var commit = new Commit('fc34aq', 'my first commit', this);
  //  master.addCommit(commit);
  //  var develop = new Branch('develop', commit, this);

    document.addEventListener('keydown', (e) => {
      var key = e.which || e.keyCode;
      console.log('key', key);
      if (key === 67) {
        var commit = new Commit('asd' + index, 'asda' + index, master.scene);
        index++;
        master.addCommit(commit);
        //var zzz = new Branch('develop' + index, commit, master.scene);
      } else if (key === 66) {
        console.log("B_PRESSED");
        var commit = new Commit('asd' + index, 'asda' + index, master.scene);
        index++;
        develop.addCommit(commit);
        var xxx = new Branch('develop' + index, commit, master.scene);
      }
    });
  }
}

export default Scene;

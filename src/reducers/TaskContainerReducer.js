import * as actions from '../actions/CommandActions'

const defaultState = {
  list: [
    {
      title: "Commit modified files",
      steps: [
          {
            description: "stage files",
            executed: false,
            allowedCommands: [
              "git add -u",
              "git add -A"
            ]
          },
          {
            description: "make a commit",
            executed: false,
            allowedCommands: [
              "git commit",
            ]
          }
      ]
    },
    {
      title: "Create branch and download from remote",
      steps: [
          {
            description: "create branch",
            executed: false,
            allowedCommands: [
              "git branch",
              "git checkout -b"
            ]
          },
          {
            description: "download changes from origin master",
            executed: false,
            allowedCommands: [
              "git pull",
            ]
          }
      ]
    }
  ]
}

export default function taskContainerReducer(state = defaultState, action) {
  switch (action.type) {
    case actions.NEW_VALID_COMMAND:
      var newState = JSON.parse(JSON.stringify(state));
      setCurrentStepExecuted(newState);
      deleteCompletedTask(newState.list);
      return newState;
    default:
      return state;
  }
}

function setCurrentStepExecuted(state){
  var currentTask = state.list[0];
  var step = currentTask.steps.find((step) => step.executed === false);
  step.executed = true;
}

function deleteCompletedTask(tasks){
    var steps = tasks[0].steps;
    steps = steps.filter((step) => step.executed === false);
    console.log("STEPS", steps);
    if(steps.length === 0){
      tasks.splice(0, 1);
      console.log("TASK_COMPLETED", tasks);
    }
}

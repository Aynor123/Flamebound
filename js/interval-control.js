let allIntervals = [];
let gamePaused = false;
let gamePausedCounter = 0;

function createInterval(array, func, timing) {
    let intervalId = setInterval(func, timing);
    let intervalObject = { id: intervalId, func: func, timing: timing };
    array.push(intervalObject);
    return intervalId;
}

function reverseAllIntervals() {
    allIntervals.reverse();
}

function stopAllIntervals() {
    // reverseAllIntervals();
    allIntervals.forEach(intervalObj => {
        clearInterval(intervalObj.id);
    })
    gamePaused = true;
}

function clearAllIntervals() {
    for (let i = 0; i < 999; i++) window.clearInterval(i);
  }

//ALTERNATIVE?
// function resumeAllIntervals() {
//     allIntervals.forEach(intervalObj => {
//         intervalObj.id = setInterval(intervalObj.func, intervalObj.timing);
//     });
// }


function resumeAllIntervals() {
    let newIntervals = [...allIntervals];
    stopAllIntervals();
    allIntervals = [];
    newIntervals.forEach(intervalObj => {
       intervalObj.id = createInterval(allIntervals, intervalObj.func, intervalObj.timing);
    })
    gamePausedCounter++;
    gamePaused = false;
}

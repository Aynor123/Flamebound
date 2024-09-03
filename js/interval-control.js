let allIntervals = [];

function createInterval(array, func, timing) {
    let intervalId = setInterval(func, timing);
    let intervalObject = { id: intervalId, func: func, timing: timing };
    array.push(intervalObject);
    allIntervals.push(intervalObject);
    return intervalId;
}

function stopAllIntervals() {
    allIntervals.forEach(intervalObj => {
        clearInterval(intervalObj.id);
    });
}

function resumeAllIntervals() {
    allIntervals.forEach(intervalObj => {
        intervalObj.id = setInterval(intervalObj.func, intervalObj.timing);
    });
}
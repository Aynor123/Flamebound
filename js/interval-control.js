let allIntervals = [];
let gamePaused = false;
let gamePausedCounter = 0;


/**
 * This function is partially used to create a `setInterval` function with an interval ID/name and pushing it into
 * the array `allIntervals` together with the interval's timing in order to have access on the whole interval functionality
 * when resuming the game. This function assures that all interval parameters are resumed after the game has been paused by clearing all intervals.
 * @param {*} array - Represents an array containing all game intervals.
 * @param {*} func - Represents the content of the `setInterval` code.
 * @param {*} timing  - Represents the FPS timing of the `setInterval`.
 * @returns 
 */
function createInterval(array, func, timing) {
    let intervalId = setInterval(func, timing);
    let intervalObject = { id: intervalId, func: func, timing: timing };

    array.push(intervalObject);
    return intervalId;
}


/**
 * This function iterates through the array `allIntervals` and clears it.
 * This function is used as game pause feature.
 */
function stopAllIntervals() {
    allIntervals.forEach(intervalObj => {
        clearInterval(intervalObj.id);
    })
    gamePaused = true;
}


/**
 * This function resumes all previous cleared intervals by iterating through the array `newIntervals`,
 * which is a copy if the array `allIntervals`. The function then also stops all Intervals and clears the array `allIntervals` to avoid redundancies,
 * but to be honest...the effect of this line of code is highly questionable.
 */
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

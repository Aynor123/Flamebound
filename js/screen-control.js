/**
 * This code snippet is adding an event listener to the window object that listens for changes in the
 * device orientation to portrait mode. When the orientation changes, the provided callback function is executed.
*/
window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    let portrait = e.matches;
    let portraitScreen = document.getElementById('portrait-screen');

    if (portrait) {
        portraitScreen.classList.remove('d-none');
        stopAllIntervals();
        gamePaused = true;
        checkMobileDevice();
    } else {
        portraitScreen.classList.add('d-none');
        resumeAllIntervals();
        gamePaused = false;
        checkMobileDevice();
    }
});


/**
 * The function `checkScreenOrientation` checks if the screen orientation is portrait and adjusts the
 * game accordingly. It gets called when the user presses the start button.
 */
function checkScreenOrientation() {
    let portrait = window.matchMedia("(orientation: portrait)").matches;
    let portraitScreen = document.getElementById('portrait-screen');

    if (portrait) {
        portraitScreen.classList.remove('d-none');
        stopAllIntervals();
        gamePaused = true;
        checkMobileDevice();
    } else {
        portraitScreen.classList.add('d-none');
        resumeAllIntervals();
        gamePaused = false;
        checkMobileDevice();
    }
}


/**
 * This function makes the joystick and action butons visible.
 */
function showMobileControls() {
    let joystick = document.getElementById('joystick');
    let actionButtons = document.getElementById('action-btns');

    joystick.classList.remove('d-none');
    actionButtons.classList.remove('d-none');
}


/**
 * This function hides the joystick and anction buttons.
 */
function hideMobileControls() {
    let joystick = document.getElementById('joystick');
    let actionButtons = document.getElementById('action-btns');

    joystick.classList.add('d-none');
    actionButtons.classList.add('d-none');
}


/**
 * The function `checkMobileDevice` determines if the user is accessing the website from a mobile
 * device.
 * @returns The function `checkMobileDevice()` is returning a boolean value indicating whether the user
 * agent string contains any of the following keywords: "android", "iPad", "iPhone", "iPod", or
 * "windows phone". This code is used to determine whether the mobile game controls are shown.
 */
function checkMobileDevice() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    return /android|iPad|iPhone|iPod|windows phone/i.test(userAgent);
}


document.addEventListener('DOMContentLoaded', function () {
    if (checkMobileDevice()) {
        showMobileControls();
    } else {
        hideMobileControls();
    }
});


/**
 * Generates a loading screen as long as the DOM is not fully loaded. ProgressX 97.5% due to best fitting to the background image. 
 * Gets fixed by adding 2 percent afterwards.
 */ 
document.addEventListener('DOMContentLoaded', function () {
    let loadingBar = document.getElementById('loading-bar');
    let loadingPercentage = document.getElementById('loading-percentage');
    let loadingScreen = document.getElementById('loading-screen');
    let progressX = 0;
    let opacityBar = 0;

    let loadingInterval = setInterval(() => {
        progressX += 1; 
        loadingBar.style.backgroundSize = `${progressX}% 80%`;
        loadingPercentage.textContent = progressX + '%';
        opacityBar += 3;
        loadingBar.style.opacity = opacityBar + '%';

        if (progressX >= 97.5) {
            clearInterval(loadingInterval);
            loadingPercentage.textContent = progressX + 2 + '%';
            loadingScreen.style.display = 'none';
        }
    }, 1000 / 60);
});
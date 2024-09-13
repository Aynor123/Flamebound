window.matchMedia("(orientation: portrait)").addEventListener("change", e=> {
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

function showMobileControls() {
    let joystick = document.getElementById('joystick');
    let actionButtons = document.getElementById('action-btns');

    joystick.classList.remove('d-none');
    actionButtons.classList.remove('d-none');
}

function hideMobileControls() {
    let joystick = document.getElementById('joystick');
    let actionButtons = document.getElementById('action-btns');

    joystick.classList.add('d-none');
    actionButtons.classList.add('d-none');
}

function checkMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    return /android|iPad|iPhone|iPod|windows phone/i.test(userAgent);
}

document.addEventListener('DOMContentLoaded', function() {
    if (checkMobileDevice()) {
        showMobileControls();
    } else {
        hideMobileControls();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    
    let progressX = 0;
    let opacityBar = 0;
    let loadingSpeed = 30; // Adjust this value to make the loading bar faster or slower

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progressX += 1; // Increase progress
        loadingBar.style.backgroundSize = `${progressX}% 80%`;
        loadingPercentage.textContent = progressX + '%';

        opacityBar += 3;
        loadingBar.style.opacity = opacityBar + '%';

        if (progressX >= 97.5) {
            clearInterval(loadingInterval);
            
            // Hide loading screen and show page content
            loadingScreen.style.display = 'none';
        }
    }, loadingSpeed);
});
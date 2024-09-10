window.matchMedia("(orientation: portrait)").addEventListener("change", e=> {
let portrait = e.matches;
let portraitScreen = document.getElementById('portrait-screen');

if (portrait) {
    portraitScreen.classList.remove('d-none');
    stopAllIntervals();
    gamePaused = true;
} else {
    portraitScreen.classList.add('d-none');
    resumeAllIntervals();
    gamePaused = false;
}
});

function checkScreenOrientation() {
    let portrait = window.matchMedia("(orientation: portrait)").matches;
    let portraitScreen = document.getElementById('portrait-screen');

    if (portrait) {
        portraitScreen.classList.remove('d-none');
        stopAllIntervals();
        gamePaused = true;
    } else {
        portraitScreen.classList.add('d-none');
        resumeAllIntervals();
        gamePaused = false;
    }
}

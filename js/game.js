let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let currentKey = null;

/**
 * The `init` function initializes a canvas and mutes the sound effects of the main menu in order to avoid webbrowser violation.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    start_game_sound.muted = true;
    start_controls_sound.muted = true;
    start_about_sound.muted = true;
    close_sound.muted = true;
}

/**
 * This code is adding an event listener to the window for the 'keydown' event. When a key is
 * pressed, it checks if the game is over. If the game is not over, it then checks the keyCode of the
 * pressed key and sets the corresponding property in the `keyboard` object to true. The `keyboard`
 * object is likely used to keep track of which keys are currently pressed. 
*/
window.addEventListener('keydown', (event) => {
    if (world && world.gameIsOver) {
        return;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 65) {
        keyboard.A = true;
    }
    if (event.keyCode == 83) {
        keyboard.S = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
    if (event.keyCode == 70) {
        keyboard.F = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

/** 
 * This code is adding an event listener to the window for the 'keyup' event. When a key is
 * released, it checks the event's keyCode to determine which key was released. Based on the key code,
 * it sets the corresponding property in the `keyboard` object to false. This code is likely part of a
 * larger program that is tracking the state of various keys on the keyboard for use in a game or
 * application. 
*/
window.addEventListener('keyup', (event) => {
    if (world && world.gameIsOver) {
        return;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 65) {
        keyboard.A = false;
    }
    if (event.keyCode == 83) {
        keyboard.S = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
    if (event.keyCode == 70) {
        keyboard.F = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});

/**
 * The `startGame` function initializes the game by setting up various elements and transitioning to
 * the in-game view.
 */
function startGame() {
    let gameStartingPage = document.getElementById("game-starting-page");
    let musicMenu = document.getElementById("music-menu");
    let musicMenuIngame = document.getElementById("in-game-menu");
    let mobileControls = document.getElementById("mobile-controls");
    let mobileOverlay = document.getElementById("mobile-overlay");
    let legal = document.getElementById("legal");

    gameStarted = true;
    startGameMusicTransition(gameStartingPage, musicMenu);
    checkScreenOrientation();
    transitionToIngameView(gameStartingPage, legal, musicMenuIngame, mobileControls, mobileOverlay);
    if (allSoundsMuted) {
        muteIngameSounds();
    } else {
        unmuteIngameSounds();
    }
    if (checkMobileDevice()) {
        showMobileControls();
        if (gameStarted) {
            openFullScreen();
        }
    } else {
        hideMobileControls();
    }
}

/**
 * The function `startControls` plays a sound and displays a control menu overlay.
 */
function startControls() {
    start_controls_sound.play();
    let controlMenuOverlay = document.getElementById("control-menu");
    controlMenuOverlay.classList.remove("d-none");
}

/**
 * The function `startAbout` plays a sound and displays a about menu overlay.
 */
function startAbout() {
    start_about_sound.play();
    let aboutMenuOverlay = document.getElementById("about-menu");
    aboutMenuOverlay.classList.remove("d-none");
}

/**
 * The function `closeControlsMenu` closes the control menu overlay and plays a closing sound.
 */
function closeControlsMenu() {
    close_sound.play();
    let controlMenuOverlay = document.getElementById("control-menu");
    controlMenuOverlay.classList.add("d-none");
}

/**
 * The function `closeAboutMenu` closes the about menu overlay and plays a close sound.
 */
function closeAboutMenu() {
    close_sound.play();
    let aboutMenuOverlay = document.getElementById("about-menu");
    aboutMenuOverlay.classList.add("d-none");
}

/** 
 * This is handling touch events on a grid of cells (td elements used for the joystick). 
 * When a touchstart event is detected on a cell, it determines the position of the touch 
 * and triggers movement based on the cell's location within the grid without requiring 
 * the user to break contact with the touchscreen. 
  */
document.querySelectorAll('td').forEach(cell => {
    cell.addEventListener('touchstart', (event) => {
        event.preventDefault();
        let touch = event.touches[0];
        let element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element) {
            handleMovement(touch.clientX, touch.clientY);
        }
    }, { passive: false });
});

/**
 * This function extend s the query selector and detects if the current touche element is the same cell as previously touched.
 * If not it sets all movements to false, updates the var `currentKey` and sets the new key to true.
 */
document.addEventListener('touchmove', (event) => {
    event.preventDefault();
    let touch = event.touches[0];
    let element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.id !== currentKey) {
        resetMovement();
        currentKey = element.id;
        handleMovement(touch.clientX, touch.clientY);
    }
}, { passive: false });

/**
 * This listener detects if no touch happens.
 */
document.addEventListener('touchend', (event) => {
    resetMovement();
    currentKey = null;
}, { passive: false });

/**
 * This function handles the movement of the character as soon as the y- and x-coordinates detect a td-element (part of the joystick) touched by the user.
 * @param {*} x - Represents the x-coordinate.
 * @param {*} y - Represents the x-coordinate.
 */
function handleMovement(x, y) {
    let element = document.elementFromPoint(x, y);

    if (element) {
        switch (element.id) {
            case 'top-left':
                keyboard.LEFT = true;
                keyboard.UP = true;
                break;
            case 'top-right':
                keyboard.RIGHT = true;
                keyboard.UP = true;
                break;
            case 'bottom-left':
                keyboard.LEFT = true;
                keyboard.DOWN = true;
                break;
            case 'bottom-right':
                keyboard.RIGHT = true;
                keyboard.DOWN = true;
                break;
            case 'top':
                keyboard.UP = true;
                break;
            case 'bottom':
                keyboard.DOWN = true;
                break;
            case 'left':
                keyboard.LEFT = true;
                break;
            case 'right':
                keyboard.RIGHT = true;
                break;
        }
    }
}

/**
 * This listener sets the action keys to true if touched.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('jump-btn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    }, { passive: false });

    document.getElementById('jump-btn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    }, { passive: false });

    document.getElementById('fireball-btn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.S = true;
    }, { passive: false });

    document.getElementById('fireball-btn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.S = false;
    }, { passive: false });

    document.getElementById('mana-portion-btn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.F = true;
    }, { passive: false });

    document.getElementById('mana-portion-btn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.F = false;
    }, { passive: false });
});

/**
 * This function sets the movement keys to false.
 */
function resetMovement() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
}

/**
 * The function `openIngameMenu` opens the in-game menu by displaying the pause menu and stopping all
 * intervals.
 */
function openIngameMenu() {
    let pauseMenu = document.getElementById('pause-menu');

    stopAllIntervals();
    pauseMenu.classList.remove("d-none");
}

/**
 * The function `resumeGame` resumes all intervals and hides the pause menu in a JavaScript game.
 */
function resumeGame() {
    let pauseMenu = document.getElementById('pause-menu');

    resumeAllIntervals();
    pauseMenu.classList.add("d-none");
}

/**
 * The function `showIngameControls` displays the in-game controls while hiding the in-game menu.
 */
function showIngameControls() {
    let ingameControls = document.getElementById('ingame-controls');
    let ingameMenu = document.getElementById('ingame-menu');

    ingameControls.classList.remove("d-none");
    ingameMenu.classList.add("d-none");
}

/**
 * The function `closeIngameControls` hides the ingame controls and shows the ingame menu.
 */
function closeIngameControls() {
    let ingameControls = document.getElementById('ingame-controls');
    let ingameMenu = document.getElementById('ingame-menu');

    ingameControls.classList.add("d-none");
    ingameMenu.classList.remove("d-none");
}
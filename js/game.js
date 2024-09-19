let canvas;
let world;
let keyboard = new Keyboard();
let allSoundsMuted = true;
let gameStarted = false;


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
 * The function initializes a canvas, character, and level in a world object and clears any existing
 * interval before creating a new World instance.
 */
function init2() {
    canvas = null;
    world.character = null;
    world.level = null;
    if (world && world.intervalId) {
        clearInterval(world.intervalId);
    }
    canvas = canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * This code is adding an event listener to the window for the 'keydown' event. When a key is
 * pressed, it checks if the game is over. If the game is not over, it then checks the keyCode of the
 * pressed key and sets the corresponding property in the `keyboard` object to true. The `keyboard`
 * object is likely used to keep track of which keys are currently pressed. 
*/
window.addEventListener('keydown', (event) => {
    if (world.gameIsOver) {
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
    if (world.gameIsOver) {
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
 * The function `toggleSoundMainMenu` toggles the sound on and off for the main menu interface.
 */
function toggleSoundMainMenu() {
    onOffHandler = document.getElementById('onoff-handler');
    onOffHandlerHover = document.getElementById('onoff-handler-hover');
    speaker = document.getElementById('speaker');
    onOffHandler.classList.toggle('onoff-handler-active');
    onOffHandlerHover.classList.toggle('onoff-handler-hover-active');

    if (allSoundsMuted) {
        speaker.src = '../assets/GUI/SpeakerIcon_On.webp';
        unmuteMainMenuSounds();
        menu_sound.play();
        allSoundsMuted = false;
    } else {
        speaker.src = '../assets/GUI/SpeakerIcon_Off.webp';
        muteMainMenuSounds();
        allSoundsMuted = true;
    }
    updateIngameMusicButtonState();
}


/**
 * The function `toggleSoundIngame` toggles the sound on and off in the ingame interface.
 */
function toggleSoundIngame() {
    onOffHandlerIngame = document.getElementById('onoff-handler-ingame');
    onOffHandlerHoverIngame = document.getElementById('onoff-handler-hover-ingame');
    speakerIngame = document.getElementById('speaker-ingame');

    if (allSoundsMuted) {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_On.webp';
        onOffHandlerIngame.classList.add('onoff-handler-active-ingame');
        onOffHandlerHoverIngame.classList.add('onoff-handler-hover-active-ingame');
        unmuteIngameSounds();
        allSoundsMuted = false;
    } else {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_Off.webp';
        onOffHandlerIngame.classList.remove('onoff-handler-active-ingame');
        onOffHandlerHoverIngame.classList.remove('onoff-handler-hover-active-ingame');
        muteIngameSounds();
        allSoundsMuted = true;
    }
    updateMainMenuMusicButtonState();
}


/**
 * The function `updateIngameMusicButtonState` updates the visual state of an in-game music button
 * based on whether all sounds are muted or not.
 */
function updateIngameMusicButtonState() {
    let speakerIngame = document.getElementById('speaker-ingame');
    let onOffHandlerIngame = document.getElementById('onoff-handler-ingame');
    let onOffHandlerHoverIngame = document.getElementById('onoff-handler-hover-ingame');

    if (allSoundsMuted) {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_Off.webp';
        onOffHandlerIngame.classList.remove('onoff-handler-active-ingame');
        onOffHandlerHoverIngame.classList.remove('onoff-handler-hover-active-ingame');
    } else {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_On.webp';
        onOffHandlerIngame.classList.add('onoff-handler-active-ingame');
        onOffHandlerHoverIngame.classList.add('onoff-handler-hover-active-ingame');
    }
}


/**
 * The function `updateMainMenuMusicButtonState` updates the visual state of a main menu music button
 * based on whether all sounds are muted or not.
 */
function updateMainMenuMusicButtonState() {
    let speaker = document.getElementById('speaker');
    let onOffHandler = document.getElementById('onoff-handler');
    let onOffHandlerHover = document.getElementById('onoff-handler-hover');

    if (allSoundsMuted) {
        speaker.src = '../assets/GUI/SpeakerIcon_Off.webp';
        onOffHandler.classList.remove('onoff-handler-active');
        onOffHandlerHover.classList.remove('onoff-handler-hover-active');
    } else {
        speaker.src = '../assets/GUI/SpeakerIcon_On.webp';
        onOffHandler.classList.add('onoff-handler-active');
        onOffHandlerHover.classList.add('onoff-handler-hover-active');
    }
}


/** 
 * This is handling touch events on a grid of cells (td elements used for the joystick). 
 * When a touchstart event is detected on a cell, it determines the position of the touch 
 * and triggers movement based on the cell's location within the grid without requiring 
 * the user to break contact with the touchscreen. The handleMovement function sets keyboard
 * properties (LEFT, RIGHT, UP, DOWN) based on the cell's id, indicating the direction of movement.
 * The resetMovement function resets all keyboard properties to false.
  */
document.addEventListener('DOMContentLoaded', () => {
    let currentKey = null;

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


    function resetMovement() {
        keyboard.LEFT = false;
        keyboard.RIGHT = false;
        keyboard.UP = false;
        keyboard.DOWN = false;
    }


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


    document.addEventListener('touchend', (event) => {
        resetMovement();
        currentKey = null;
    }, { passive: false });


    document.getElementById('jump-btn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        console.log("Jump button touched");
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


/**
 * The function `backToTitleScreen` reloads the current page to go back to the title screen.
 */
function backToTitleScreen() {
    location.reload();
}


/**
 * The function `startGameMusicTransition` plays game starting sounds, transitions the game starting
 * page, and adjusts the volume.
 * @param gameStartingPage - gameStartingPage is the HTML element that represents the starting page of
 * the game, which gets hidden.
 * @param musicMenu - The `musicMenu` parameter refers to the toggle switch in the main menu, whcih also gets hidden.
 */
function startGameMusicTransition(gameStartingPage, musicMenu) {
    start_game_sound.play();
    menu_sound.pause();
    menu_sound.currentTime = 0;
    graveyard_sound.play();
    gameStartingPage.classList.add("fade-out");
    musicMenu.classList.add("d-none");
    reduceVolume();
}


/**
 * The function `transitionToIngameView` hides main menu elements and shows/updates the ingame music toggle switch 
 * after a delay of 375 milliseconds.
 * @param gameStartingPage - The `gameStartingPage` parameter is a reference to the HTML element
 * that represents the starting page of the game.
 * @param legal - The `legal` parameter refers to an element on the webpage that contains legal
 * information or terms of service related to the game. In the `transitionToIngameView` function, this
 * element is being hidden by adding the "d-none" class to it.
 * @param musicMenuIngame - The `musicMenuIngame` parameter is a reference to the ingame music toggle switch.
 * In the `transitionToIngameView` function, it is being used to remove the "d-none" class from this element, making it visible.
 * @param mobileControls - The `mobileControls` parameter in the `transitionToIngameView` function is
 * a reference to an HTML element that contains controls for the game specifically designed for
 * mobile devices. When the function is called, it removes the "d-none" class from this element, making
 * it visible to the player.
 * @param mobileOverlay - The `mobileOverlay` parameter in the `transitionToIngameView` function is a
 * reference to an HTML element that is used to display an overlay on the game screen for mobile
 * devices.
 */
function transitionToIngameView(gameStartingPage, legal, musicMenuIngame, mobileControls, mobileOverlay) {
    setTimeout(function () {
        gameStartingPage.classList.add("d-none");
        legal.classList.add("d-none");
        musicMenuIngame.classList.remove("d-none");
        mobileControls.classList.remove("d-none");
        mobileOverlay.classList.remove("d-none");
        updateIngameMusicButtonState();
    }, 375);
}


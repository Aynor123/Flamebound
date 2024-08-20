let canvas;
let world;
let keyboard = new Keyboard();
let start_game_sound = new Audio('../sounds/buttonstartclick.mp3');
let start_controls_sound = new Audio('../sounds/buttonclick1.mp3');
let start_about_sound = new Audio('../sounds/buttonclick.mp3');
let menu_sound = new Audio('../sounds/menuambientemenace.mp3');
let close_sound = new Audio('../sounds/close.mp3');
let graveyard_sound = new Audio('../sounds/graveyard ambiente.mp3')

function toggleSoundMainMenu() {
    onOffHandler = document.getElementById('onoff-handler');
    onOffHandlerHover = document.getElementById('onoff-handler-hover');
    speaker = document.getElementById('speaker');

    onOffHandler.classList.toggle('onoff-handler-active');
    onOffHandlerHover.classList.toggle('onoff-handler-hover-active');

    if (onOffHandler.classList.contains('onoff-handler-active')) {
        speaker.src = '../assets/GUI/SpeakerIcon_On.webp';
        menu_sound.muted = false;
        menu_sound.loop = true;
        menu_sound.volume = 0.3;
        menu_sound.play();
        
    } else {
        speaker.src = '../assets/GUI/SpeakerIcon_Off.webp';
        menu_sound.muted = true;
    }
}

function toggleSoundIngame() {
    onOffHandlerIngame = document.getElementById('onoff-handler-ingame');
    onOffHandlerHoverIngame = document.getElementById('onoff-handler-hover-ingame');
    speakerIngame = document.getElementById('speaker-ingame');

    onOffHandlerIngame.classList.toggle('onoff-handler-active-ingame');
    onOffHandlerHoverIngame.classList.toggle('onoff-handler-hover-active-ingame');

    if (onOffHandlerIngame.classList.contains('onoff-handler-active-ingame')) {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_On.webp';
        menu_sound.muted = false;
        menu_sound.loop = true;
        menu_sound.volume = 0.3;
        menu_sound.play();
        
    } else {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_Off.webp';
        menu_sound.muted = true;
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}



window.addEventListener('keydown', (event) => {
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
    console.log(event);
});

window.addEventListener('keyup', (event) => {
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
    console.log(event);
});

function startGame() {
    let gameStartingPage = document.getElementById("game-starting-page");
    let musicMenu = document.getElementById("music-menu");
    let musicMenuIngame = document.getElementById("in-game-menu");
    gameStartingPage.classList.add("fade-out");
    musicMenu.classList.add("d-none");
    start_game_sound.play();
    setTimeout(function () {
        gameStartingPage.classList.add("d-none");
        musicMenuIngame.classList.remove("d-none"); 
    }, 5000);
    menu_sound.pause();
    menu_sound.currentTime = 0;
    graveyard_sound.muted = false;
    graveyard_sound.loop = true;
    graveyard_sound.volume = 0.2;
    graveyard_sound.play();
}

function startControls() {
    start_controls_sound.play();
    let controlMenuOverlay = document.getElementById("control-menu");
    controlMenuOverlay.classList.remove("d-none");
}

function startAbout() {
    start_about_sound.play();
    let aboutMenuOverlay = document.getElementById("about-menu");
    aboutMenuOverlay.classList.remove("d-none");
}

function closeControlsMenu() {
    close_sound.play();
    let controlMenuOverlay = document.getElementById("control-menu");
    controlMenuOverlay.classList.add("d-none");
}

function closeAboutMenu() {
    close_sound.play();
    let aboutMenuOverlay = document.getElementById("about-menu");
    aboutMenuOverlay.classList.add("d-none");
}

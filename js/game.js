let canvas;
let world;
let keyboard = new Keyboard();
let start_game_sound = new Audio('../sounds/buttonstartclick.mp3');
let start_controls_sound = new Audio('../sounds/buttonclick1.mp3');
let start_about_sound = new Audio('../sounds/buttonclick.mp3');
let menu_sound = new Audio('../sounds/menuambientemenace.mp3');





function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    menu_sound.loop = true;
    menu_sound.volume = 0.6;
    menu_sound.play();
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
    gameStartingPage.classList.add("fade-out");
    start_game_sound.play();
    setTimeout(function () {
        gameStartingPage.classList.add("d-none");
    }, 5000);
    menu_sound.pause();      
    menu_sound.currentTime = 0;
}

function startControls() {
    start_controls_sound.play();
}

function startAbout() {
    start_about_sound.play();
}

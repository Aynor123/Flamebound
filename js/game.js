let canvas;
let world;
let keyboard = new Keyboard();
let allSoundsMuted = true;
let start_game_sound = new Audio('../sounds/buttonstartclick.mp3');
let start_controls_sound = new Audio('../sounds/buttonclick1.mp3');
let start_about_sound = new Audio('../sounds/buttonclick.mp3');
let menu_sound = new Audio('../sounds/menuambientemenace.mp3');
let close_sound = new Audio('../sounds/close.mp3');
let graveyard_sound = new Audio('../sounds/graveyard ambiente.mp3')


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    start_game_sound.muted = true;
    start_controls_sound.muted = true;
    start_about_sound.muted = true;
    close_sound.muted = true;
}
//???
// function init2() {
//     world = null;
//     world = new World(canvas, keyboard); 
// }


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
        updateIngameMusicButtonState();
    }, 375);
    menu_sound.pause();
    menu_sound.currentTime = 0;
    graveyard_sound.play();
    graveyard_sound.loop = true;
    graveyard_sound.volume = 0.2;
    if (allSoundsMuted) {
        graveyard_sound.muted = true;
        world.character.walking_sound.muted = true;
        world.character.drink_sound.muted = true;
        world.fireball_hit_sound.muted = true;
        world.fireball_casting_sound.muted = true;
        world.collect_portion_sound.muted = true;
        world.fireball_failed_to_cast_sound.muted = true;
        world.boss_encounter_sound.muted = true;
        world.character_hit_sound.muted = true;
        world.skeleton_dies_sound.muted = true;
        world.endboss_dies_sound.muted = true;
        world.endboss.endbossCastsPoison.muted = true;
        world.defeat_sound.muted = true;
    } else {
        graveyard_sound.muted = false;
        world.character.walking_sound.muted = false;
        world.character.drink_sound.muted = false;
        world.fireball_hit_sound.muted = false;
        world.fireball_casting_sound.muted = false;
        world.collect_portion_sound.muted = false;
        world.fireball_failed_to_cast_sound.muted = false;
        world.boss_encounter_sound.muted = false;
        world.character_hit_sound.muted = false;
        world.skeleton_dies_sound.muted = false;
        world.endboss_dies_sound.muted = false;
        world.endboss.endbossCastsPoison.muted = false;
        world.defeat_sound.muted = false;
    }
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


function toggleSoundMainMenu() {
    onOffHandler = document.getElementById('onoff-handler');
    onOffHandlerHover = document.getElementById('onoff-handler-hover');
    speaker = document.getElementById('speaker');
    onOffHandler.classList.toggle('onoff-handler-active');
    onOffHandlerHover.classList.toggle('onoff-handler-hover-active');

    if (allSoundsMuted) {
        speaker.src = '../assets/GUI/SpeakerIcon_On.webp';
        menu_sound.muted = false;
        menu_sound.loop = true;
        menu_sound.volume = 0.3;
        menu_sound.play();
        start_game_sound.muted = false;
        start_controls_sound.muted = false;
        start_about_sound.muted = false;
        close_sound.muted = false;
        world.character.walking_sound.muted = false;
        world.character.drink_sound.muted = false;
        world.fireball_hit_sound.muted = false;
        world.fireball_casting_sound.muted = false;
        world.fireball_failed_to_cast_sound.muted = false;
        world.boss_encounter_sound.muted = false;
        world.collect_portion_sound.muted = false;
        world.character_hit_sound.muted = false;
        world.skeleton_dies_sound.muted = false;
        world.endboss_dies_sound.muted = false;
        world.endboss.endbossCastsPoison.muted = false;
        world.defeat_sound.muted = false;
        allSoundsMuted = false;
    } else {
        speaker.src = '../assets/GUI/SpeakerIcon_Off.webp';
        menu_sound.muted = true;
        start_game_sound.muted = true;
        start_controls_sound.muted = true;
        start_about_sound.muted = true;
        close_sound.muted = true;
        world.character.walking_sound.muted = true;
        world.character.drink_sound.muted = true;
        world.fireball_hit_sound.muted = true;
        world.fireball_casting_sound.muted = true;
        world.fireball_failed_to_cast_sound.muted = true;
        world.boss_encounter_sound.muted = true;
        world.collect_portion_sound.muted = true;
        world.character_hit_sound.muted = true;
        world.skeleton_dies_sound.muted = true;
        world.endboss_dies_sound.muted = true;
        world.endboss.endbossCastsPoison.muted = true;
        world.defeat_sound.muted = true;
        allSoundsMuted = true;
    }
    updateIngameMusicButtonState();
}


function toggleSoundIngame() {
    onOffHandlerIngame = document.getElementById('onoff-handler-ingame');
    onOffHandlerHoverIngame = document.getElementById('onoff-handler-hover-ingame');
    speakerIngame = document.getElementById('speaker-ingame');

    if (allSoundsMuted) {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_On.webp';
        onOffHandlerIngame.classList.add('onoff-handler-active-ingame');
        onOffHandlerHoverIngame.classList.add('onoff-handler-hover-active-ingame');

        graveyard_sound.muted = false;
        world.character.walking_sound.muted = false;
        world.character.drink_sound.muted = false;
        world.fireball_hit_sound.muted = false;
        world.fireball_casting_sound.muted = false;
        world.fireball_failed_to_cast_sound.muted = false;
        world.boss_encounter_sound.muted = false;
        world.collect_portion_sound.muted = false;
        world.character_hit_sound.muted = false;
        world.skeleton_dies_sound.muted = false;
        world.endboss_dies_sound.muted = false;
        world.endboss.endbossCastsPoison.muted = false;
        world.defeat_sound.muted = false;
        allSoundsMuted = false;
    } else {
        speakerIngame.src = '../assets/GUI/SpeakerIcon_Off.webp';
        onOffHandlerIngame.classList.remove('onoff-handler-active-ingame');
        onOffHandlerHoverIngame.classList.remove('onoff-handler-hover-active-ingame');

        graveyard_sound.muted = true;
        world.character.walking_sound.muted = true;
        world.character.drink_sound.muted = true;
        world.fireball_hit_sound.muted = true;
        world.fireball_casting_sound.muted = true;
        world.fireball_failed_to_cast_sound.muted = true;
        world.boss_encounter_sound.muted = true;
        world.collect_portion_sound.muted = true;
        world.character_hit_sound.muted = true;
        world.skeleton_dies_sound.muted = true;
        world.endboss_dies_sound.muted = true;
        world.endboss.endbossCastsPoison.muted = true;
        world.defeat_sound.muted = true;
        allSoundsMuted = true;
    }
    updateMainMenuMusicButtonState();
}


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

function setTrackedInterval(callback, delay) {
    let intervalId = setInterval(callback, delay);
    this.intervals.push(intervalId);
    return intervalId;
}
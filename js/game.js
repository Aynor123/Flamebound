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
// function init2() {
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
    let mobileControls = document.getElementById("mobile-controls");
    let mobileOverlay = document.getElementById("mobile-overlay");
    let legal = document.getElementById("legal");
    gameStartingPage.classList.add("fade-out");
    musicMenu.classList.add("d-none");
    start_game_sound.play();
    checkScreenOrientation();
    setTimeout(function () {
        gameStartingPage.classList.add("d-none");
        legal.classList.add("d-none");
        musicMenuIngame.classList.remove("d-none");
        mobileControls.classList.remove("d-none");
        mobileOverlay.classList.remove("d-none");
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
        world.victory_sound.muted = true;
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
        world.victory_sound.muted = false;
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
        world.victory_sound.muted = false;
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
        world.victory_sound.muted = true;
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
        world.victory_sound.muted = false;
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
        world.victory_sound.muted = true;
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

    // Start touch
    document.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Prevent default touch behavior
            let touch = event.touches[0];
            let element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element) {
                handleMovement(touch.clientX, touch.clientY);
            }
        }, { passive: false });  // Set passive: false to allow preventDefault
    });

    // Detect touch movement
    document.addEventListener('touchmove', (event) => {
        event.preventDefault();
        let touch = event.touches[0];
        let element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.id !== currentKey) {
            resetMovement();
            currentKey = element.id;
            handleMovement(touch.clientX, touch.clientY);
        }
    }, { passive: false });  // Set passive: false

    // End touch
    document.addEventListener('touchend', (event) => {
        resetMovement();
        currentKey = null;
    }, { passive: false });
});

document.addEventListener('DOMContentLoaded', () => {
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

function openIngameMenu() {
    let pauseMenu = document.getElementById('pause-menu');

    stopAllIntervals();
    pauseMenu.classList.remove("d-none");
}

function resumeGame() {
    let pauseMenu = document.getElementById('pause-menu');
    
    resumeAllIntervals();
    pauseMenu.classList.add("d-none");
}

function showIngameControls() {
    let ingameControls = document.getElementById('ingame-controls');
    let ingameMenu = document.getElementById('ingame-menu');

    ingameControls.classList.remove("d-none");
    ingameMenu.classList.add("d-none");
}

function closeIngameControls() {
    let ingameControls = document.getElementById('ingame-controls');
    let ingameMenu = document.getElementById('ingame-menu');

    ingameControls.classList.add("d-none");
    ingameMenu.classList.remove("d-none");
}

function backToTitleScreen() {
    location.reload();
}

function resetGame() {
    // Clear existing game state, timers, or intervals
    if (world) {
        world.clear();  // Make sure World class has a clear method to stop ongoing processes.
    }

    // Re-initialize the game
    init();
}



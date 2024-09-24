/** 
* Game Menu Sounds with volume adjustment. 
*/
let start_game_sound = new Audio('../sounds/buttonstartclick.mp3');
let start_controls_sound = new Audio('../sounds/buttonclick1.mp3');
let start_about_sound = new Audio('../sounds/buttonclick.mp3');
let menu_sound = new Audio('../sounds/menuambientemenace.mp3');
let close_sound = new Audio('../sounds/close.mp3');
let graveyard_sound = new Audio('../sounds/graveyard ambiente.mp3');

let allSoundsMuted = true;

graveyard_sound.loop = true;
menu_sound.loop = true;

graveyard_sound.volume = 0.1;
menu_sound.volume = 0.2;
close_sound.volume = 0.5;
start_game_sound.volume = 0.3;
start_controls_sound.volume = 0.3;
start_about_sound.volume = 0.3;

/** 
* World Sounds. 
*/
let collect_portion_sound = new Audio('../sounds/collectportion.mp3');
let fireball_hit_sound = new Audio('../sounds/fireballhitshortened.mp3');
let fireball_casting_sound = new Audio('../sounds/fireballcasting.mp3');
let fireball_failed_to_cast_sound = new Audio('../sounds/failedtocastfireball.mp3');
let boss_encounter_sound = new Audio('../sounds/bossencounter.mp3');
let character_hit_sound = new Audio('../sounds/characterhit.mp3');
let skeleton_dies_sound = new Audio('../sounds/skeletondies.mp3');
let endboss_dies_sound = new Audio('../sounds/witchdies.mp3');
let defeat_sound = new Audio('../sounds/defeat.mp3');
let victory_sound = new Audio('../sounds/victory.mp3');

/** 
* Character Sounds. 
*/
let walking_sound = new Audio('../sounds/walking.mp3');
let drink_sound = new Audio('../sounds/drinkportion.mp3');

/** 
* Endboss Sounds 
*/
let endbossCastsPoison = new Audio('../sounds/necromancercasting_sound_short.mp3');

/**
 * Ingame sounds array used for toggling mute and unmute during iteration.
 */
let ingameSounds = [
    graveyard_sound,
    walking_sound,
    drink_sound,
    fireball_hit_sound,
    fireball_casting_sound,
    collect_portion_sound,
    fireball_failed_to_cast_sound,
    boss_encounter_sound,
    character_hit_sound,
    skeleton_dies_sound,
    endboss_dies_sound,
    endbossCastsPoison,
    defeat_sound,
    victory_sound,
];

/**
 * Main menu sounds array used for toggling mute and unmute during iteration.
 */
let mainMenuSounds = [
    menu_sound,
    start_game_sound,
    start_controls_sound,
    start_about_sound,
    close_sound,
    walking_sound,
    drink_sound,
    fireball_hit_sound,
    fireball_casting_sound,
    fireball_failed_to_cast_sound,
    boss_encounter_sound,
    collect_portion_sound,
    character_hit_sound,
    skeleton_dies_sound,
    endboss_dies_sound,
    endbossCastsPoison,
    defeat_sound,
    victory_sound,
];

/**
 * Action sounds array used for reducing the volume.
 */
let reduceSoundVolume = [
    walking_sound,
    drink_sound,
    fireball_hit_sound,
    fireball_casting_sound,
    collect_portion_sound,
    fireball_failed_to_cast_sound,
    boss_encounter_sound,
    character_hit_sound,
    skeleton_dies_sound,
    endboss_dies_sound,
    endbossCastsPoison,
    defeat_sound,
    victory_sound,
    start_game_sound,
    start_controls_sound,
    start_about_sound,
    close_sound
];

/**
 * The function muteIngameSounds mutes all ingame sounds by setting their muted property to true.
 */
function muteIngameSounds() {
    ingameSounds.forEach(sound => {
        sound.muted = true;
    });
}

/**
 * The function `unmuteIngameSounds` unmutes all ingame sounds by setting their `muted` property to
 * false.
 */
function unmuteIngameSounds() {
    ingameSounds.forEach(sound => {
        sound.muted = false;
    });
}

/**
 * The function `muteMainMenuSounds` mutes all sounds in the `mainMenuSounds` array.
 */
function muteMainMenuSounds() {
    mainMenuSounds.forEach(sound => {
        sound.muted = true;
    });
}

/**
 * The function `unmuteMainMenuSounds` unmutes all sounds in the `mainMenuSounds` array.
 */
function unmuteMainMenuSounds() {
    mainMenuSounds.forEach(sound => {
        sound.muted = false;
    });
}

/**
 * The function `unmuteMainMenuSounds` unmutes all sounds in the `mainMenuSounds` array.
 */
function unmuteMainMenuSounds() {
    mainMenuSounds.forEach(sound => {
        sound.muted = false;
    });
}

/**
 * The function `reduceVolume` reduces the volume of all sound elements in the `reduceSoundVolume`
 * array to 0.3.
 */
function reduceVolume() {
    reduceSoundVolume.forEach(sound => {
        sound.volume = 0.3;
    });
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




// GAAAANZ WICHTIG MUSS IMPLEMENTIERT WERDEN
// let level1;
// function initLevel() {} Funktion implementieren, sobald man auf Start drückt

let level1 = new Level(
    [
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Endboss()
    ],
    [
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 - (719 * 6), 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 - (719 * 5), 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 - (719 * 4), 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 - (719 * 3), 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 - (719 *2), 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 - 719, 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225, 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 + 719, 0),
        new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', -225 + 719 + 720, 0)
    ],
    [
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/graves.png', -225, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/back_trees.png', -225, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/tree.png', -225, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall.png', -225, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Pale/ground.png', -225, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall_mirrored.png', -225, 250),
        
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/graves.png', -225 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/back_trees.png', -225 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall.png', -225 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Pale/ground.png', -225 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall_mirrored.png', -225 + 720, 250),

        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/graves.png', -225 + 720 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/back_trees.png', -225 + 720 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/crypt.png', -225 + 720 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall.png', -225 + 720 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Pale/ground.png', -225 + 720 + 720, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall_mirrored.png', -225 + 720 + 720, 250)
    ]

);
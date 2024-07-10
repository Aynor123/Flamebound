class Level { 
    backgroundObjects;
    skies;
    enemies;
    level_end_x = 1215;

    constructor(enemies, skies, backgroundObjects) {
        this.enemies = enemies;
        this.skies = skies;
        this.backgroundObjects = backgroundObjects;
    }
}
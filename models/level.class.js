class Level { 
    backgroundObjects;
    skies;
    enemies;
    level_end_x = 1215;
    manaPortions;

    constructor(enemies, skies, backgroundObjects, manaPortions) {
        this.enemies = enemies;
        this.skies = skies;
        this.backgroundObjects = backgroundObjects;
        this.manaPortions = manaPortions;
    }
}
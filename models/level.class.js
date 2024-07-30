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



// <-- COLLECT COINS -->
// this.level.coins.forEach( (coin, i) => {
//     if (this.character.isColliding(coin)) {
//         this.character.collectCoin();
//         // Coin löschen
//         this.level.coins.splice(i, 1);
//     }
// });

// collectCoin(coin) {
//     if(!this.level) return;
//     let index = this.level.coins.indexOf(coin);
//     if (index > -1) {
//       this.level.coins.splice(index, 1);
//     }
//     this.collectedCoins++;
//     this.coins.collectedCoins_sound.play();
//     let coinPercentage = (this.collectedCoins / this.maxCoins) * 100;
//     this.statusBarCoin.setPercentage(coinPercentage);
//   }
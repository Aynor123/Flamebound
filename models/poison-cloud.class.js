class PoisonCloud extends MoveableObject {
    IMAGES_POISON = [
        '../assets/Enemies/witch/Witch_2/poison_flying/tile000.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile001.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile002.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile003.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile004.png'
    ];

    IMAGES_POISON_HIT = [
        '../assets/Enemies/witch/Witch_2/poison_hit/tile005.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile006.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile007.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile008.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile009.png'
    ];

    constructor(x, y) {
        super().loadImage('../assets/Enemies/witch/Witch_2/poison_flying/tile000.png');
        this.world = world;
        this.loadImages(this.IMAGES_POISON);
        this.loadImages(this.IMAGES_POISON_HIT);
        this.x = x - 100;
        this.y = y - 25;
        this.height = 375;
        this.width = 375;
        this.speedY = 15;
        this.accelerationX = 2.5;
        this.accelerationY = 2.75;
        this.speedX = 1;
        this.throw();
        this.hitFrame = 0;
        this.isReset = true;
        this.framePoisonCloudHit = 0;
        this.isResetPoisonCloudHit = true;
    }


    throw() {
        let throwPoison = createInterval(allIntervals, () => {
            if (this.speedX <= 20) {
                this.x -= this.speedX;
                this.speedX += this.accelerationX;
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;
            } else {
                this.x -= this.speedX;
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;
            }

        }, 1000 / 30);
        this.animatePoisonCloud();
    }


    animatePoisonCloud() {
        let poisonCloudAnimation = createInterval(allIntervals, () => {
            if (this.frame < this.IMAGES_POISON.length) {
                this.playOneTimeAnimation(this.IMAGES_POISON, this.isReset);
                this.isReset = false;
                this.frame++;
            }
        }, 1000 / 10);
    }


    poisonCloudHitsCharacter(poisonClouds, character, statusBar) {
        if (this.framePoisonCloudHit < this.IMAGES_POISON_HIT.length) {
            this.playOneTimeAnimation(this.IMAGES_POISON_HIT, this.isResetPoisonCloudHit);
            this.isResetPoisonCloudHit = false;
            this.framePoisonCloudHit++;
        }

        if (this.framePoisonCloudHit === this.IMAGES_POISON_HIT.length) {
            this.isResetPoisonCloudHit = true;
            this.framePoisonCloudHit = 0;
            poisonClouds.splice(0, 1);
            character.health -= 34;

            if (character.health < 0) {
                character.health = 0;
            }

            statusBar.setPercentage(character.health);
        }
    }


    poisonCloudHitsGround(poisonClouds) {
        if (this.framePoisonCloudHit < this.IMAGES_POISON_HIT.length) {
            this.playOneTimeAnimation(this.IMAGES_POISON_HIT, this.isResetPoisonCloudHit);
            this.isResetPoisonCloudHit = false;
            this.framePoisonCloudHit++;
        }

        if (this.framePoisonCloudHit === this.IMAGES_POISON_HIT.length) {
            this.isResetPoisonCloudHit = true;
            this.framePoisonCloudHit = 0;
            poisonClouds.splice(0, 1);
        }
    }
}





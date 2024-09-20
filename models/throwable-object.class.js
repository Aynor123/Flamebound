class ThrowableObject extends MoveableObject {
    IMAGES_FLAMES = [
        '../assets/Fireball/tile000.png',
        '../assets/Fireball/tile001.png',
        '../assets/Fireball/tile002.png',
        '../assets/Fireball/tile003.png',
        '../assets/Fireball/tile004.png'
    ];

    IMAGES_FLAMES_HIT = [
        '../assets/Fireball/tile005.png',
        '../assets/Fireball/tile006.png',
        '../assets/Fireball/tile007.png',
        '../assets/Fireball/tile008.png',
        '../assets/Fireball/tile009.png',
        '../assets/Fireball/tile010.png',
        '../assets/Fireball/tile011.png'
    ];

    constructor(x, y, direction) {
        super().loadImage('../assets/Fireball/tile000.png');
        this.loadImages(this.IMAGES_FLAMES);
        this.loadImages(this.IMAGES_FLAMES_HIT);
        this.x = x;
        this.y = y + 100;
        this.height = 175;
        this.width = 175;
        this.otherDirection = direction;
        this.acceleration = 0.5;
        this.speedX = 1;
        this.throw();
        this.hitFrame = 0;
        this.isReset = true;
    }


    /**
     * This function handles the offset and movement of a fireball, so that it looks like the fireball comes directly
     * out of the character's hand and accelerates when moving away from the character.
     * The intervals animate the fireball during the flight depending on flying to the left or right side of the character.
     */
    throw() {
        if (!this.otherDirection) {
            this.x += 75;
            setInterval(() => {
                this.x += this.speedX;
                this.speedX += this.acceleration;
            }, 1000 / 60);
            this.animateFireball();
        } else if (this.otherDirection) {
            this.x += 55;
            setInterval(() => {
                this.x -= this.speedX;
                this.speedX += this.acceleration;
            }, 1000 / 60);
            this.animateFireball();
        }
    }


    /**
     * This function handles the animation of a flying fireball.
     */
    animateFireball() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_FLAMES.length;
            let path = this.IMAGES_FLAMES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 10);
    }
    

/**
 * This function handles the hit animation if a fireball collides with an enemy and removes the fireball object from the 
 * array if the hit animation reaches it's last frame.
 * @param {*} i - Represents the index position of the casted fireball in the array `fireballs`.
 * @param {*} j 
 * @param {*} fireballs - Represents the array containing each casted fireball in the world.
 * @param {*} enemies 
 */
    animateFireballHit(i, j, fireballs, enemies) {
        let interval = setInterval(() => {
            if (this.hitFrame < this.IMAGES_FLAMES_HIT.length) {
                this.speedX = 0;
                this.playOneTimeAnimation(this.IMAGES_FLAMES_HIT, this.isReset);
                this.isReset = false;
                this.hitFrame++;

                if (this.hitFrame === this.IMAGES_FLAMES_HIT.length) {
                    this.isReset = true;
                    this.hitFrame = 0;
                    fireballs.splice(i, 1);
                    clearInterval(interval);
                }
            }
        }, 1000 / 60);
    }
}




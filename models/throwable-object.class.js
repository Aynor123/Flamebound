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

    animateFireball() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_FLAMES.length;
            let path = this.IMAGES_FLAMES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 10);
    }

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

                // enemies.splice(j, 1);
                clearInterval(interval);
            }
        }
        }, 1000 / 60);
        
    }
}




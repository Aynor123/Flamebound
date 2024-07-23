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

    startBottleSplash(enemy) {
        this.splash = true;
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            this.handleCollision(enemy);
            clearInterval(interval);
            this.splash = false;
        }, 10);
    }

    // handleCollision(enemy) {
    //     if (enemy instanceof Endboss) {
    //         this.onHitEndboss(enemy);
    //     } else {
    //         this.onHitEnemy(enemy);
    //     }}

    //     onHitEndboss(endboss) {
    //         endboss.takeDamage(endboss);
    //     }

    //     onHitEnemy(enemy) {
    //         enemy.deadAnimateChicken(enemy);
    //     }

    //     animateHurtsEndboss() {
    //         let index = 0;
    //         const interval = setInterval(() => {
    //             if (index < this.IMAGES_HURT_ENDBOSS.length) {
    //                 this.playAnimation([this.IMAGES_HURT_ENDBOSS[index]]);
    //                 index++;
    //             } else {
    //                 clearInterval(interval);
    //             }
    //         }, 300);
    //     }
}

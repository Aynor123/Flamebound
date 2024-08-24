class MoveableObject extends DrawableObject {
    mirroredImg;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.3;
    jumpFrameCount = 0; // Tracks frames since jump started
    isJumping = false;
    health = 100;
    mana = 100;
    lastHit = 0;
    hasPlayedAnimation = false;
    casting = false;
    imageIndex = 0;
    collisionAllowed = true;
    hitDetection = false;
    drinkingMana = false;
    manaBar = new ManaBar();
    isJumping = false;
    groundLevel = 100; //Initialisiere Groundlevel. Muss mit this Y im drawable Class übereinstimmen!

    jump() {
        this.speedY = 23 //Sets jump height
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playOneTimeAnimation(images, isReset) {
        if (isReset) {
            this.currentImage = 0;  // Reset the current image index if needed.
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (this.currentImage <= images.length) {
            this.currentImage++;
        } else {
            return;
        }
    }

    playOneTimeAnimationRevB(images, intervalID) {
        if (this.imageIndex < images.length) {
            let path = images[this.imageIndex];
            this.img = this.imageCache[path];
            this.imageIndex++;
        } else {
            this.imageIndex = 0;
            clearInterval(intervalID);
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        return this.y < this.groundLevel;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveUp() {
        if (this.isAboveGround()) {
            return;
        }
        this.y -= this.speed;
        this.groundLevel = this.y;
    }

    moveDown() {
        if (this.isAboveGround()) {
            return;
        }
        this.y += this.speed;
        this.groundLevel = this.y;
    }

    moveUpEnemy() {
        this.y -= this.speed;
    }

    moveDownEnemy() {
        this.y += this.speed;
    }
    
    isColliding(moveableObject) {
        return this.x + 120 + this.width - 250 > moveableObject.x + 120 &&
        this.x + 120 < moveableObject.x + 120 + moveableObject.width - 250 &&
        this.y + 145 + this.height - 145 > moveableObject.y + 145 &&
        this.y + 145 < this.y + 145 + this.height - 145;

    }

    isCollidingFireball(moveableObject) {
        return this.x + 80 + this.width - 100 > moveableObject.x + 120 &&
            this.y + 75 + this.height - 145 > moveableObject.y + 145 &&
            this.x - 0 < moveableObject.x + 120 &&
            this.y + 75 < moveableObject.y + 145 + moveableObject.height - 145;
    }

    isCollidingManaPortion(moveableObject) {
        return this.x + 120 + this.width - 250 > moveableObject.x + 40 &&
            this.y + 145 + this.height - 145 > moveableObject.y + 60 &&
            this.x + 120 < moveableObject.x + 40 &&
            this.y + 145 < moveableObject.y + 60 + moveableObject.height - 115;
    }

    isHit() {
        this.health -= 0.2;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.health == 0;

    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms.
        timePassed = timePassed / 1000; // Difference in s.
        return timePassed < 0.8; // true if hit between 5 seconds.
    }

    isCasting() {
        return this.casting == true;
    }

    isCastingFireball() {
        this.mana -= 20;
        if (this.mana < 0) {
            this.mana = 0;
        }
    }

    updateHitDetection() {
        this.hitDetection = true;
        setTimeout(() => {
            this.hitDetection = false;
        }, 1000 / 5);
    }
}
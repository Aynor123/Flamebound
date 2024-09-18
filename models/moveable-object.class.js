class MoveableObject extends DrawableObject {
    mirroredImg;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.3;
    jumpFrameCount = 0;
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
    groundLevel = 100;
    frame = 0;
    isReset = true;
    

    jump() {
        this.speedY = 23;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playOneTimeAnimation(images, isReset) {
        if (isReset) {
            this.currentImage = 0; 
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
        let gravityInterval = createInterval(allIntervals, () => {
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


/**
 * The function `isCollidingManaPortion` checks for collision between a character and a mana portion
 * based on their respective positions and dimensions:
 * 1. Checking if the character's right side is greater than the mana portion's left side.
 * 2. Checking if the character's left side is less than the mana portion's right side.
 * 3. Checking if the character's bottom side is greater than the mana portion's bottom side.
 * 4. Checking if the character's top side is less than the mana portion's bottom side.
 * @param moveableObject - The `moveableObject` in the `isCollidingManaPortion` function represents an
 * object that the character is interacting with in the game. 
 * @returns The function returns a boolean value indicating whether the character is colliding with the mana portion.
 */
    isCollidingManaPortion(moveableObject) {
        return this.x + 120 + this.width - 250 > moveableObject.x + 40 && 
        this.x + 120 < moveableObject.x + 40 + moveableObject.width - 80 && 
        this.y + 145 + this.height - 145 > moveableObject.y + 60 + moveableObject.height - 115 && 
        this.y + 145 < moveableObject.y + 60 + moveableObject.height - 115 ;
    }


    isCollidingPoisonCloud(moveableObject) {
        return this.x + 165 < moveableObject.x + 120 + moveableObject.width -250 &&
        this.x + 165 + this.width - 340 > moveableObject.x + 120 &&
        this.y + 175 < moveableObject.y + 145 + moveableObject.height - 145 &&
        this.y + 175 + this.height - 355 > moveableObject.y + 145;
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
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = timePassed / 1000; 
        return timePassed < 0.8; 
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
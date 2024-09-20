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


    /**
     * This function sets the jump height.
     */
    jump() {
        this.speedY = 23;
    }


    /**
     * This function plays a looped animation with the `images` array.
     * @param {*} images - Represents an array of images.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * This function plays a one time animation and ensures that the animation always starts with the first frame in the `images` array.
     * @param {*} images - Represents an array of images.
     * @param {*} isReset - Represents a flag, to set the current image to zero if isReset = true.
     * @returns 
     */
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


    /**
     * This function is a alternative version of the `playOneTimeAnimation`. It assures that a animation definetly cannot be played
     * more than once (e.g. death animations) by clearing the intervals ID.
     * @param {*} images - Represents an array of images.
     * @param {*} intervalID - Represents the interval's name that is to be cleared after all frames have been played.
     */
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


    /**
     * This function reduces the y-value of the character when jumping from in this case twentythree to zero.
     */
    applyGravity() {
        let gravityInterval = createInterval(allIntervals, () => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * This function returns true if the character is above ground level while jumping.
     * @returns - Represents a boolean.
     */
    isAboveGround() {
        return this.y < this.groundLevel;
    }


    /**
     * This function moves moveable objects to the right of the canvas.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This function moves moveable objects to the left of the canvas.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This function moves the character up on the canvas. If the character is jumping, this function assures that
     * the character is not landing further up on the y-coordinates.
     * @returns - Exists the function if the character is jumping.
     */
    moveUp() {
        if (this.isAboveGround()) {
            return;
        }
        this.y -= this.speed;
        this.groundLevel = this.y;
    }


    /**
     * This function moves the character down on the canvas. If the character is jumping, this function assures that
     * the character is not landing further down on the y-coordinates.
     * @returns - Exists the function if the character is jumping.
     */
    moveDown() {
        if (this.isAboveGround()) {
            return;
        }
        this.y += this.speed;
        this.groundLevel = this.y;
    }


    /**
     * This function handles the movement of the enemies on the y-coordinates.
     * They cannot jump, whcih is the reason they have a seperate function from the character.
     */
    moveUpEnemy() {
        this.y -= this.speed;
    }


    /**
     * This function handles the movement of the enemies on the y-coordinates.
     * They cannot jump, whcih is the reason they have a seperate function from the character.
     */
    moveDownEnemy() {
        this.y += this.speed;
    }


    /**
     * This function checks for collison between the character and enemies.
     * @param {*} moveableObject - Represents an object that the character is colliding with. Here an enemy.
     * @returns - The function returns a boolean value indicating whether the character is colliding with an enemy.
     */
    isColliding(moveableObject) {
        return this.x + 120 + this.width - 250 > moveableObject.x + 120 &&
            this.x + 120 < moveableObject.x + 120 + moveableObject.width - 250 &&
            this.y + 145 + this.height - 145 > moveableObject.y + 145 &&
            this.y + 145 < this.y + 145 + this.height - 145;
    }


    /**
     * This function checks for collison between a fireball and enemies.
     * @param {*} moveableObject - Represents an object that the fireball is colliding with. Here an enemy.
     * @returns - The function returns a boolean value indicating whether the fireball is colliding with an enemy.
     */
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
            this.y + 145 < moveableObject.y + 60 + moveableObject.height - 115;
    }


    /**
     * This function checks for collison between a poison cloud and the character.
     * @param {*} moveableObject - Represents the poison cloud object.
     * @returns The function returns a boolean value indicating whether the character is colliding with a poison cloud.
     */
    isCollidingPoisonCloud(moveableObject) {
        return this.x + 165 < moveableObject.x + 120 + moveableObject.width - 250 &&
            this.x + 165 + this.width - 340 > moveableObject.x + 120 &&
            this.y + 175 < moveableObject.y + 145 + moveableObject.height - 145 &&
            this.y + 175 + this.height - 355 > moveableObject.y + 145;
    }


    /**
     * This function handles the time gap between possible hits and reduces the health.
     */
    isHit() {
        this.health -= 0.2;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function returns a health value of zero.
     * @returns This function returns a boolean depening on whether the health is zero.
     */
    isDead() {
        return this.health == 0;
    }


    /**
     * This function handles the time gap between hits.
     * @returns This returns a boolean depending whether the time passed is smaller than 0.8 seconds.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.8;
    }


    /**
     * This function handles the casting request of the character.
     * @returns This returns a boolean depending whether the character is currently casting a fireball.
     */
    isCasting() {
        return this.casting == true;
    }


    /**
     * This function handles the mana reduction if the character is casting a fireball.
     */
    isCastingFireball() {
        this.mana -= 20;
        if (this.mana < 0) {
            this.mana = 0;
        }
    }


    /**
     * This function handles the timout between possible hits when the cgaracter is colliding with enemies.
     */
    updateHitDetection() {
        this.hitDetection = true;
        setTimeout(() => {
            this.hitDetection = false;
        }, 1000 / 5);
    }
}
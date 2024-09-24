class Character extends MoveableObject {
    mana = 100;
    world;
    speed = 3.0;
    lastActionTime;
    timeTillLongIdle = 5000;
    characterIsLongIdle = false;
    frame = 0;
    idleFrame = 0;
    isReset = true;
    preventsFireballs = false;
    preventsMovement = false;
    isMoving = false;
    lastJumpTime = 0;

    constructor() {
        super().loadImage('../assets/Fire_Wizard/Walk/tile000.png');
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_RUNNING);
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_DEAD);
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_HURT);
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_JUMPING);
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_CHARGE_FIREBALL);
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_DRINK_MANA);
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_IDLE);
        this.loadImages(sprites.CHARACTER_SPRITES.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.startIdleCounter();
    }

    /**
     * This function sets the character's movement within the world and 
     * animates the character with several intervals in different frequencies.
     */
    animate() {
        this.setupCharacterMovementAndAction(60);
        this.characterAnimations(9);
        this.characterShortIdleAnimation(5);
        this.characterLongIdleAnimation(6);
    }

    /**
     * This function handles the character's movement ans animation. It also sets the world camera on the x-coordinates of the character's x-position.
     * @param {*} ms - Represents miliseconds used in the function `animate`.
     */
    setupCharacterMovementAndAction(ms) {
        let characterMovementsControl = createInterval(allIntervals, () => {
            this.characterMovement();
            this.characterAction();
            this.setupWorldCamera();
        }, 1000 / ms);
    }

    /**
     * This function breaks down the specific movements of the character such as walking left, right, up and down.
     */
    characterMovement() {
        this.characterMovesLeft();
        this.characterMovesRight();
        this.characterMovesUp();
        this.characterMovesDown();
    }

    /**
     * This function moves the character to the left and plays a walking sound.
     */
    characterMovesLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            walking_sound.play();
        }
    }

    /**
     * This function moves the character to the right and plays a walking sound.
     */
    characterMovesRight() {
        if (this.world.keyboard.RIGHT && this.x < world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            walking_sound.play();
        }
    }

    /**
     * This function moves the character up and plays a walking sound.
     */
    characterMovesUp() {
        if (this.world.keyboard.UP && this.y > -50) {
            this.moveUp();
            walking_sound.play();
        }
    }

    /**
     * This function moves the character down and plays a walking sound.
     */
    characterMovesDown() {
        if (this.world.keyboard.DOWN && this.y < 120) {
            this.moveDown();
            walking_sound.play();
        }
    }

    /**
     * This function breaks down several character actions such as jumping, casting a fireball and drinking a mana portion.
     */
    characterAction() {
        this.characterJumps();
        this.characterCastsFireball();
        this.characterDrinksManaPortion();
    }

    /**
     * This function detects if the jump button is pressed. And makes sure that the jump is only valid if the character is not already in the air by previos jumps.
     */
    characterJumps() {
        let currentTime = Date.now();
        let jumpCooldown = 1000;

        if (this.world.keyboard.SPACE && !this.isAboveGround() && this.health > 0 && (currentTime - this.lastJumpTime >= jumpCooldown)) {
            this.jump();
            this.isJumping = true;
            this.lastJumpTime = currentTime;
        }
    }

    /**
     * This function detects if the fireball button is pressed and stops any movements of the character.
     */
    characterCastsFireball() {
        if (this.world.keyboard.S) {
            this.casting = true;
            this.speed = 0;
        }
    }

    /**
    * This function detects if the drink mana portion button is pressed and stops any movements of the character and plays a sound.
    */
    characterDrinksManaPortion() {
        if (this.world.keyboard.F) {
            this.drinkingMana = true;
            this.speed = 0;
            drink_sound.play();
        }
    }

    /**
     * Sets the world camera on the x-coordinates of the x-position of the character.
     */
    setupWorldCamera() {
        this.world.camera_x = -this.x + 200;
    }

    /**
     * This function handles the animations within an interval.
     * @param {*} ms - Represents miliseconds used for intervals. 
     */
    characterAnimations(ms) {
        let characterAnimations = createInterval(allIntervals, () => {
            this.handleDeath();
            this.handleCasting();
            this.handleHurt();
            this.handleJumping();
            this.handleDrinkingMana();
            this.handleMovement();

        }, 1000 / ms);
    }

    /**
     * This function creates an intervals for the short idle animation.
     * @param {*} ms - Represents miliseconds for intervals.
     */
    characterShortIdleAnimation(ms) {
        let characterShortIdleAnimation = setInterval(() => {
            let currentTime = Date.now();
            this.handleShortIdleAnimation(currentTime);
        }, 1000 / ms);
    }

    /**
     * This function creates an intervals for the long idle animation.
     * @param {*} ms - Represents miliseconds for intervals.
     */
    characterLongIdleAnimation(ms) {
        let characterLongIdleAnimation = setInterval(() => {
            if (gameStarted) {
                let currentTime = Date.now();
                this.handleLongIdleAnimation(currentTime);
            }
        }, 1000 / ms);
    }

    /**
     * This function assures that every time a key down event happens, the last action time gets set to current time
     * and sets the character is in long idle boolean to false;
     */
    trackIdleCounter() {
        let currentTime = Date.now();
        this.lastActionTime = currentTime;
        this.characterIsLongIdle = false;
    }

    /**
     * This is a helper function that only gets executed one-time when the game starts to set the last action time.
     * This is to avoid that the character gets into long idle animation right from the start.
     */
    startIdleCounter() {
        let startIdleCounter = setInterval(() => {
            if (gameStarted) {
                this.lastActionTime = Date.now();
                clearInterval(startIdleCounter);
            }
        }, 1000 / 60);
    }

    /**
     * This function checks if the character is dead and plays a one time animation. 
     */
    handleDeath() {
        if (this.isDead() && this.frame < sprites.CHARACTER_SPRITES.IMAGES_DEAD.length) {
            this.playOneTimeAnimation(sprites.CHARACTER_SPRITES.IMAGES_DEAD, this.isReset);
            this.isReset = false;
            this.frame++;
            if (this.frame === sprites.CHARACTER_SPRITES.IMAGES_DEAD.length) {
                clearInterval(this.characterAnimations);
                clearInterval(this.characterLongIdleAnimation);
            }
        }
    }

    /**
     * This function checks if the character is casting and plays a one time animation. 
     */
    handleCasting() {
        if (this.isCasting() && !this.preventsFireballs && this.frame < sprites.CHARACTER_SPRITES.IMAGES_CHARGE_FIREBALL.length) {
            this.playOneTimeAnimation(sprites.CHARACTER_SPRITES.IMAGES_CHARGE_FIREBALL, this.isReset);
            this.isReset = false;
            this.frame++;
            if (this.frame === sprites.CHARACTER_SPRITES.IMAGES_CHARGE_FIREBALL.length) {
                this.isReset = true;
                this.frame = 0;
                this.casting = false;
                this.speed = 3.0;
                this.trackIdleCounter();
            }
        }
    }

    /**
     * This function checks if the character is hurt and plays a looped animation.
     */
    handleHurt() {
        if (!this.isMoving && !this.isCasting() && this.isHurt() && !this.isDead()) {
            this.playAnimation(sprites.CHARACTER_SPRITES.IMAGES_HURT);
        }
    }

    /**
     * This function checks if the character is jumping and plays a one time animation. 
     */
    handleJumping() {
        if (this.isAboveGround() && this.isJumping && this.health > 0) {
            this.playOneTimeAnimation(sprites.CHARACTER_SPRITES.IMAGES_JUMPING, this.isReset);
            this.isReset = false;
            this.frame++;
            this.preventsFireballs = true;
            if (this.frame === sprites.CHARACTER_SPRITES.IMAGES_JUMPING.length) {
                this.isReset = true;
                this.frame = 0;
                this.isJumping = false;
                this.preventsFireballs = false;
                this.trackIdleCounter();
            }
        }
    }

    /**
     * This function checks if the character is drinking a mana portion and plays a one time animation. 
     */
    handleDrinkingMana() {
        if (this.drinkingMana && this.frame < sprites.CHARACTER_SPRITES.IMAGES_DRINK_MANA.length) {
            this.playOneTimeAnimation(sprites.CHARACTER_SPRITES.IMAGES_DRINK_MANA, this.isReset);
            this.isReset = false;
            this.frame++;
            this.preventsMovement = true;
            if (this.frame === sprites.CHARACTER_SPRITES.IMAGES_DRINK_MANA.length) {
                this.isReset = true;
                this.frame = 0;
                this.drinkingMana = false;
                this.speed = 3.0;
                this.preventsMovement = false;
                this.trackIdleCounter();
            }
        }
    }

    /**
     * This function checks if the character is moving and plays a looped animation.
     */
    handleMovement() {
        if (!this.preventsMovement && !this.isCasting() && !this.world.gameIsOver && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN)) {
            this.playAnimation(sprites.CHARACTER_SPRITES.IMAGES_RUNNING);
            this.trackIdleCounter();
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }
    }

    /**
     * This function checks if the character is not moving and plays a looped idle animation.
     * @param {*} currentTime - Used to determine when the last action input was made.
     */
    handleShortIdleAnimation(currentTime) {
        if (!this.world.gameIsOver && !gamePaused && currentTime - this.lastActionTime < this.timeTillLongIdle && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.isHurt() && !this.drinkingMana && !this.isCasting() && !this.isJumping) {
            this.playAnimation(sprites.CHARACTER_SPRITES.IMAGES_IDLE);
        }
    }

    /**
     * This function checks if the character is in long idle state and plays a one time animation.
     * @param {*} currentTime - Used to determine when the last action input was made. 
     * If the current time - the last key input (action time) is bigger than 5 seconds, the long idle animation gets played.
     */
    handleLongIdleAnimation(currentTime) {
        if (!this.world.gameIsOver && gameStarted && !gamePaused && currentTime - this.lastActionTime > this.timeTillLongIdle) {
            if (!this.characterIsLongIdle && this.idleFrame < sprites.CHARACTER_SPRITES.IMAGES_LONG_IDLE.length) {
                this.playOneTimeAnimation(sprites.CHARACTER_SPRITES.IMAGES_LONG_IDLE, this.isReset);
                this.isReset = false;
                this.idleFrame++;
                if (this.idleFrame === sprites.CHARACTER_SPRITES.IMAGES_LONG_IDLE.length) {
                    this.isReset = true;
                    this.idleFrame = 0;
                    this.characterIsLongIdle = true;
                }
            }
        }
    }
}


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

    IMAGES_WALKING = [
        '../assets/Fire_Wizard/Walk/tile000.png',
        '../assets/Fire_Wizard/Walk/tile001.png',
        '../assets/Fire_Wizard/Walk/tile002.png',
        '../assets/Fire_Wizard/Walk/tile003.png',
        '../assets/Fire_Wizard/Walk/tile004.png',
        '../assets/Fire_Wizard/Walk/tile005.png'
    ];

    IMAGES_RUNNING = [
        '../assets/Fire_Wizard/Run/tile000.png',
        '../assets/Fire_Wizard/Run/tile001.png',
        '../assets/Fire_Wizard/Run/tile002.png',
        '../assets/Fire_Wizard/Run/tile003.png',
        '../assets/Fire_Wizard/Run/tile004.png',
        '../assets/Fire_Wizard/Run/tile005.png',
        '../assets/Fire_Wizard/Run/tile006.png',
        '../assets/Fire_Wizard/Run/tile007.png'
    ];

    IMAGES_JUMPING = [
        '../assets/Fire_Wizard/Jump/tile003.png',
        '../assets/Fire_Wizard/Jump/tile004.png',
        '../assets/Fire_Wizard/Jump/tile005.png',
        '../assets/Fire_Wizard/Jump/tile006.png',
        '../assets/Fire_Wizard/Jump/tile007.png'
    ];

    IMAGES_DEAD = [
        '../assets/Fire_Wizard/Dead/tile000.png',
        '../assets/Fire_Wizard/Dead/tile001.png',
        '../assets/Fire_Wizard/Dead/tile002.png',
        '../assets/Fire_Wizard/Dead/tile003.png',
        '../assets/Fire_Wizard/Dead/tile004.png',
        '../assets/Fire_Wizard/Dead/tile005.png'
    ];

    IMAGES_HURT = [
        '../assets/Fire_Wizard/Hurt/tile000.png',
        '../assets/Fire_Wizard/Hurt/tile001.png',
        '../assets/Fire_Wizard/Hurt/tile002.png'
    ];

    IMAGES_CHARGE_FIREBALL = [
        '../assets/Fire_Wizard/Charge_Fireball/tile000.png',
        '../assets/Fire_Wizard/Charge_Fireball/tile001.png',
        '../assets/Fire_Wizard/Charge_Fireball/tile002.png',
        '../assets/Fire_Wizard/Charge_Fireball/tile003.png',
        '../assets/Fire_Wizard/Charge_Fireball/tile004.png',
        '../assets/Fire_Wizard/Charge_Fireball/tile005.png',
        '../assets/Fire_Wizard/Charge_Fireball/tile006.png',
        '../assets/Fire_Wizard/Charge_Fireball/tile007.png'
    ];

    IMAGES_DRINK_MANA = [
        '../assets/Fire_Wizard/Ekixir/tile000.png',
        '../assets/Fire_Wizard/Ekixir/tile001.png',
        '../assets/Fire_Wizard/Ekixir/tile002.png',
        '../assets/Fire_Wizard/Ekixir/tile003.png',
        '../assets/Fire_Wizard/Ekixir/tile004.png',
        '../assets/Fire_Wizard/Ekixir/tile005.png',
        '../assets/Fire_Wizard/Ekixir/tile006.png',
        '../assets/Fire_Wizard/Ekixir/tile007.png'
    ];

    IMAGES_IDLE = [
        '../assets/Fire_Wizard/Idle/tile000.png',
        '../assets/Fire_Wizard/Idle/tile001.png',
        '../assets/Fire_Wizard/Idle/tile002.png',
        '../assets/Fire_Wizard/Idle/tile003.png',
        '../assets/Fire_Wizard/Idle/tile004.png',
        '../assets/Fire_Wizard/Idle/tile005.png'
    ];

    IMAGES_LONG_IDLE = [
        '../assets/Fire_Wizard/Long_Idle/tile000.png',
        '../assets/Fire_Wizard/Long_Idle/tile001.png',
        '../assets/Fire_Wizard/Long_Idle/tile002.png',
        '../assets/Fire_Wizard/Long_Idle/tile003.png'
    ];

    constructor() {
        super().loadImage('../assets/Fire_Wizard/Walk/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_RUNNING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_CHARGE_FIREBALL);
        this.loadImages(this.IMAGES_DRINK_MANA);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.startIdleCounter();
    }


    /**
     * This function sets the character's movement within the world and 
     * animates the character with several intervals in different frequencies.
     */
    animate() {
        let characterControlsInterval = createInterval(allIntervals, () => {
            walking_sound.pause();
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                walking_sound.play();
            }
            if (this.world.keyboard.RIGHT && this.x < world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                walking_sound.play();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.isJumping = true;
            }
            if (this.world.keyboard.S) {
                this.casting = true;
                this.speed = 0;
            }
            if (this.world.keyboard.F) {
                this.drinkingMana = true;
                this.speed = 0;
                drink_sound.play();
            }
            if (this.world.keyboard.UP && this.y > -50) {
                this.moveUp();
                walking_sound.play();
            }
            if (this.world.keyboard.DOWN && this.y < 120) {
                this.moveDown();
                walking_sound.play();
            }
            this.world.camera_x = -this.x + 200;
        }, 1000 / 60);

        let characterAnimationsInterval = createInterval(allIntervals, () => {
            let currentTime = Date.now();

            if (this.handleDeath()) {
                return;
            } else if (this.handleCasting()) {
                return;
            } else if (this.handleHurt()) {
                return;
            } else if (this.handleJumping()) {
                return;
            } else if (this.handleDrinkingMana()) {
                return;
            } else {
                this.handleMovement();
            }
        }, 1000 / 9);

        let characterShortIdleAnimation = setInterval(() => {
            let currentTime = Date.now();
            this.handleShortIdleAnimation(currentTime);
        }, 1000 / 5);

        let characterLongIdleAnimation = setInterval(() => {
            if (gameStarted) {
                let currentTime = Date.now();
                this.handleLongIdleAnimation(currentTime);
            }
        }, 1000 / 6);
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
        if (this.isDead() && this.frame < this.IMAGES_DEAD.length) {
            this.playOneTimeAnimation(this.IMAGES_DEAD, this.isReset);
            this.isReset = false;
            this.frame++;
            if (this.frame === this.IMAGES_DEAD.length) {
                clearInterval(this.characterAnimationsInterval);
                clearInterval(this.characterLongIdleAnimation);
            }
        }
    }


    /**
     * This function checks if the character is casting and plays a one time animation. 
     */
    handleCasting() {
        if (this.isCasting() && this.frame < this.IMAGES_CHARGE_FIREBALL.length) {
            this.playOneTimeAnimation(this.IMAGES_CHARGE_FIREBALL, this.isReset);
            this.isReset = false;
            this.frame++;
            if (this.frame === this.IMAGES_CHARGE_FIREBALL.length) {
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
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    /**
     * This function checks if the character is jumping and plays a one time animation. 
     */
    handleJumping() {
        if (this.isAboveGround() && this.isJumping) {
            this.playOneTimeAnimation(this.IMAGES_JUMPING, this.isReset);
            this.isReset = false;
            this.frame++;
            if (this.frame === this.IMAGES_JUMPING.length) {
                this.isReset = true;
                this.frame = 0;
                this.isJumping = false;
                this.trackIdleCounter();
            }
        }
    }


    /**
     * This function checks if the character is drinking a mana portion and plays a one time animation. 
     */
    handleDrinkingMana() {
        if (this.drinkingMana && this.frame < this.IMAGES_DRINK_MANA.length) {
            this.playOneTimeAnimation(this.IMAGES_DRINK_MANA, this.isReset);
            this.isReset = false;
            this.frame++;
            if (this.frame === this.IMAGES_DRINK_MANA.length) {
                this.isReset = true;
                this.frame = 0;
                this.drinkingMana = false;
                this.speed = 3.0;
                this.trackIdleCounter();
            }
        }
    }


    /**
     * This function checks if the character is moving and plays a looped animation.
     */
    handleMovement() {
        if (!this.world.gameIsOver && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN)) {
            this.playAnimation(this.IMAGES_RUNNING);
            this.trackIdleCounter();
        }
    }


    /**
     * This function checks if the character is not moving and plays a looped idle animation.
     * @param {*} currentTime - Used to determine when the last action input was made.
     */
    handleShortIdleAnimation(currentTime) {
        if (!this.world.gameIsOver && !gamePaused && currentTime - this.lastActionTime < this.timeTillLongIdle && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.isHurt() && !this.drinkingMana && !this.isCasting() && !this.isJumping) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * This function checks if the character is in long idle state and plays a one time animation.
     * @param {*} currentTime - Used to determine when the last action input was made. 
     * If the current time - the last key input (action time) is bigger than 5 seconds, the long idle animation gets played.
     */
    handleLongIdleAnimation(currentTime) {
        if (!this.world.gameIsOver && gameStarted && !gamePaused && currentTime - this.lastActionTime > this.timeTillLongIdle) {
            if (!this.characterIsLongIdle && this.idleFrame < this.IMAGES_LONG_IDLE.length) {
                this.playOneTimeAnimation(this.IMAGES_LONG_IDLE, this.isReset);
                this.isReset = false;
                this.idleFrame++;
                if (this.idleFrame === this.IMAGES_LONG_IDLE.length) {
                    this.isReset = true;
                    this.idleFrame = 0;
                    this.characterIsLongIdle = true;
                }
            }
        }
    }

}


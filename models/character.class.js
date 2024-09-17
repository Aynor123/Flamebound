class Character extends MoveableObject {
    mana = 100;
    world;
    speed = 1.5;
    walking_sound = new Audio('../sounds/walking.mp3');
    drink_sound = new Audio('../sounds/drinkportion.mp3');
    lastActionTime;
    timeTillLongIdle = 5000;
    characterIsLongIdle = false;

    IMAGES_WALKING = [
        '../assets/Fire_Wizard/Walk/tile000.png',
        '../assets/Fire_Wizard/Walk/tile001.png',
        '../assets/Fire_Wizard/Walk/tile002.png',
        '../assets/Fire_Wizard/Walk/tile003.png',
        '../assets/Fire_Wizard/Walk/tile004.png',
        '../assets/Fire_Wizard/Walk/tile005.png'
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


    animate() {
        let frame = 0;
        let idleFrame = 0;
        let isReset = true;

        let characterControlsInterval = createInterval(allIntervals, () => {
            this.walking_sound.pause();
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }


            if (this.world.keyboard.RIGHT && this.x < world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
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
                this.drink_sound.play();
            }

            if (this.world.keyboard.UP && this.y > -50) {
                this.moveUp();
                this.walking_sound.play();
            }

            if (this.world.keyboard.DOWN && this.y < 120) {
                this.moveDown();
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 200;
        }, 1000 / 60);



        let characterAnimationsInterval = createInterval(allIntervals, () => {
            if (this.isDead() && frame < this.IMAGES_DEAD.length) {
                this.playOneTimeAnimation(this.IMAGES_DEAD, isReset);
                isReset = false;
                frame++;
                if (frame === this.IMAGES_DEAD.length) {
                    clearInterval(characterAnimationsInterval);
                    clearInterval(characterLongIdleAnimation);
                }
            } else if (this.isCasting() && frame < this.IMAGES_CHARGE_FIREBALL.length) {
                this.playOneTimeAnimation(this.IMAGES_CHARGE_FIREBALL, isReset);
                isReset = false;
                frame++;
                if (frame === this.IMAGES_CHARGE_FIREBALL.length) {
                    isReset = true;
                    frame = 0;
                    this.casting = false;
                    this.speed = 1.5;
                    this.trackIdleCounter();
                }
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround() && this.isJumping) {
                this.playOneTimeAnimation(this.IMAGES_JUMPING, isReset);
                isReset = false;
                frame++;
                if (frame === this.IMAGES_JUMPING.length) {
                    isReset = true;
                    frame = 0;
                    this.isJumping = false;
                    this.trackIdleCounter();
                }
            } else if (this.drinkingMana && frame < this.IMAGES_DRINK_MANA.length) {
                this.playOneTimeAnimation(this.IMAGES_DRINK_MANA, isReset);
                isReset = false;
                frame++;
                if (frame === this.IMAGES_DRINK_MANA.length) {
                    isReset = true;
                    frame = 0;
                    this.drinkingMana = false;
                    this.speed = 1.5;
                    this.trackIdleCounter();
                }
            }
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.trackIdleCounter();
                }
            }
        }, 1000 / 9);


        let characterShortIdleAnimation = setInterval(() => {
            let currentTime = Date.now();

            if (!gamePaused && currentTime - this.lastActionTime < this.timeTillLongIdle && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.isHurt() && !this.drinkingMana && !this.isCasting() && !this.isJumping) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 5);


        let characterLongIdleAnimation = setInterval(() => {
            if (gameStarted) {
                let currentTime = Date.now();
                if (gameStarted && !gamePaused && currentTime - this.lastActionTime > this.timeTillLongIdle) {
                    if (!this.characterIsLongIdle && idleFrame < this.IMAGES_LONG_IDLE.length) {
                        this.playOneTimeAnimation(this.IMAGES_LONG_IDLE, isReset);
                        isReset = false;
                        idleFrame++;
                        if (idleFrame === this.IMAGES_LONG_IDLE.length) {
                            isReset = true;
                            idleFrame = 0;
                            this.characterIsLongIdle = true;
                        }
                    }
                }
            }


        }, 1000 / 6);
    }


    trackIdleCounter() {
        let currentTime = Date.now();
        this.lastActionTime = currentTime;
        this.characterIsLongIdle = false;
    }


    startIdleCounter() {
        let startIdleCounter = setInterval(() => {
            if (gameStarted) {
                this.lastActionTime = Date.now();
                clearInterval(startIdleCounter);
            }
        }, 1000 / 60);
    }
}


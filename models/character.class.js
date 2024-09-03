let characterIntervals = [];

class Character extends MoveableObject {
    mana = 100;

    IMAGES_WALKING = [
        '../assets/Fire_Wizard/Walk/tile000.png',
        '../assets/Fire_Wizard/Walk/tile001.png',
        '../assets/Fire_Wizard/Walk/tile002.png',
        '../assets/Fire_Wizard/Walk/tile003.png',
        '../assets/Fire_Wizard/Walk/tile004.png',
        '../assets/Fire_Wizard/Walk/tile005.png'
    ];

    IMAGES_JUMPING = [
        // '../assets/Fire_Wizard/Jump/tile000.png',
        // '../assets/Fire_Wizard/Jump/tile001.png',
        // '../assets/Fire_Wizard/Jump/tile002.png',
        '../assets/Fire_Wizard/Jump/tile003.png',
        '../assets/Fire_Wizard/Jump/tile004.png',
        '../assets/Fire_Wizard/Jump/tile005.png',
        '../assets/Fire_Wizard/Jump/tile006.png',
        '../assets/Fire_Wizard/Jump/tile007.png'
        // '../assets/Fire_Wizard/Jump/tile008.png'
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

    world;
    speed = 1.5;
    walking_sound = new Audio('../sounds/walking.mp3');
    drink_sound = new Audio('../sounds/drinkportion.mp3');



    constructor() {
        super().loadImage('../assets/Fire_Wizard/Walk/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_CHARGE_FIREBALL);
        this.loadImages(this.IMAGES_DRINK_MANA);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let characterControlsInterval = createInterval(characterIntervals,() => {
            this.walking_sound.pause();
            if (this.world.keyboard.LEFT && this.x > 0) { // Forbids to walk further left at xxx pixel.
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
       
            if (this.world.keyboard.UP && this.y > -50) { // Forbids to walk further up.
                this.moveUp();
                this.walking_sound.play();
            }

            if (this.world.keyboard.DOWN && this.y < 120) { 
                this.moveDown();
                this.walking_sound.play();
            }


            this.world.camera_x = -this.x + 200; //Sets Character more to the right.
        }, 1000 / 60);

        let frame = 0;
        let isReset = true;
        let characterAnimationsInterval = createInterval(characterIntervals,() => {
            if (this.isDead() && frame < this.IMAGES_DEAD.length) {
                this.playOneTimeAnimation(this.IMAGES_DEAD, isReset);
                isReset = false;
                frame++;
                if (frame === this.IMAGES_DEAD.length) {
                    clearInterval(characterAnimationsInterval);
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
                }
            }
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 9);

        // characterIntervals.push(characterControlsInterval);
        // characterIntervals.push(characterAnimationsInterval);
    }

}


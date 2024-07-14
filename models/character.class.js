class Character extends MoveableObject {

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
        '../assets/Fire_Wizard/Jump/tile007.png',
        '../assets/Fire_Wizard/Jump/tile008.png'
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

    world;
    speed = 1.5;
    walking_sound = new Audio('../sounds/walking.mp3');
    y = 100;


    constructor() {
        super().loadImage('../assets/Fire_Wizard/Walk/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
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
            }


            this.world.camera_x = -this.x + 200; //Sets Character more to the right.
        }, 1000 / 60);


        // let i = 0;
        // setInterval(() => {
        //     if (i < 6 && this.isDead()) {
        //         this.playAnimation(this.IMAGES_DEAD);
        //     } else {
        //         return;
        //     }
        //     i++;
        // }, 1000 / 9);

        // setInterval(() => {
        //    if (this.isHurt()) {
        //         this.playAnimation(this.IMAGES_HURT);
        //     } else if (this.isAboveGround()) {
        //         this.playAnimation(this.IMAGES_JUMPING);
        //     } else {
        //         if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //             this.playAnimation(this.IMAGES_WALKING);
        //         }
        //     }
        // }, 1000 / 9);

        let death = 0;
        setInterval(() => {
            if (this.isDead() && death < this.IMAGES_DEAD.length) {
                this.playAnimation(this.IMAGES_DEAD);
                death++;
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 9);
    }

}


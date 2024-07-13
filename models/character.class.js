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

    world;
    speed = 1.5;
    walking_sound = new Audio('../sounds/walking.mp3');
    y = 100;


    constructor() {
        super().loadImage('../assets/Fire_Wizard/Walk/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
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


        setInterval(() => {

            // if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            //     this.isJumping = true; // Set jumping state when SPACE is pressed
            //     this.playJumpAnimation(this.IMAGES_JUMPING);
            //     // Only set speedY after the first three frames
            //     if (this.currentImage > 3) {
            //         this.speedY = 17; // Sets jump height
            //     } else {
            //         this.speedY = 0; // Keep speedY zero for the first three frames
            //     }
            // } else {
            //     if (!this.isAboveGround && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT))
            //         this.playAnimation(this.IMAGES_WALKING);
            //     this.isJumping = false; // Ensure jumping state is reset when not jumping
            // }



            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    // let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; % steht für Modulu, der mathematische Rest ( 7tes Bild durch 6 ist 1 Rest 1) dh. i = 0, 1, 2, 3, 4, 5, 6, 0
                    // let path = this.IMAGES_WALKING[i];
                    // this.img = this.imageCache[path];
                    // this.currentImage++;
                }
            }
        }, 1000 / 9);

    }

}


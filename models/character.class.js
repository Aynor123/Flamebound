class Character extends MoveableObject {

    IMAGES_WALKING = [
        '../assets/Fire_Wizard/Walk/tile000.png',
        '../assets/Fire_Wizard/Walk/tile001.png',
        '../assets/Fire_Wizard/Walk/tile002.png',
        '../assets/Fire_Wizard/Walk/tile003.png',
        '../assets/Fire_Wizard/Walk/tile004.png',
        '../assets/Fire_Wizard/Walk/tile005.png'
    ];

    world;
    speed = 1.5;
   
    

    constructor() {
        super().loadImage('../assets/Fire_Wizard/Walk/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) { // Forbids to walk further left at xxx pixel.
                this.x -= this.speed;
                this.otherDirection = true;
            }
            // this.world.camera_x = this.x; FALSCH?!
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            this.world.camera_x = -this.x + 200; //Sets Character more to the right.
        }, 1000 / 60);
        

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; % steht für Modulu, der mathematische Rest ( 7tes Bild durch 6 ist 1 Rest 1) dh. i = 0, 1, 2, 3, 4, 5, 6, 0
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 1000 / 9);
    }

}
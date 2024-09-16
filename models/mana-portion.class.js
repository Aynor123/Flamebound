class ManaPortion extends MoveableObject {
    width = 50;
    height = 70;

    IMAGES_PORTION = [
        '../assets/Potions/BLUE/Sprites/my-image.png',
        '../assets/Potions/BLUE/Sprites/my-image (1).png',
        '../assets/Potions/BLUE/Sprites/my-image (2).png',
        '../assets/Potions/BLUE/Sprites/my-image (3).png',
        '../assets/Potions/BLUE/Sprites/my-image (4).png',
        '../assets/Potions/BLUE/Sprites/my-image (5).png',
        '../assets/Potions/BLUE/Sprites/my-image (6).png',
        '../assets/Potions/BLUE/Sprites/my-image (7).png'
    ];

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_PORTION);
        this.x = x;
        this.y = y;
        this.animate();
    }


    animate() {
       let animateFlasks = createInterval(allIntervals, () => {
            this.playAnimation(this.IMAGES_PORTION);
        }, 1000 / 10);
        
    }
}
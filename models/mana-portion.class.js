class ManaPortion extends MoveableObject {
    width = 20;
    height = 40;

    IMAGES_PORTION = [
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0000.png',
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0001.png',
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0002.png',
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0003.png',
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0004.png',
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0005.png',
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0006.png',
        '../assets/Potions/BLUE/Sprites/Big Vial - BLUE - 0007.png'
    ];

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_PORTION);
        this.x = x;
        this.y = y;
        this.animate();
    }
    animate() {
       setInterval(() => {
            this.playAnimation(this.IMAGES_PORTION);
        }, 1000 / 10);
        
    }
}
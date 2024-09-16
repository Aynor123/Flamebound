class PortionBar extends DrawableObject {
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

    constructor() {
        super().loadImage('../assets/Potions/BLUE/Sprites/my-image.png');
        this.loadImages(this.IMAGES_PORTION);
        this.x = 40;
        this.y = 70;
        this.width = 30;
        this.height = 50;
    }
}
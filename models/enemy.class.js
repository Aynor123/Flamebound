class Enemy extends MoveableObject {

    IMAGES_WALKING = [
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile000.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile001.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile002.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile003.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile004.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile005.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile006.png'
    ];

    constructor() {
        super().loadImage('../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i =  this.currentImage % this.IMAGES_WALKING.length; 
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 7);
    }

    
}
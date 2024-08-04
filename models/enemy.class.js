class Enemy extends MoveableObject {

    speed = 0.1;
    health = 20;
    isDead = false;

    IMAGES_WALKING = [
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile000.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile001.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile002.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile003.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile004.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile005.png',
        '../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile006.png'
    ];

    IMAGES_DEAD = [
        '../assets/Enemies/Skeleton_Warrior/Dead/tile000.png',
        '../assets/Enemies/Skeleton_Warrior/Dead/tile001.png',
        '../assets/Enemies/Skeleton_Warrior/Dead/tile002.png',
        '../assets/Enemies/Skeleton_Warrior/Dead/tile003.png'
    ];

    constructor() {
        super().loadImage('../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 420 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.7;
        this.animate();
        // this.health;
        // this.collisionAllowed = true;
    }

    animate() {
        let moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        let walkingInterval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 9);

        let enemyDiesInterval = setInterval(() => {
            if (this.health <= 0) {
                clearInterval(moveLeftInterval);
                clearInterval(walkingInterval);
                this.playOneTimeAnimationRevB(this.IMAGES_DEAD, enemyDiesInterval);
                this.collisionAllowed = false;
            }
        }, 1000 / 10);
    }
}
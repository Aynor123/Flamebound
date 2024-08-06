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

    IMAGES_ATTACK = [
        '../assets/Enemies/Skeleton_Warrior/Attack_1_Mirrored/tile000.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_1_Mirrored/tile001.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_1_Mirrored/tile002.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_1_Mirrored/tile003.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_1_Mirrored/tile004.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_2_Mirrored/tile000.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_2_Mirrored/tile001.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_2_Mirrored/tile002.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_2_Mirrored/tile003.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_2_Mirrored/tile004.png',
        '../assets/Enemies/Skeleton_Warrior/Attack_2_Mirrored/tile005.png'
    ];

    constructor() {
        super().loadImage('../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 420 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.7;
        this.animate();
    }

    animate() {
        // let moveLeftInterval = setInterval(() => {
        //     this.moveLeft();
        // }, 1000 / 60);

        let walkingInterval = setInterval(() => {
            if (!this.world.character.isColliding(this)) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.character.isColliding(this)) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 1000 / 9);

        let enemyDiesInterval = setInterval(() => {
            if (this.health <= 0) {
                clearInterval(moveTowardsCharacter);
                clearInterval(walkingInterval);
                this.playOneTimeAnimationRevB(this.IMAGES_DEAD, enemyDiesInterval);
                this.collisionAllowed = false;
            }
        }, 1000 / 10);

        let moveTowardsCharacter = setInterval(() => {
            if (this.world.character.x < this.x) {
                this.otherDirection = false;
                this.moveLeft();
            } else {
                this.otherDirection = true;
                this.moveRight();
            }
            if (this.world.character.y > this.y) {
                this.moveDownEnemy();
            } else {
                this.moveUpEnemy();
            }
        }, 1000 / 30);

        // let enemyAttack = setInterval(() => {
        //     if (this.world.character.isColliding(this)) {
        //         clearInterval(walkingInterval);
        //         this.playAnimation(this.IMAGES_ATTACK);
        //     }
        // }, 1000 / 10);
    }

    moveUpEnemy() {
        this.y -= this.speed;
    }

    moveDownEnemy() {
        this.y += this.speed;
    }
}
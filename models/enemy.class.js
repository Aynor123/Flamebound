class Enemy extends MoveableObject {
    speed;
    health = 20;
    tolerance = 3;
    sightrangeOfEnemy = 350;
    isDead = false;
    isMoving = true;

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

    IMAGES_DEAD_ON_GROUND = [
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

    IMAGES_IDLE = [
        '../assets/Enemies/Skeleton_Warrior/Idle_Mirrored/tile000.png',
        '../assets/Enemies/Skeleton_Warrior/Idle_Mirrored/tile001.png',
        '../assets/Enemies/Skeleton_Warrior/Idle_Mirrored/tile002.png',
        '../assets/Enemies/Skeleton_Warrior/Idle_Mirrored/tile003.png',
        '../assets/Enemies/Skeleton_Warrior/Idle_Mirrored/tile004.png',
        '../assets/Enemies/Skeleton_Warrior/Idle_Mirrored/tile005.png',
        '../assets/Enemies/Skeleton_Warrior/Idle_Mirrored/tile006.png'
    ];

    constructor() {
        super().loadImage('../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD_ON_GROUND);
        this.x = 420 + Math.random() * 700;
        this.y = -50 + Math.random() * 200;
        this.speed = 3.5 + Math.random() * 1.0;
        // this.isDead;
        this.health;
        this.animate();
    }

    /**
     * This function handles several intervals and movements of the enemies in different frequencies.
     */
    animate() {
        this.enemyIsDeadAnimation(10);
        this.enemyMovementAnimation(10);
        this.enemyDiesAnimation(10);
    }

    /**
     * This interval handles the enemy's death animation.
     * @param {*} ms - Represents miliseconds.
     */
    enemyIsDeadAnimation(ms) {
        let enemyIsDead = createInterval(allIntervals, () => {
            if (this.isDead) {
                this.playOneTimeAnimationRevB(this.IMAGES_DEAD_ON_GROUND, enemyIsDead);
            }
        }, 1000 / ms);
    }

    /**
     * This function handles all action animations as soon as the character gets in sight of an enemy.
     * @param {*} ms - Represents miliseconds.
     */
    enemyMovementAnimation(ms) {
        let moveTowardsCharacter = setInterval(() => {
            if (world && world.character !== null && !this.isDead && !gamePaused == true && this.isMoving) {
                if (this.x - world.character.x < this.sightrangeOfEnemy) {
                    this.playWalkingAnimation();
                    this.playAttackAnimation();
                    this.handleHorizontalMovement();
                    this.handleVerticalMovement();
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 1000 / ms);
    }

    /**
     * This function assures that an enemy loops the walking animation when not colliding/attacking the character.
     */
    playWalkingAnimation() {
        if (!world.character.isColliding(this)) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * This function plays the attack animation as soon as the enemy is colliding with the enemy.
     */
    playAttackAnimation() {
        if (world.character.isColliding(this)) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.speed = 0;
        }
    }

    /**
     * This function handles the enemy's movement on the x-coordinates.
     */
    handleHorizontalMovement() {
        if (world.character.x < this.x) {
            this.otherDirection = false;
            this.moveLeft();
            this.speed = 5.5 + Math.random() * 1.0;
        } else {
            this.otherDirection = true;
            this.moveRight();
            this.speed = 5.5 + Math.random() * 1.0;
        }
    }

    /**
     * This function handles the enemy's movement on the y-coordinates.
     */
    handleVerticalMovement() {
        if (world.character.y > this.y + this.tolerance) {
            this.moveDownEnemy();
        } 
        if (world.character.y < this.y - this.tolerance) {
            this.moveUpEnemy();
        }
    }

    /**
     * This interval handles the enemy's death animation after the game has been previously paused.
     * This assures that an enemy animation will not be played twice once the enemy is dead.
     */
    enemyDiesAnimation(ms) {
        let enemyDiesIntervalAfterPaused = setInterval(() => {
            if (this.health <= 0 && !this.isDead && !gamePaused == true) {
                this.isMoving = false;
                this.playOneTimeAnimationRevB(this.IMAGES_DEAD, enemyDiesIntervalAfterPaused);
                this.enemySetIsDead();
                this.collisionAllowed = false;
            }
        }, 1000 / ms);
    }

    /**
     * This function sets a variable to `true` if the enemy is dead.
     * This variable is used to declare that an enemy has died.
     */
    enemySetIsDead() {
        setTimeout(() => {
            this.isDead = true;
        }, 1000);
    }
}
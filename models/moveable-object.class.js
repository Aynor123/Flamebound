class MoveableObject extends DrawableObject {
    mirroredImg;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.3;
    jumpFrameCount = 0; // Tracks frames since jump started
    isJumping = false;
    health = 100;
    mana = 100;
    lastHit = 0;
    hasPlayedAnimation = false;
    casting = false;

    playJumpAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        // Reset jumpFrameCount if starting a new jump animation
        if (this.isJumping && this.currentImage <= 3) {
            this.jumpFrameCount = this.currentImage;
        } else {
            this.isJumping = false; // Reset jumping state after first three frames
        }
    }

    jump() {
        this.speedY = 20; //Sets jump height
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playOneTimeAnimation(images, isReset) {
        if (isReset) {
            this.currentImage = 0;  // Reset the current image index if needed.
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        // isReset = false;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { // y = 100 equals ground level for enemies, character and boss. Q.v "is>AboveGround".
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60); // Sets animation speed.
    }

    isAboveGround() {
        return this.y < 100;
    }

    moveRight() {
        this.x += this.speed;
        this.walking_sound.play();
    }

    moveLeft() {
        this.x -= this.speed;
    }

    attack() {

    }

    //character.isColliding(enemy);
    isColliding(moveableObject) {
        return this.x + 120 + this.width - 250 > moveableObject.x + 120 &&
            this.y + 145 + this.height - 145 > moveableObject.y + 145 &&
            this.x + 120 < moveableObject.x + 120 &&
            this.y + 145 < moveableObject.y + 145 + moveableObject.height - 145;
    }

    //     isColliding (obj) {
    //         return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
    //                 (this.Y + this.offsetY + this.height) >= obj.Y &&
    //                 (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
    //                 obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    // }

    isHit() {
        this.health -= 1;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.health == 0;

    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms.
        timePassed = timePassed / 1000; // Difference in s.
        return timePassed < 0.8; // true if hit between 5 seconds.
    }

    isCasting() {
        return this.casting == true;
    }

    isCastingFireball() {
        this.mana -= 20;
        if (this.mana < 0) {
            this.mana = 0;
        }
    }
}
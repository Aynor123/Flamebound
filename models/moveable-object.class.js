class MoveableObject {
    x = 0;
    y = 100;
    img;
    mirroredImg;
    height = 300;
    width = 300;
    imageCache = {}; //JSON
    currentImage = 0;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.3;
    jumpFrameCount = 0; // Tracks frames since jump started
    isJumping = false;

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

    loadImage(path) {
        this.img = new Image(); // this.img= document.getElementbyId('image')
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy) { // instanceof will show frames only fpr Character and Enemy

            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 145, this.width - 250, this.height - 145);
            ctx.stroke();
        }
    }
}
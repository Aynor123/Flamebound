class ThrowableObject extends MoveableObject {
    speedX = 1;

    constructor(x, y) {
        super().loadImage('../assets/Fireball/tile000.png');
        this.x = x;
        this.y = y;   
        this.throw(x, y);     
    }

    throw(x, y) {
        this.x = x + 75;
        this.y = y + 100;
        this.speedX;
        this.height = 175;
        this.width = 175;
        this.acceleration = 0.5;
        setInterval(() => {
            this.x += this.speedX;
            this.speedX += this.acceleration;
        }, 1000/60);
    }

    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) { // y = 100 equals ground level for enemies, character and boss. Q.v "is>AboveGround".
    //             this.y -= this.speedY;
    //             this.speedY -= this.acceleration;
    //         }
    //     }, 1000 / 60); // Sets animation speed.
    // }

}
class ThrowableObject extends MoveableObject {
        
    constructor(x, y, direction) {
        super().loadImage('../assets/Fireball/tile000.png');
        this.x = x;
        this.y = y + 100;   
        this.height = 175;
        this.width = 175;
        this.otherDirection = direction;
        this.acceleration = 0.5;
        this.speedX = 1;
        this.throw();     
    }

    throw() {
        if (!this.otherDirection) {
            this.x += 75;
            setInterval(() => {
                this.x += this.speedX;
                this.speedX += this.acceleration;
            }, 1000/60);
        } else if (this.otherDirection) {
            this.x += 55;
            setInterval(() => {
                this.x -= this.speedX;
                this.speedX += this.acceleration;
            }, 1000/60);
        }
    }
}
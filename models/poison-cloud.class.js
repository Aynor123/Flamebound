class PoisonCloud extends MoveableObject {

    IMAGES_POISON = [
        '../assets/Enemies/witch/Witch_2/poison_flying/tile000.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile001.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile002.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile003.png',
        '../assets/Enemies/witch/Witch_2/poison_flying/tile004.png'
        // '../assets/Enemies/witch/Witch_2/poison_hit/tile005.png',
        // '../assets/Enemies/witch/Witch_2/poison_hit/tile006.png',
        // '../assets/Enemies/witch/Witch_2/poison_hit/tile007.png',
        // '../assets/Enemies/witch/Witch_2/poison_hit/tile008.png',
        // '../assets/Enemies/witch/Witch_2/poison_hit/tile009.png'
    ];

    IMAGES_POISON_HIT = [
        '../assets/Enemies/witch/Witch_2/poison_hit/tile005.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile006.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile007.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile008.png',
        '../assets/Enemies/witch/Witch_2/poison_hit/tile009.png'
    ];

    constructor(x, y) {
        super().loadImage('../assets/Enemies/witch/Witch_2/poison_flying/tile000.png');
        this.loadImages(this.IMAGES_POISON);
        this.loadImages(this.IMAGES_POISON_HIT);
        this.x = x - 100;
        this.y = y - 25;
        this.height = 375;
        this.width = 375;
        this.speedY = 8;
        // this.otherDirection = direction;
        this.accelerationX = 2.5;
        this.accelerationY = 1.5;
        this.speedX = 1;
        this.throw();
        this.hitFrame = 0;
        this.isReset = true;
    }

    throw() {
        setInterval(() => {
            if (this.speedX < 30) {
                // Accelerating phase (moving left)
                this.x -= this.speedX; // Move to the left
                this.speedX += this.accelerationX; // Increase speed
            } 
    
            // Apply gravity or upward motion effect on the y-axis
            this.y -= this.speedY; // Move up or down
            this.speedY -= this.accelerationY; // Adjust vertical speed
            
            // Ensure speedX does not become negative (reverse direction) after deceleration
            if (this.speedX < 0) {
                this.speedX = 0;
            }
        }, 1000 / 20);
        this.animatePoisonCloud();
    }

    animatePoisonCloud() {
        setInterval(() => {
            if (this.frame < this.IMAGES_POISON.length) {
                this.playOneTimeAnimation(this.IMAGES_POISON, this.isReset);
                this.isReset = false;
                this.frame++;
            }
        }, 1000 / 10);
    }

    // animateFireballHit(i, j, fireballs, enemies) {    
    //     let interval = setInterval(() => {
    //         if (this.hitFrame < this.IMAGES_FLAMES_HIT.length) {
    //             this.speedX = 0;
    //             this.playOneTimeAnimation(this.IMAGES_FLAMES_HIT, this.isReset);
    //             this.isReset = false;
    //             this.hitFrame++;

    //           if (this.hitFrame === this.IMAGES_FLAMES_HIT.length) {
    //             this.isReset = true;
    //             this.hitFrame = 0;           
    //             fireballs.splice(i, 1);
    //             clearInterval(interval);
    //         }
    //     }
    //     }, 1000 / 60);

    // }
}




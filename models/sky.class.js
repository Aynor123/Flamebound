class Sky extends MoveableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    speed = 0.1;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.animate();
    }


    /**
     * This function handles the movement of the sky objects from left to right by calling the function `moveRight`.
     */
    animate() {
        this.moveRight();
    }

    /**
     * This function uses an intervals to move the sky object to the right.
     */
    moveRight() {
        let moveSky = createInterval(allIntervals, () => {
            this.x += this.speed;
        }, 1000 / 60);
    }
}
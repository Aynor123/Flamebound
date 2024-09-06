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

    animate() {
        this.moveRight();
    }

    moveRight() {
        let moveSky = createInterval(allIntervals, () => {
            this.x += this.speed;
        }, 1000 / 60); // 60 FPS
    }

}
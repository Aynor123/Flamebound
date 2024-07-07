class Sky extends MoveableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor() {
        super().loadImage('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png');
        this.animate();

    }

    animate() {
        setInterval( () => {
            this.x -= 0.1;
        }, 1000 / 60); // 60 FPS
    }

}
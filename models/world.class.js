class World {
    character = new Character();

    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];

    skies = [
        new Sky()
    ];

    backgroundObjects = [
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/graves.png', 0, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/back_trees.png', 0, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/tree.png', 0, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall.png', 0, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Pale/ground.png', 0, 0),
        new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall_mirrored.png', 0, 250)
    ]

    canvas;

    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // this.skies.forEach(sky => {
        //     this.addToMap(sky);
        // });

        this.addObjectsToMap(this.skies);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);

        this.addToMap(this.character);

        //draw() wird immer wieder aufgerufen.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(moveableObject) {
        this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
    }
}
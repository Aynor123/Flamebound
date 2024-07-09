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

    keyboard;

    ctx;

    camera_x = -100; //Nach links schieben nicht nach rechts.

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this; //Alle Parameter aus Klasse World werdn in Klasse Character übergeben.
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.skies);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);

        // this.ctx.translate(-this.camera_x, 0);

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
        if (moveableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(moveableObject.width, 0);
            this.ctx.scale(-1, 1);
            moveableObject.x = moveableObject.x * -1;
        }
        this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
        if (moveableObject.otherDirection) {
            this.ctx.restore();
            moveableObject.x = moveableObject.x * -1;
        }
    }
}
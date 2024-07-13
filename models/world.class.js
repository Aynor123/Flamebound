class World {
    character = new Character();

    level = level1;

    // enemies = level1.enemies;

    // skies = level1.skies;

    // backgroundObjects = level1.backgroundObjects;

    // backgroundObjects = [
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/graves.png', 0, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/back_trees.png', 0, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/tree.png', 0, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall.png', 0, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Pale/ground.png', 0, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall_mirrored.png', 0, 250),

    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/graves.png', 720, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/back_trees.png', 720, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall.png', 720, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Pale/ground.png', 720, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall_mirrored.png', 720, 250),

    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/graves.png', 720 * 2, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/back_trees.png', 720 * 2, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/crypt.png', 720 * 2, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall.png', 720 * 2, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Pale/ground.png', 720 * 2, 0),
    //     new BackgroundObject('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/wall_mirrored.png', 720 * 2, 250)
    // ]

    // skies = [
    //     new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', 0, 0),
    //     new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', 720, 0),
    //     new Sky('../assets/Backgrounds/Battlegrounds/PNG/Graveyard Battleground4/Bright/sky.png', 720 * 2, 0)
    // ]

    canvas;

    keyboard;

    ctx;

    camera_x = 0; //Nach links schieben nicht nach rechts. Value irrelevant für meinen Code?

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
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.skies);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);



        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

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
            this.flipImage(moveableObject);
        }

        moveableObject.draw(this.ctx);

        moveableObject.drawFrame(this.ctx);

        if (moveableObject.otherDirection) {
            this.flipImageBack(moveableObject);
        }
    }

    flipImage(moveableObject) {
        this.ctx.save();
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1);
        moveableObject.x = moveableObject.x * -1;
    }

    flipImageBack(moveableObject) {
        this.ctx.restore();
        moveableObject.x = moveableObject.x * -1;
    }
    
    isColliding(moveableObject) {
        return this.x + this.width > moveableObject.x &&
        this.y + this.height > moveableObject.y &&
        this.x < moveableObject.x &&
        this.y < moveableObject.y + moveableObject.height
    }

//     isColliding (obj) {
//         return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
//                 (this.Y + this.offsetY + this.height) >= obj.Y &&
//                 (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
//                 obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

// }
}
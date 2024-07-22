class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    camera_x = 0; //Nach links schieben nicht nach rechts. Value irrelevant für meinen Code?
    statusBar = new StatusBar();
    manaBar = new ManaBar();
    throwableObjects = [];
    lastThrowTime = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; //Alle Parameter aus Klasse World werdn in Klasse Character übergeben.
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 30);
    }

    checkThrowObjects() {
        let currentTime = Date.now();
        if (this.keyboard.D && (currentTime - this.lastThrowTime >= 875)) {
            this.character.isCastingFireball();
            this.manaBar.setPercentage(this.character.mana);
            setTimeout(() => {
                let fireball = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObjects.push(fireball);
            }, 500);
                this.lastThrowTime = currentTime;
           
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((i) => {
            if (this.character.isColliding(i)) {
                this.character.isHit();
                this.statusBar.setPercentage(this.character.health);
            }
        })

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.skies);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); // Back. Nächste Funktion umschließen, um Objekt an Position zu halten.
        this.addToMap(this.statusBar);
        this.addToMap(this.manaBar);
        this.ctx.translate(this.camera_x, 0); // Forward

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
}
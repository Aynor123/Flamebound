class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    camera_x = 0; //Nach links schieben nicht nach rechts. Value irrelevant für meinen Code?
    statusBar = new StatusBar();
    manaBar = new ManaBar();
    portionBar = new PortionBar();
    throwableObjects = [];
    lastThrowTime = 0;
    lastFireballImpactTime = 0;
    fireballImpact = false;
    collectedPortions = 0;
    totalPortions = 3;


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
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.portionBar.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.drawCollectedPortions();
        }, 1000 / 60);
    }

    checkThrowObjects() {
        let currentTime = Date.now();
        if (this.keyboard.S && (currentTime - this.lastThrowTime >= 875) && this.character.mana > 0) {
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
        this.level.enemies.forEach((enemy) => {
            if (enemy.collisionAllowed && this.character.isColliding(enemy)) {
                this.character.isHit();
                this.statusBar.setPercentage(this.character.health);
            }
        });

        this.throwableObjects.forEach((throwableObject, i) => {
            this.level.enemies.forEach((enemy, j) => {
                if (enemy.collisionAllowed && throwableObject.isCollidingFireball(enemy)) {
                    let currentTime = Date.now();
                    if (currentTime - this.lastFireballImpactTime >= 875) {
                        throwableObject.animateFireballHit(i, j, this.throwableObjects, this.level.enemies);
                        this.lastFireballImpactTime = currentTime;
                        enemy.health -= 20;
                        // enemy.hitDetection = true;
                      
                        enemy.updateHitDetection();
                    }
                } else {
                    // enemy.hitDetection = false;
                }

            });
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.skies);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.manaPortions);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0); // Back. Nächste Funktion umschließen, um Objekt an Position zu halten.
        this.addToMap(this.statusBar);
        this.addToMap(this.manaBar);
        this.addToMap(this.portionBar);
        this.drawCollectedPortions();
        this.ctx.translate(this.camera_x, 0); // Forward
        this.ctx.translate(-this.camera_x, 0);

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
        moveableObject.drawFrameFireball(this.ctx);
        moveableObject.drawFrameEnboss(this.ctx);


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

    drawCollectedPortions() {
        this.ctx.font = '40px Inferno';
        this.ctx.fillStyle = 'rgb(125,142,203)';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = '1';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 1)';
        this.ctx.shadowBlur = 2;
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
        this.ctx.fillText(`${this.collectedPortions}/${this.totalPortions}`, 80, 120);
        this.ctx.strokeText(`${this.collectedPortions}/${this.totalPortions}`, 80, 120);
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
      }
}
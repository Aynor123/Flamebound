class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    camera_x = 0; //Nach links schieben nicht nach rechts. Value irrelevant für meinen Code?
    statusBar = new StatusBar();
    manaBar = new ManaBar();
    healthBarEndboss = new HealthBarEndboss;
    portionBar = new PortionBar();
    throwableObjects = [];
    poisonClouds = [];
    lastThrowTime = 0;
    lastDrinkTime = 0;
    lastFireballImpactTime = 0;
    fireballImpact = false;
    poisonCloudHitsCharacter = false;
    collectedPortions = 0;
    totalPortions = 3;
    endboss = this.level.enemies[3];
    rangeToRightFireball = 300;
    rangeToLeftFireball = 165;
    sightrangeOfEnemy = 350;
    collect_portion_sound = new Audio('../sounds/collectportion.mp3');
    fireball_hit_sound = new Audio('../sounds/fireballhitshortened.mp3');
    fireball_casting_sound = new Audio('../sounds/fireballcasting.mp3');
    fireball_failed_to_cast_sound = new Audio('../sounds/failedtocastfireball.mp3');
    boss_encounter_sound = new Audio('../sounds/bossencounter.mp3');
    character_hit_sound = new Audio('../sounds/characterhit.mp3');
    skeleton_dies_sound = new Audio('../sounds/skeletondies.mp3');
    endboss_dies_sound = new Audio('../sounds/witchdies.mp3'); //Alternativ Scream verwenden
    bossEncountered = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; //Alle Parameter aus Klasse World werden in Klasse Character übergeben.
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.level.manaPortions.forEach(manaPortion => {
            manaPortion.world = this;
        });
        this.portionBar.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkDrinkingManaPortions();
            this.checkEndbossVisibility();
            this.checkPoisonHitAnimation();
        }, 1000 / 60);
    }

    checkThrowObjects() {
        let currentTime = Date.now();
        if (this.keyboard.S && (currentTime - this.lastThrowTime >= 1000) && this.character.mana > 0) {
            this.character.isCastingFireball();
            this.fireball_casting_sound.play();
            this.manaBar.setPercentage(this.character.mana);
            setTimeout(() => {
                let fireball = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObjects.push(fireball);
            }, 500);
            this.lastThrowTime = currentTime;
        } else if (this.keyboard.S && (currentTime - this.lastThrowTime >= 1000) && this.character.mana <= 0) {
            this.fireball_failed_to_cast_sound.play();
        }

    }

    // && (currentTime - this.lastDrinkTime >= 875) && !this.character.mana == 100

    checkDrinkingManaPortions() {
        let currentTime = Date.now();
        if (this.keyboard.F && this.collectedPortions > 0 && this.character.mana < 100) {
            this.collectedPortions--;
            this.character.mana = 100;
            this.manaBar.setPercentage(this.character.mana);
            this.lastDrinkTime = currentTime;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.collisionAllowed && this.character.isColliding(enemy)) {
                this.character.isHit();
                this.statusBar.setPercentage(this.character.health);
                if (this.character.health > 0) {
                    this.character_hit_sound.play();
                }
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
                        this.fireball_hit_sound.play();
                        enemy.updateHitDetection();
                        if (enemy.health <= 0) {
                            if (enemy instanceof Endboss) {
                                this.endboss_dies_sound.play();
                            } else {
                                this.skeleton_dies_sound.play();
                            }
                        }
                    }
                }
            });
            if ((throwableObject.x - this.character.x) > this.rangeToRightFireball) {
                this.throwableObjects.splice(i, 1);
            }
            if ((this.character.x - throwableObject.x) > this.rangeToLeftFireball) {
                this.throwableObjects.splice(i, 1);
            }
        });

        this.level.manaPortions.forEach((manaPortion, i) => {
            if (this.character.isCollidingManaPortion(manaPortion)) {
                if (this.collectedPortions >= 3) {
                    this.collectedPortions = 3;
                } else {
                    this.collectedPortions++;
                    this.collect_portion_sound.play();
                }
                this.level.manaPortions.splice(i, 1);
            }
        });

        this.poisonClouds.forEach((poisonCloud) => {
            if (poisonCloud.isCollidingPoisonCloud(this.character)) {
                console.log('hit');
                this.poisonCloudHitsCharacter = true;
                setTimeout(() => {
                    this.poisonCloudHitsCharacter = false;
                }, 1000);
            }
        });

    }

    checkPoisonHitAnimation() {
        let poisonCloudHit = setInterval(() => {
            if (this.poisonCloudHitsCharacter) {
                let lastPoisonCloudInArray = this.poisonClouds[this.poisonClouds.length - 1];
                if (lastPoisonCloudInArray) {
                    lastPoisonCloudInArray.poisonCloudHit(this.poisonClouds);
                }
            }
        }, 1000 / 220);
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
        this.addObjectsToMap(this.poisonClouds);
        this.ctx.translate(-this.camera_x, 0); // Back. Nächste Funktion umschließen, um Objekt an Position zu halten.
        this.addToMap(this.statusBar);
        this.addToMap(this.manaBar);
        this.addToMap(this.healthBarEndboss);
        this.drawBlackRoundedRect(35, 70, 105, 50, 5);
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
        moveableObject.drawFrameManaPortion(this.ctx);
        moveableObject.drawFramePoisonCloud(this.ctx);


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
        this.ctx.font = '32px Inferno';
        this.ctx.fillStyle = 'rgb(125,142,203)';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = '0.4';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 1)';
        this.ctx.shadowBlur = 2;
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
        this.ctx.fillText(`${this.collectedPortions}/${this.totalPortions}`, 75, 110);
        this.ctx.strokeText(`${this.collectedPortions}/${this.totalPortions}`, 75, 110);
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }

    drawBlackRoundedRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fill();
    }

    checkEndbossVisibility() {
        if ((this.endboss.x - this.character.x) < this.sightrangeOfEnemy) {
            this.healthBarEndboss.setPercentage(this.endboss.health);
            // this.endboss.initEndboss();
            if (!this.bossEncounter) {
                this.bossEncounter = true;
                this.boss_encounter_sound.play();
            }
        }
    }
}
let worldIntervals = [];

class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();
    manaBar = new ManaBar();
    portionBar = new PortionBar();
    healthBarEndboss = new HealthBarEndboss;
    endboss = this.level.enemies[3];
    endbossIsActive = false;
    throwableObjects = [];
    poisonClouds = [];
    lastThrowTime = 0;
    lastDrinkTime = 0;
    lastFireballImpactTime = 0;
    fireballImpact = false;
    poisonCloudHitsCharacter = false;
    collectedPortions = 0;
    totalPortions = 3;
    rangeToRightFireball = 260;
    rangeToLeftFireball = 145;
    sightrangeOfEnemy = 300;
    collect_portion_sound = new Audio('../sounds/collectportion.mp3');
    fireball_hit_sound = new Audio('../sounds/fireballhitshortened.mp3');
    fireball_casting_sound = new Audio('../sounds/fireballcasting.mp3');
    fireball_failed_to_cast_sound = new Audio('../sounds/failedtocastfireball.mp3');
    boss_encounter_sound = new Audio('../sounds/bossencounter.mp3');
    character_hit_sound = new Audio('../sounds/characterhit.mp3');
    skeleton_dies_sound = new Audio('../sounds/skeletondies.mp3');
    endboss_dies_sound = new Audio('../sounds/witchdies.mp3');
    defeat_sound = new Audio('../sounds/defeat.mp3');
    victory_sound = new Audio('../sounds/victory.mp3');
    gameIsOver = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Forwards the parameter of class World to certain instances e.g. Character and Enemy.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.level.manaPortions.forEach(manaPortion => {
            manaPortion.world = this;
        });
        this.portionBar.world = this;
    }


    run() {
        let gameInterval = createInterval(allIntervals,() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkDrinkingManaPortions();
            this.checkEndbossVisibility();
            this.checkPoisonHitAnimation();
            this.checkGameEnd(gameInterval);
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
        this.checkEnemyCollisions();
        this.checkFireballCollisions();
        this.checkManaPortionCollisions();
        this.checkPoisonCloudCollisions();
    }
    

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.collisionAllowed && this.character.isColliding(enemy)) {
                this.character.isHit();
                this.statusBar.setPercentage(this.character.health);
                if (this.character.health > 0) {
                    this.character_hit_sound.play();
                }
            }
        });
    }
    

    checkFireballCollisions() {
        this.throwableObjects.forEach((throwableObject, i) => {
            this.level.enemies.forEach((enemy, j) => {
                if (enemy.collisionAllowed && throwableObject.isCollidingFireball(enemy)) {
                    this.handleFireballImpact(throwableObject, enemy, i, j);
                }
            });
    
            this.removeOffScreenFireballs(throwableObject, i);
        });
    }
    

    handleFireballImpact(throwableObject, enemy, i, j) {
        let currentTime = Date.now();
        if (currentTime - this.lastFireballImpactTime >= 875) {
            throwableObject.animateFireballHit(i, j, this.throwableObjects, this.level.enemies);
            this.lastFireballImpactTime = currentTime;
            enemy.health -= 20;
            this.fireball_hit_sound.play();
            enemy.updateHitDetection();
    
            if (enemy.health <= 0) {
                this.playEnemyDeathSound(enemy);
            }
        }
    }
    

    playEnemyDeathSound(enemy) {
        if (enemy instanceof Endboss) {
            this.endboss_dies_sound.play();
        } else {
            this.skeleton_dies_sound.play();
        }
    }
    

    removeOffScreenFireballs(throwableObject, index) {
        if ((throwableObject.x - this.character.x) > this.rangeToRightFireball || 
            (this.character.x - throwableObject.x) > this.rangeToLeftFireball) {
            this.throwableObjects.splice(index, 1);
        }
    }
    

    checkManaPortionCollisions() {
        this.level.manaPortions.forEach((manaPortion, i) => {
            if (this.character.isCollidingManaPortion(manaPortion)) {
                this.collectManaPortion(i);
            }
        });
    }
    

    collectManaPortion(index) {
        if (this.collectedPortions < 3) {
            this.collectedPortions++;
            this.collect_portion_sound.play();
        }
        this.level.manaPortions.splice(index, 1);
    }
    

    checkPoisonCloudCollisions() {
        this.poisonClouds.forEach((poisonCloud) => {
            if (poisonCloud.isCollidingPoisonCloud(this.character)) {
                this.poisonCloudHitsCharacter = true;
                setTimeout(() => {
                    this.poisonCloudHitsCharacter = false;
                }, 1000);
            }
        });
    }


    checkPoisonHitAnimation() {
        let lastPoisonCloudInArray = this.poisonClouds[this.poisonClouds.length - 1];
        if (this.poisonCloudHitsCharacter) {
            if (lastPoisonCloudInArray) {
                lastPoisonCloudInArray.poisonCloudHitsCharacter(this.poisonClouds, this.character, this.statusBar);
            }
        }
        if (lastPoisonCloudInArray) {
            if (lastPoisonCloudInArray.y > this.endboss.y + 100) {
                lastPoisonCloudInArray.poisonCloudHitsGround(this.poisonClouds);
            }
        }
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
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBar);
        this.addToMap(this.manaBar);
        this.addToMap(this.healthBarEndboss);
        this.drawBlackRoundedRect(35, 70, 105, 50, 5);
        this.addToMap(this.portionBar);
        this.drawCollectedPortions();
        this.ctx.translate(this.camera_x, 0); 
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
            this.endbossIsActive = true;
            if (!this.bossEncounter) {
                this.bossEncounter = true;
                this.boss_encounter_sound.play();
            }
        }
    }


    checkGameEnd(gameInterval) {
        if (this.endboss.health <= 0) {
            this.showVictoryScreen();
        }
        if (this.character.health <= 0) {
            this.showDefeatScreen();
            clearInterval(gameInterval);
        }
    }


    showDefeatScreen() {
        let defeatScreen = document.getElementById('defeat-screen');
        this.gameIsOver = true;
        setTimeout(() => {
            defeatScreen.classList.remove('d-none');
            this.defeat_sound.play();
            stopAllIntervals();
        }, 1000);
    }

    
    showVictoryScreen() {
        let victoryScreen = document.getElementById('victory-screen');
        this.gameIsOver = true;
        setTimeout(() => {
            victoryScreen.classList.remove('d-none');
            this.victory_sound.play();
            stopAllIntervals();
        }, 1000);
    }
}
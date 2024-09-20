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
     * The `setWorld` function assigns the `world` property to various objects within the game world.
     * In other words: It forwards the parameter of class World to certain instances e.g. Character and Enemy
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


    /**
     * The `run` function sets up an interval to run various game checks at a specific frequency.
     */
    run() {
        let gameInterval = createInterval(allIntervals, () => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkDrinkingManaPortions();
            this.checkEndbossVisibility();
            this.checkPoisonHitAnimation();
            this.checkGameEnd(gameInterval);
        }, 1000 / 60);
    }


    /**
     * The function `checkThrowObjects` checks if the player can throw a fireball based on certain
     * conditions and updates game elements accordingly.
     */
    checkThrowObjects() {
        let currentTime = Date.now();

        if (this.keyboard.S && (currentTime - this.lastThrowTime >= 1000) && this.character.mana > 0) {
            this.character.isCastingFireball();
            fireball_casting_sound.play();
            this.manaBar.setPercentage(this.character.mana);
            setTimeout(() => {
                let fireball = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObjects.push(fireball);
            }, 500);
            this.lastThrowTime = currentTime;
        } else if (this.keyboard.S && (currentTime - this.lastThrowTime >= 1000) && this.character.mana <= 0) {
            fireball_failed_to_cast_sound.play();
        }
    }


    /**
     * The function `checkDrinkingManaPortions` checks if the F key is pressed, there are collected
     * portions available, and the character's mana is less than 100 to replenish mana and update the mana
     * bar.
     */
    checkDrinkingManaPortions() {
        let currentTime = Date.now();
        if (this.keyboard.F && this.collectedPortions > 0 && this.character.mana < 100) {
            this.collectedPortions--;
            this.character.mana = 100;
            this.manaBar.setPercentage(this.character.mana);
            this.lastDrinkTime = currentTime;
        }
    }


    /**
     * The function `checkCollisions` checks for collisions with enemies, fireballs, mana
     * portions, and poison clouds.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkFireballCollisions();
        this.checkManaPortionCollisions();
        this.checkPoisonCloudCollisions();
    }


    /**
     * The function `checkEnemyCollisions` checks for collisions between the character and enemies,
     * updating health and playing a sound if a collision occurs.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.collisionAllowed && this.character.isColliding(enemy)) {
                this.character.isHit();
                this.statusBar.setPercentage(this.character.health);
                if (this.character.health > 0) {
                    character_hit_sound.play();
                }
            }
        });
    }


    /**
     * The function `checkFireballCollisions` iterates through throwable objects and enemies to handle
     * collisions and remove off-screen fireballs.
     */
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


    /**
     * The function `handleFireballImpact` checks for the time elapsed since the last fireball impact and
     * updates enemy health and animations accordingly.
     * @param throwableObject - The `throwableObject` parameter represents the object that is being thrown,
     * in this case, a fireball.
     * @param enemy - The `enemy` parameter in the `handleFireballImpact` function represents the enemy
     * that is being hit by the fireball. It is an object that contains properties such as `health`
     * and methods like `updateHitDetection`. When the fireball impacts the enemy, their health is reduced.
     */
    handleFireballImpact(throwableObject, enemy, i, j) {
        let currentTime = Date.now();

        if (currentTime - this.lastFireballImpactTime >= 875) {
            throwableObject.animateFireballHit(i, j, this.throwableObjects, this.level.enemies);
            this.lastFireballImpactTime = currentTime;
            enemy.health -= 20;
            fireball_hit_sound.play();
            enemy.updateHitDetection();
            if (enemy.health <= 0) {
                this.playEnemyDeathSound(enemy);
            }
        }
    }


    /**
     * The function `playEnemyDeathSound` plays a specific sound based on the type of enemy that has died.
     * @param enemy - The `enemy` parameter is an object representing an enemy character in a game.
     */
    playEnemyDeathSound(enemy) {
        if (enemy instanceof Endboss) {
            endboss_dies_sound.play();
        } else {
            skeleton_dies_sound.play();
        }
    }


    /**
     * The function `removeOffScreenFireballs` removes fireball objects that are off-screen based on the
     * character's position.
     * @param throwableObject - The `throwableObject` parameter represents an object that is being thrown
     * or in the game. In this case a fireball.
     * @param index - The `index` parameter in the `removeOffScreenFireballs` function represents the
     * position of the `throwableObject` in the `throwableObjects` array that needs to be checked and
     * potentially removed if it is off-screen.
     */
    removeOffScreenFireballs(throwableObject, index) {
        if ((throwableObject.x - this.character.x) > this.rangeToRightFireball ||
            (this.character.x - throwableObject.x) > this.rangeToLeftFireball) {
            this.throwableObjects.splice(index, 1);
        }
    }


    /**
     * The function `checkManaPortionCollisions` checks for collisions between the character and mana
     * portions in the game level and collects the mana portion if a collision is detected.
     */
    checkManaPortionCollisions() {
        this.level.manaPortions.forEach((manaPortion, i) => {
            if (this.character.isCollidingManaPortion(manaPortion)) {
                this.collectManaPortion(i);
            }
        });
    }


    /**
     * The function `collectManaPortion` increments the number of collected mana portions by one and plays
     * a sound effect if the collected portions are less than three, then removes the mana portion from the
     * level's array.
     * @param index - The `index` parameter in the `collectManaPortion` function represents the index of
     * the mana portion that is being collected from the `manaPortions` array in the `level` object. This
     * index is used to splice out the collected mana portion from the array after it has been collected.
     */
    collectManaPortion(index) {
        if (this.collectedPortions < 3) {
            this.collectedPortions++;
            collect_portion_sound.play();
        }
        this.level.manaPortions.splice(index, 1);
    }


    /**
     * The function `checkPoisonCloudCollisions` checks for collisions between the character and poison
     * clouds in a game.
     */
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


    /**
     * The function `checkPoisonHitAnimation` checks for poison cloud hits on the character and ground.
     */
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


    /**
     * The `draw` function in clears the canvas, translates the context, adds various objects to
     * the map, draws bars and portions, and requests animation frame for continuous drawing.
     */
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


    /**
     * The function `addObjectsToMap` iterates over an array of objects and adds each object to a map.
     * @param objects - The `objects` parameter is an array containing the objects that you want to add to
     * a map. The `addObjectsToMap` method iterates over each object in the array and adds it to the map
     * using the `addToMap` method.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }


    /**
     * The `addToMap` function in JavaScript flips the image of a moveable object if it is in another
     * direction, then draws various frames using the object's context.
     * @param moveableObject - The `addToMap` function is responsible for adding a
     * `moveableObject` to a map and performing various drawing operations on it.
     */
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


    /**
     * The `flipImage` function flips an image horizontally using the canvas context.
     * @param moveableObject - The `moveableObject` parameter represents an object that can be moved
     * within a canvas. It has properties such as `x` (horizontal position), `y` (vertical
     * position), and `width` (width of the object).
     */
    flipImage(moveableObject) {
        this.ctx.save();
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1);
        moveableObject.x = moveableObject.x * -1;
    }


    /**
     * The function `flipImageBack` restores the canvas context and flips the x-coordinate of a
     * moveable object.
     * @param moveableObject - The `moveableObject` parameter represents an object that contains
     * information about a movable element in a canvas, such as its position (`x`, `y`), size, and
     * other properties. 
     */
    flipImageBack(moveableObject) {
        this.ctx.restore();
        moveableObject.x = moveableObject.x * -1;
    }


    /**
     * The function `drawCollectedPortions` in JavaScript draws text on the canvas with specified styles and
     * shadows.
     */
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


    /**
     * The function drawBlackRoundedRect draws a black rounded rectangle with specified dimensions and
     * corner radius on a canvas. It is used as background images for the collected mana portions GUI.
     * @param x - The `x` parameter represents the x-coordinate of the top-left corner of the rounded
     * rectangle.
     * @param y - The `y` parameter in the `drawBlackRoundedRect` function represents the vertical position
     * of the top-left corner of the rounded rectangle on the canvas. It determines how far down from the
     * top of the canvas the rectangle will be drawn.
     * @param width - The `width` parameter in the `drawBlackRoundedRect` function represents the width of
     * the rounded rectangle that you want to draw on the canvas. It determines how wide the rectangle will
     * be horizontally.
     * @param height - The `height` parameter in the `drawBlackRoundedRect` function represents the
     * vertical size of the rounded rectangle that will be drawn on the canvas. It determines how tall the
     * rectangle will be from top to bottom.
     * @param radius - The `radius` parameter in the `drawBlackRoundedRect` function represents the radius
     * of the rounded corners of the rectangle that will be drawn on the canvas. This parameter determines
     * how rounded the corners of the rectangle will be. 
     */
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


    /**
     * The function `checkEndbossVisibility` checks if the endboss is within sight range of the character
     * and updates the health bar and triggers a boss encounter sound if necessary.
     */
    checkEndbossVisibility() {
        if ((this.endboss.x - this.character.x) < this.sightrangeOfEnemy) {
            this.healthBarEndboss.setPercentage(this.endboss.health);
            this.endbossIsActive = true;
            if (!this.bossEncounter) {
                this.bossEncounter = true;
                boss_encounter_sound.play();
            }
        }
    }


    /**
     * The function `checkGameEnd` shows the victory screen or the defeat screen depending on the health of the endboss and character.
     */
    checkGameEnd() {
        if (this.endboss.health <= 0) {
            this.showVictoryScreen();
        }
        if (this.character.health <= 0) {
            this.showDefeatScreen();
        }
    }


    /**
     * Shows the defeat screen and stops all intervals.
     */
    showDefeatScreen() {
        let defeatScreen = document.getElementById('defeat-screen');
        this.gameIsOver = true;
        setTimeout(() => {
            defeatScreen.classList.remove('d-none');
            defeat_sound.play();
            stopAllIntervals();
        }, 1000);
    }


    /**
      * Shows the victory screen and stops all intervals.
      */
    showVictoryScreen() {
        let victoryScreen = document.getElementById('victory-screen');
        this.gameIsOver = true;
        setTimeout(() => {
            victoryScreen.classList.remove('d-none');
            victory_sound.play();
            stopAllIntervals();
        }, 1000);
    }
}
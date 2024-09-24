class Endboss extends MoveableObject {
   height = 280;
   width = 280;
   health = 100;
   tolerance = 3;
   castingTimeout = 0;
   isCasting = false;
   animationInterval;
   isReset = true;
   frame = 0;
   inRangeToCast = false;
   endbossAttackSpeed = 3000;
   isMoving = false;
   speed = 8.0;
   endbossIdleStormy = true;

   constructor() {
      super().loadImage('../assets/Enemies/witch/Witch_2/walk/tile000.png');
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_IDLE);
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_DEAD);
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_HURT);
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_WALKING);
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_RUNNING);
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_RUNNING_REVERSE);
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_CASTING);
      this.loadImages(sprites.ENDBOSS_SPRITES.IMAGES_IDLE_STANDING);
      this.x = 1500;
      this.y = 100;
      this.animate();
   }

   /**
    * This function `animate` animates the endboss movement by setting several intervals in different frequencies.
    */
   animate() {
      this.endbossIntroAnimation(9);
      this.enbossIsHurtAnimation(30);
      this.endbossDiesAnimation(10);
      this.endbossMovementAnimation(20);
      this.endbossAssuresDistanceToCharacter(10);
      this.endbossChecksRange(10);
      this.endbossCastsPoisonAnimation(30);
      this.endbossIdleAnimation(5);
   }

   /**
    * This interval sets the initial animation of the endboss. This is only played until the character is in sight range of the endboss.
    * @param {*} ms - Represents the miliseconds.
    */
   endbossIntroAnimation(ms) {
      let endbossIdleStormy = setInterval(() => {
         if (!gamePaused && !this.health <= 0 && this.endbossIdleStormy) {
            let i;
            if (this.currentImage < 7) {
               i = this.currentImage;
            } else {
               i = 2 + ((this.currentImage - 7) % (sprites.ENDBOSS_SPRITES.IMAGES_IDLE.length - 3));
            }
            let path = sprites.ENDBOSS_SPRITES.IMAGES_IDLE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
         }
      }, 1000 / 9);
   }

   /**
    * This interval handles the hurt animation, whenever a hit collision is detected.
    * @param {*} ms - Represents the miliseconds.
    */
   enbossIsHurtAnimation(ms) {
      let enemyHurtInterval = createInterval(allIntervals, () => {
         if (this.hitDetection && this.health > 0) {
            this.playOneTimeAnimationRevB(sprites.ENDBOSS_SPRITES.IMAGES_HURT, enemyHurtInterval);
         }
      }, 1000 / ms);
   }

   /**
    * This interval plays the death animation as soon as the endboss health is zero and clears all other active 
    * intervals to avoid animation overlapping.
   */
   endbossDiesAnimation(ms) {
      let enemyDiesInterval = setInterval(() => {
         if (!this.hitDetection && this.health <= 0 && !gamePaused) {
            this.playOneTimeAnimationRevB(sprites.ENDBOSS_SPRITES.IMAGES_DEAD, enemyDiesInterval);
            this.collisionAllowed = false;
         }
      }, 1000 / ms);
   }

   /**
    * This function determines in which direction the endboss needs to move in dependency of the character's current position.
    * @param {*} ms - Represents the miliseconds.
    */
   endbossMovementAnimation(ms) {
      let movingAnimation = setInterval(() => {
         if (world && world.character !== null && !gamePaused && !this.health <= 0) {
            if (world.character.x + world.rangeToRightFireball - 20 < this.x - this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               this.endbossMovesLeft();
            }
            if (world.character.x + world.rangeToRightFireball - 20 > this.x + this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               this.endbossMovesRight();
            }
            if (world.character.y > this.y + this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               this.enbdbossMovesDown();
            }
            if (world.character.y < this.y - this.tolerance && this.y > -50 && !this.inRangeToCast && world.endbossIsActive) {
               this.endbossMovesUp();
            }
         }
      }, 1000 / ms);
   }

   /**
    * This function handles the left movement of the endboss.
    */
   endbossMovesLeft() {
      this.endbossIdleStormy = false;
      this.moveLeftEndboss();
      this.isMoving = true;
   }

   /**
    * This function handles the right movement of the endboss.
    */
   endbossMovesRight() {
      this.endbossIdleStormy = false;
      this.moveRightEndboss();
      this.isMoving = true;
   }

   /**
    * This function handles the down movement of the endboss.
    */
   enbdbossMovesDown() {
      this.moveDownEnemy();
      this.isMoving = true;
   }

   /**
    * This function handles the up movement of the endboss.
    */
   endbossMovesUp() {
      this.moveUpEnemy();
      this.isMoving = true;
   }

   /**
    * This interval checks if the character is in range of the endboss poison cloud (poison cloud and fireball have the same range).
    * If not, the endboss always seeks to get into range by moving backward or forward depending on the character's movement.
   */
   endbossAssuresDistanceToCharacter(ms) {
      let endbossAssuresDistance = setInterval(() => {
         if (world && world.character !== null && !gamePaused && !this.health <= 0) {
            if (this.isMoving && !this.inRangeToCast && world.endbossIsActive && world.character.x + world.rangeToRightFireball - 20 < this.x - this.tolerance) {
               this.playAnimation(sprites.ENDBOSS_SPRITES.IMAGES_WALKING);
            } else if (this.isMoving && !this.inRangeToCast && world.endbossIsActive && world.character.x + world.rangeToRightFireball - 20 > this.x - this.tolerance) {
               this.playAnimation(sprites.ENDBOSS_SPRITES.IMAGES_WALKING_REVERSE);
            }

         }
      }, 1000 / ms);
   }

   /**
    * This interval gets active as soon as the endboss is in range to assure a hit on the character.
    * If this is the case the second condition checks if the time gap between the allowed poison clouds (three seconds)
    * is comlpied.
   */
   endbossChecksRange(ms) {
      let checkRangeToCast = createInterval(allIntervals, () => {
         let currentTime = Date.now();
         let timeSinceLastCast = (currentTime - this.castingTimeout);

         if (world && world.character !== null && !this.health <= 0) {
            if (this.x - world.character.x <= world.rangeToRightFireball && timeSinceLastCast >= this.endbossAttackSpeed) {
               this.castingTimeout = currentTime;
               this.inRangeToCast = true;
            }
            if (this.x - world.character.x <= world.rangeToRightFireball + this.tolerance) {
               this.isMoving = false;
            }
         }
      }, 1000 / ms);
   }

   /**
    * This interval handles the cast poison cloud animation and pushes a new object in the poison clouds array.
    */
   endbossCastsPoisonAnimation(ms) {
      createInterval(allIntervals, () => {
         if (this.inRangeToCast && !this.world.gameIsOver && this.health > 0) {
            this.playPoisonCastingAnimation();
         }
      }, 1000 / ms);
   }

   /**
    * This function plays the casting animation as long as the current image frame is smaller than the images in the array `IMAGES_CASTING`.
    */
   playPoisonCastingAnimation() {
      if (this.frame < sprites.ENDBOSS_SPRITES.IMAGES_CASTING.length) {
         this.playOneTimeAnimation(sprites.ENDBOSS_SPRITES.IMAGES_CASTING, this.isReset);
         this.isReset = false;
         this.frame++;
         this.speed = 0;

         if (this.frame === sprites.ENDBOSS_SPRITES.IMAGES_CASTING.length) {
            this.resetPoisonCastingState();
         }
      }
   }

   /**
    * This function sets the current frame to zero to assure that the next animation always starts at index zero of the image array.
    * As soon as the casting animation has reached it's end frame this function shows a poision cloud that just has been casted by pushing
    * it into the array `poisionClouds`.
    */
   resetPoisonCastingState() {
      this.isReset = true;
      this.frame = 0;
      this.inRangeToCast = false;
      this.speed = 5;
      let poisonCloud = new PoisonCloud(this.x, this.y);
      this.world.poisonClouds.push(poisonCloud);
      endbossCastsPoison.play();
      this.isCasting = false;
   }

   /**
    * This intervals plays the idle animation between the poison cloud animation.
    */
   endbossIdleAnimation(ms) {
      let idleAnimation = setInterval(() => {
         if (world && world.character !== null && !gamePaused && !this.health <= 0) {
            if (!this.inRangeToCast && world.endbossIsActive && !this.isMoving) {
               this.playAnimation(sprites.ENDBOSS_SPRITES.IMAGES_IDLE_STANDING);
            }
         }
      }, 1000 / ms);
   }

   /**
    * This function updates the endboss x-position when moving right.
    */
   moveRightEndboss() {
      this.x += this.speed;
   }

   /**
    * This function updates the endboss x-position when moving left.
    */
   moveLeftEndboss() {
      this.x -= this.speed;
   }
}


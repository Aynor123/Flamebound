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

   IMAGES_IDLE = [
      '../assets/Enemies/witch/Witch_2/idle_2/tile000.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile001.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile002.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile003.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile004.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile005.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile006.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile007.png'
   ];

   IMAGES_IDLE_STANDING = [
      '../assets/Enemies/witch/Witch_2/idle_1/tile000.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile001.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile002.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile003.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile004.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile005.png'
   ];

   IMAGES_DEAD = [
      '../assets/Enemies/witch/Witch_2/dead/tile000.png',
      '../assets/Enemies/witch/Witch_2/dead/tile001.png',
      '../assets/Enemies/witch/Witch_2/dead/tile002.png',
      '../assets/Enemies/witch/Witch_2/dead/tile003.png'
   ];

   IMAGES_HURT = [
      '../assets/Enemies/witch/Witch_2/hurt/tile000.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile001.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile002.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile003.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile004.png'
   ];

   IMAGES_WALKING = [
      '../assets/Enemies/witch/Witch_2/walk/tile000.png',
      '../assets/Enemies/witch/Witch_2/walk/tile001.png',
      '../assets/Enemies/witch/Witch_2/walk/tile002.png',
      '../assets/Enemies/witch/Witch_2/walk/tile003.png',
      '../assets/Enemies/witch/Witch_2/walk/tile004.png',
      '../assets/Enemies/witch/Witch_2/walk/tile005.png',
      '../assets/Enemies/witch/Witch_2/walk/tile006.png',
      '../assets/Enemies/witch/Witch_2/walk/tile007.png',
      '../assets/Enemies/witch/Witch_2/walk/tile008.png',
      '../assets/Enemies/witch/Witch_2/walk/tile009.png'
   ];

   IMAGES_WALKING_REVERSE = [
      '../assets/Enemies/witch/Witch_2/walk/tile009.png',
      '../assets/Enemies/witch/Witch_2/walk/tile008.png',
      '../assets/Enemies/witch/Witch_2/walk/tile007.png',
      '../assets/Enemies/witch/Witch_2/walk/tile006.png',
      '../assets/Enemies/witch/Witch_2/walk/tile005.png',
      '../assets/Enemies/witch/Witch_2/walk/tile004.png',
      '../assets/Enemies/witch/Witch_2/walk/tile003.png',
      '../assets/Enemies/witch/Witch_2/walk/tile002.png',
      '../assets/Enemies/witch/Witch_2/walk/tile001.png',
      '../assets/Enemies/witch/Witch_2/walk/tile000.png'
   ];

   IMAGES_RUNNING = [
      '../assets/Enemies/witch/Witch_2/run/tile000.png',
      '../assets/Enemies/witch/Witch_2/run/tile001.png',
      '../assets/Enemies/witch/Witch_2/run/tile002.png',
      '../assets/Enemies/witch/Witch_2/run/tile003.png',
      '../assets/Enemies/witch/Witch_2/run/tile004.png',
      '../assets/Enemies/witch/Witch_2/run/tile005.png',
      '../assets/Enemies/witch/Witch_2/run/tile006.png',
      '../assets/Enemies/witch/Witch_2/run/tile007.png',
      '../assets/Enemies/witch/Witch_2/run/tile008.png',
      '../assets/Enemies/witch/Witch_2/run/tile009.png'
   ];

   IMAGES_RUNNING_REVERSE = [
      '../assets/Enemies/witch/Witch_2/run/tile009.png',
      '../assets/Enemies/witch/Witch_2/run/tile008.png',
      '../assets/Enemies/witch/Witch_2/run/tile007.png',
      '../assets/Enemies/witch/Witch_2/run/tile006.png',
      '../assets/Enemies/witch/Witch_2/run/tile005.png',
      '../assets/Enemies/witch/Witch_2/run/tile004.png',
      '../assets/Enemies/witch/Witch_2/run/tile003.png',
      '../assets/Enemies/witch/Witch_2/run/tile002.png',
      '../assets/Enemies/witch/Witch_2/run/tile001.png',
      '../assets/Enemies/witch/Witch_2/run/tile000.png'
   ];

   IMAGES_CASTING = [
      '../assets/Enemies/witch/Witch_2/cast/tile000.png',
      '../assets/Enemies/witch/Witch_2/cast/tile001.png',
      '../assets/Enemies/witch/Witch_2/cast/tile002.png',
      '../assets/Enemies/witch/Witch_2/cast/tile003.png',
      '../assets/Enemies/witch/Witch_2/cast/tile004.png',
      '../assets/Enemies/witch/Witch_2/cast/tile005.png',
      '../assets/Enemies/witch/Witch_2/cast/tile006.png',
      '../assets/Enemies/witch/Witch_2/cast/tile007.png'
   ];

   constructor() {
      super().loadImage('../assets/Enemies/witch/Witch_2/walk/tile000.png');
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_RUNNING);
      this.loadImages(this.IMAGES_RUNNING_REVERSE);
      this.loadImages(this.IMAGES_CASTING);
      this.loadImages(this.IMAGES_IDLE_STANDING);
      this.x = 1500;
      this.y = 100;
      this.animate();
   }

   /**
    * This function `animate` animates the endboss movement by setting several intervals in ifferent frequencies.
    */
   animate() {

      /**
       * This interval sets the initial animation of the endboss. This is only played until the character is in sight range of the endboss.
       */
      let endbossIdleStormy = setInterval(() => {
         if (!gamePaused && !this.health <= 0 && this.endbossIdleStormy) {
            let i;
            if (this.currentImage < 7) {
               i = this.currentImage;
            } else {
               i = 2 + ((this.currentImage - 7) % (this.IMAGES_IDLE.length - 3));
            }
            let path = this.IMAGES_IDLE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
         }
      }, 1000 / 9);

      /**
       * This interval handles the hurt animation, whenever a hit collision is detected.
       */
      let enemyHurtInterval = createInterval(allIntervals, () => {
         if (this.hitDetection && this.health > 0) {
            // clearInterval(endbossIdleStormy);
            this.playOneTimeAnimationRevB(this.IMAGES_HURT, enemyHurtInterval);
         }
      }, 1000 / 30);

      /**
       * This interval plays the death animation as soon as the endboss health is zero and clears all other active 
       * intervals to avoid animation overlapping.
       */
      let enemyDiesInterval = setInterval(() => {
         if (!this.hitDetection && this.health <= 0 && !gamePaused) {
            this.playOneTimeAnimationRevB(this.IMAGES_DEAD, enemyDiesInterval);
            this.collisionAllowed = false;
         }
      }, 1000 / 10);








      this.endbossMovementAnimation(20);
      this.endbossAssuresDistanceToCharacter(10);
      this.endbossChecksRange(10);
      this.endbossCastsPoisionAnimation(30);
      this.endbossIdleAnimation(5);
   }


   /**
    * This interval handles the movement of the endboss and also plays the walking animation depening on
    * whether the endboss shall move forward or backward.
   */
   endbossMovementAnimation(ms) {
      let movingAnimation = setInterval(() => {
         if (world && world.character !== null && !gamePaused && !this.health <= 0) {
            if (world.character.x + world.rangeToRightFireball - 20 < this.x - this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               this.endbossIdleStormy = false;
               this.moveLeftEndboss();
               this.isMoving = true;
            }
            if (world.character.x + world.rangeToRightFireball - 20 > this.x + this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               this.endbossIdleStormy = false;
               this.moveRightEndboss();
               this.isMoving = true;
            }
            if (world.character.y > this.y + this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               this.moveDownEnemy();
               this.isMoving = true;
            }
            if (world.character.y < this.y - this.tolerance && this.y > -50 && !this.inRangeToCast && world.endbossIsActive) {
               this.moveUpEnemy();
               this.isMoving = true;
            }
         }
      }, 1000 / ms);
   }


   /**
    * This interval checks if the character is in range of the endboss poison cloud (poison cloud and fireball have the same range).
    * If not, the endboss always seeks to get into range by moving backward or forward depending on the character's movement.
   */
   endbossAssuresDistanceToCharacter(ms) {
      let endbossAssuresDistance = setInterval(() => {
         if (world && world.character !== null && !gamePaused && !this.health <= 0) {
            if (this.isMoving && !this.inRangeToCast && world.endbossIsActive && world.character.x + world.rangeToRightFireball - 20 < this.x - this.tolerance) {
               this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isMoving && !this.inRangeToCast && world.endbossIsActive && world.character.x + world.rangeToRightFireball - 20 > this.x - this.tolerance) {
               this.playAnimation(this.IMAGES_WALKING_REVERSE);
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
   endbossCastsPoisionAnimation(ms) {
      let castPoison = createInterval(allIntervals, () => {
         if (this.inRangeToCast && !this.world.gameIsOver && !this.health <= 0) {
            if (this.frame < this.IMAGES_CASTING.length) {
               this.playOneTimeAnimation(this.IMAGES_CASTING, this.isReset);
               this.isReset = false;
               this.frame++;
               this.speed = 0;
               if (this.frame === this.IMAGES_CASTING.length) {
                  this.isReset = true;
                  this.frame = 0;
                  this.inRangeToCast = false;
                  this.speed = 5;
                  this.endbossAssuresDistance;
                  let poisonCloud = new PoisonCloud(this.x, this.y);
                  this.world.poisonClouds.push(poisonCloud);
                  endbossCastsPoison.play();
                  this.isCasting = false;
               }
            }
         }
      }, 1000 / ms);
   }


   /**
    * This intervals plays the idle animation between the poison cloud animation.
    */
   endbossIdleAnimation(ms) {
      let idleAnimation = setInterval(() => {
         if (world && world.character !== null && !gamePaused && !this.health <= 0) {
            if (!this.inRangeToCast && world.endbossIsActive && !this.isMoving) {
               this.playAnimation(this.IMAGES_IDLE_STANDING);
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

